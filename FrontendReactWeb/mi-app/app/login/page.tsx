import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#080b12] flex items-center justify-center p-4">
      <section className="w-full max-w-md rounded-[2px] border border-[#1a2235] bg-[#0d1117] p-8 text-center">
        <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#4f8ef7]">Acceso</p>
        <h1 className="mb-3 text-2xl font-light tracking-tight text-[#e4ebf5]">Login pendiente</h1>
        <p className="mb-6 text-sm text-[#7a8fa8]">
          La pantalla de inicio de sesión aún no está implementada.
        </p>
        <Link
          href="/register"
          className="inline-flex rounded-[2px] bg-[#4f8ef7] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#080b12] transition-colors hover:bg-[#6ba3ff]"
        >
          Volver a registro
        </Link>
      </section>
    </main>
  );
}
