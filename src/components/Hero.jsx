import { local } from "../data/local";
import { Marquesina } from "./Marquesina";

export function Hero() {
  return (
    <section className="textura relative flex min-h-svh flex-col overflow-hidden px-5 pt-24 pb-28">
      {/* Brillo rojo de fondo */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(227,38,27,0.28),transparent_62%)]" />

      {/* Iniciales gigantes de marca de agua */}
      <div
        aria-hidden="true"
        className="texto-contorno-tenue pointer-events-none absolute top-10 -left-10 -rotate-8 font-display text-[460px] leading-[0.8] select-none"
      >
        DB
      </div>

      {/* Nombre con la misma tipografía del letrero del local */}
      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center text-center">
        <h1 className="font-letrero leading-[0.85] font-bold text-rojo uppercase">
          <span className="block text-[132px] tracking-tight sm:text-[160px]">Díaz</span>
          <span className="block text-[88px] sm:text-[106px]">Burguer</span>
        </h1>
        <p className="mt-6 text-xl leading-snug font-semibold tracking-[0.2em] text-hueso uppercase">
          Una familia.
          <br />
          Un sabor.
        </p>
        <p className="mt-6 font-letrero text-lg font-semibold tracking-[0.3em] text-amarillo uppercase">
          {local.ciudad}
        </p>

        <a
          href="#menu"
          className="mt-12 flex h-14 w-full items-center justify-center gap-2.5 rounded-2xl bg-rojo font-display text-[28px] tracking-wide text-white shadow-[0_12px_30px_rgba(227,38,27,0.45)] transition hover:bg-rojo-oscuro"
        >
          Ver menú
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>

      <Marquesina
        texto="HAMBURGUESAS ARTESANALES ★ SAN MARTÍN, CESAR ★ PAN BRIOCHE ★ CARNE AHUMADA ★"
        className="absolute bottom-6 -left-10 w-[calc(100%+80px)] -rotate-3 bg-amarillo text-negro md:-rotate-1"
      />
    </section>
  );
}
