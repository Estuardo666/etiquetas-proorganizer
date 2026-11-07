import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container-page py-20 text-center">
      <h1 className="h2-display text-[var(--c-ink)]">Esta página no existe</h1>
      <p className="mt-3 text-[var(--c-text)]">Elija qué quiere etiquetar.</p>
      <Link href="/inicio" className="focus-ring mt-4 inline-flex min-h-[44px] items-center rounded font-bold text-[var(--c-ink)] underline underline-offset-4">Ir al inicio</Link>
    </main>
  );
}
