import { local } from "../data/local";
import logo from "../assets/logo-algo-dulce.jpg";

export function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-cacao px-5 pt-24 pb-16">
      {/* Brillo crema de fondo */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(252,217,179,0.16),transparent_62%)]" />

      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center text-center">
        {/* El logo ya trae el nombre escrito: el alt es lo que leen
            los lectores de pantalla y Google como título de la página. */}
        <h1>
          {/* rounded-full recorta las esquinas cuadradas de la imagen */}
          <img
            src={logo}
            alt={`${local.nombre} — ${local.eslogan}`}
            width="800"
            height="800"
            className="size-72 rounded-full shadow-[0_20px_60px_rgba(0,0,0,0.45)] sm:size-80"
          />
        </h1>
        <p className="mt-6 font-script text-5xl text-crema">{local.eslogan}</p>
        <p className="mt-3 font-display text-lg tracking-[0.3em] text-caramelo uppercase">
          {local.ciudad}
        </p>

        <a
          href="#menu"
          className="mt-10 flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-crema font-display text-2xl tracking-wide text-cacao uppercase shadow-[0_12px_30px_rgba(252,217,179,0.25)] transition hover:bg-crema-oscura"
        >
          Ver menú
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </section>
  );
}
