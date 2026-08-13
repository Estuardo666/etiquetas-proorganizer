/**
 * Verifica que el contrato esté alineado en las cuatro capas:
 *   WordPress (GraphQL real) ↔ consulta de src/lib/wp.ts ↔ types.ts ↔ fallback.ts
 *
 * Uso: node scripts/check-contract.mjs
 * Requiere introspección pública (activa solo en entorno local).
 */
import { readFileSync } from "node:fs";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const ENDPOINT = process.env.WP_GRAPHQL_URL ?? "https://etiquetas-escolares.local/graphql";

/** Campos que registra nuestro plugin en cada CPT (los heredados de WPGraphQL se ignoran). */
const CPTS = {
  poSizes: { type: "PoSize", fields: ["count", "dims", "uses", "badge", "accent", "image"] },
  poUsages: { type: "PoUsage", fields: ["image", "sizeSlug"] },
  poDesigns: { type: "PoDesign", fields: ["image", "badge"] },
  poSteps: { type: "PoStep", fields: ["desc", "icon"] },
  poPromos: { type: "PoPromo", fields: ["pre", "highlight", "post", "featured"] },
  poGalleryItems: { type: "PoGalleryItem", fields: ["image"] },
  poTestimonials: { type: "PoTestimonial", fields: ["city", "rating", "text", "avatar"] },
  poFaqs: { type: "PoFaq", fields: ["answer"] },
};

const problems = [];
const note = (msg) => problems.push(msg);

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
const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: "{ __schema { types { name fields { name } } } }" }),
});
const json = await res.json();
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
const run = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: filledQuery }),
});
const result = await run.json();
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
