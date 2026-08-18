/**
 * Verifica que el contrato esté alineado en las cuatro capas:
 *   WordPress (GraphQL real) ↔ consulta de src/lib/wp.ts ↔ types.ts ↔ fallback.ts
 *
 * Uso: node scripts/check-contract.mjs
 * Requiere introspección pública (activa solo en entorno local).
 */
import { readFileSync } from "node:fs";

const ENDPOINT = process.env.WP_GRAPHQL_URL ?? "http://etiquetas-escolares.local/graphql";

/** Campos que registra nuestro plugin en cada CPT (los heredados de WPGraphQL se ignoran). */
const CPTS = {
  poSizes: { type: "PoSize", fields: ["count", "dims", "uses", "badge", "accent", "image"] },
  poUsages: { type: "PoUsage", fields: ["image", "sizeSlug"] },
  poDesigns: { type: "PoDesign", fields: ["image", "badge"] },
  poSteps: { type: "PoStep", fields: ["desc", "icon"] },
  poPromos: { type: "PoPromo", fields: ["pre", "highlight", "post", "featured"] },
  poGalleryItems: { type: "PoGalleryItem", fields: ["image"] },
  poStats: { type: "PoStat", fields: ["value", "icon"] },
  poTestimonials: { type: "PoTestimonial", fields: ["city", "rating", "text", "avatar"] },
  poFaqs: { type: "PoFaq", fields: ["answer"] },
};

const problems = [];
const note = (msg) => problems.push(msg);

async function graphql(query, purpose) {
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
  const body = await response.text();
  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok || !contentType.includes("application/json")) {
    const preview = body.replace(/\s+/g, " ").slice(0, 160);
    console.error(
      `WPGraphQL no respondió JSON al intentar ${purpose}: HTTP ${response.status} (${contentType || "sin Content-Type"}).\n${preview}`,
    );
    process.exit(1);
  }

  try {
    return JSON.parse(body);
  } catch (error) {
    console.error(`WPGraphQL devolvió JSON inválido al intentar ${purpose}:`, error.message);
    process.exit(1);
  }
}

/** Parser mínimo de selecciones GraphQL: devuelve { campo: subárbol | null }. */
function parseSelection(source) {
  let i = 0;

  function parseSet() {
    const out = {};
    while (i < source.length) {
      const char = source[i];
      if (char === "}") {
        i += 1;
        return out;
      }
      if (/[\s,]/.test(char)) {
        i += 1;
        continue;
      }
      if (char === "(") {
        // argumentos: se saltan respetando el anidamiento
        let depth = 0;
        do {
          if (source[i] === "(") depth += 1;
          if (source[i] === ")") depth -= 1;
          i += 1;
        } while (i < source.length && depth > 0);
        continue;
      }
      if (char === "{") {
        i += 1;
        continue;
      }
      const name = /^[A-Za-z_][A-Za-z0-9_]*/.exec(source.slice(i))?.[0];
      if (!name) {
        i += 1;
        continue;
      }
      i += name.length;
      while (/[\s,]/.test(source[i])) i += 1;
      if (source[i] === "(") {
        let depth = 0;
        do {
          if (source[i] === "(") depth += 1;
          if (source[i] === ")") depth -= 1;
          i += 1;
        } while (i < source.length && depth > 0);
        while (/[\s,]/.test(source[i])) i += 1;
      }
      if (source[i] === "{") {
        i += 1;
        out[name] = parseSet();
      } else {
        out[name] = null;
      }
    }
    return out;
  }

  return parseSet();
}

// --- Esquema real de WordPress -------------------------------------------
const json = await graphql(
  "{ __schema { types { name fields { name } } } }",
  "introspeccionar el esquema",
);
if (json.errors) {
  console.error("No se pudo introspeccionar:", json.errors[0].message);
  process.exit(1);
}
const schemaTypes = new Map(
  json.data.__schema.types.map((t) => [t.name, (t.fields ?? []).map((f) => f.name)]),
);

// --- Fuentes del frontend -------------------------------------------------
const wpSource = readFileSync(new URL("../src/lib/wp.ts", import.meta.url), "utf8");
const typesSource = readFileSync(new URL("../src/lib/types.ts", import.meta.url), "utf8");
const fallbackSource = readFileSync(new URL("../src/lib/fallback.ts", import.meta.url), "utf8");

const rawQuery = wpSource.match(/const QUERY = \/\* GraphQL \*\/ `([\s\S]*?)`;/)?.[1];
if (!rawQuery) {
  console.error("No se encontró la consulta QUERY en src/lib/wp.ts");
  process.exit(1);
}
const filledQuery = rawQuery.replaceAll("${IMAGE}", "{ url alt width height }");
const tree = parseSelection(filledQuery).query?.SiteContent ?? parseSelection(filledQuery);
const root = tree.SiteContent ?? tree;

const has = (source, field) => new RegExp(`\\b${field}\\b`).test(source);

// --- 1) Ajustes ------------------------------------------------------------
const groups = schemaTypes.get("ProorgSettings") ?? [];
if (!groups.length) note("El tipo ProorgSettings no existe en WordPress.");

const askedSettings = root.proOrganizer ?? {};
for (const group of groups) {
  const typeName = `ProorgSettings${group[0].toUpperCase()}${group.slice(1)}`;
  const wpFields = schemaTypes.get(typeName) ?? [];
  const asked = askedSettings[group];

  if (!asked) {
    note(`[consulta] El grupo "${group}" existe en WordPress pero no se consulta.`);
    continue;
  }
  for (const field of wpFields) {
    if (!(field in asked)) note(`[consulta] falta ${group}.${field}`);
    if (!has(typesSource, field)) note(`[types] falta ${group}.${field}`);
    if (!has(fallbackSource, field)) note(`[fallback] falta ${group}.${field}`);
  }
  for (const field of Object.keys(asked)) {
    if (!wpFields.includes(field)) note(`[consulta] ${group}.${field} no existe en WordPress`);
  }
}
for (const group of Object.keys(askedSettings)) {
  if (!groups.includes(group)) note(`[consulta] el grupo "${group}" no existe en WordPress`);
}

// La navegación pertenece a la estructura de la landing. El cliente puede
// editar el contenido de las secciones, pero no crear enlaces rotos ni cambiar
// su orden desde el CMS.
const protectedNavigationFields = {
  header: ["navItems"],
  footer: ["col1Title", "col1Links", "col2Title", "col2Links"],
};
for (const [group, fields] of Object.entries(protectedNavigationFields)) {
  const typeName = `ProorgSettings${group[0].toUpperCase()}${group.slice(1)}`;
  const wpFields = schemaTypes.get(typeName) ?? [];
  for (const field of fields) {
    if (wpFields.includes(field)) note(`[navegación] ${group}.${field} no debe ser editable en WordPress`);
    if (field in (askedSettings[group] ?? {})) note(`[navegación] ${group}.${field} no debe consultarse`);
  }
}

// --- 2) Listados (CPT) -----------------------------------------------------
for (const [plural, { type, fields }] of Object.entries(CPTS)) {
  const wpFields = schemaTypes.get(type);
  if (!wpFields) {
    note(`[cpt] el tipo ${type} no existe en WordPress`);
    continue;
  }
  const asked = root[plural]?.nodes;
  if (!asked) {
    note(`[cpt] ${plural} no se consulta`);
    continue;
  }
  for (const field of fields) {
    if (!wpFields.includes(field)) note(`[cpt] ${type}.${field} no está registrado en WordPress`);
    if (!(field in asked)) note(`[cpt] falta ${type}.${field} en la consulta`);
    if (!has(typesSource, field)) note(`[cpt] falta ${type}.${field} en types.ts`);
  }
  for (const field of Object.keys(asked)) {
    if (!wpFields.includes(field)) note(`[cpt] ${type}.${field} no existe en WordPress`);
  }
}

// --- 3) La consulta real debe ejecutarse y traer datos ---------------------
const result = await graphql(filledQuery, "ejecutar la consulta de la landing");
if (result.errors) {
  for (const error of result.errors) note(`[ejecución] ${error.message}`);
} else {
  for (const [key, value] of Object.entries(result.data)) {
    if (value?.nodes && value.nodes.length === 0) note(`[datos] ${key} está vacío en WordPress`);
  }
  const nulls = Object.entries(result.data.proOrganizer ?? {})
    .filter(([, group]) => group === null)
    .map(([name]) => name);
  if (nulls.length) note(`[datos] grupos nulos: ${nulls.join(", ")}`);
}

if (problems.length) {
  console.error(`\n${problems.length} problema(s) de contrato:\n`);
  for (const problem of problems) console.error(" •", problem);
  process.exit(1);
}

console.log("Contrato alineado: WordPress ↔ consulta ↔ types.ts ↔ fallback.ts");
