import { local } from "../data/local";

const consultaMapa = encodeURIComponent(
  `${local.direccion}, ${local.barrio}, ${local.ciudad}`,
);
const urlMapa = `https://www.google.com/maps/search/?api=1&query=${consultaMapa}`;

export function Contacto() {
  return (
    <section
      id="contacto"
      className="scroll-mt-20 border-t border-negro-borde bg-negro-suave px-4 py-14 text-center"
      aria-label="Contacto y ubicación"
    >
      <h2 className="font-display text-3xl tracking-wide text-rojo uppercase">
        Visítanos
      </h2>
      <div className="mt-4 space-y-1 text-gray-300">
        <a
          href={urlMapa}
          target="_blank"
          rel="noreferrer"
          className="block underline decoration-rojo/50 underline-offset-4 transition hover:text-white"
        >
          {local.barrio}, {local.direccion}
        </a>
        <p>{local.ciudad}</p>
        <p className="text-sm text-gray-400">{local.horario}</p>
        <p className="text-rojo">@{local.instagram}</p>
      </div>
    </section>
  );
}
