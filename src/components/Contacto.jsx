import { local } from "../data/local";

// Si existe el enlace al perfil de Google Maps se usa ese (muestra fotos,
// horario, opiniones y "Cómo llegar"); si no, se busca la dirección.
const consultaMapa = encodeURIComponent(
  `${local.direccion}, ${local.barrio}, ${local.ciudad}`,
);
const urlMapa =
  local.mapa ?? `https://www.google.com/maps/search/?api=1&query=${consultaMapa}`;

export function Contacto() {
  return (
    <section
      id="contacto"
      className="scroll-mt-20 border-t border-cacao-borde bg-cacao-suave px-4 py-14 text-center"
      aria-label="Contacto y ubicación"
    >
      <h2 className="font-display text-3xl tracking-wide text-crema uppercase">
        Visítanos
      </h2>
      <div className="mt-4 space-y-1 text-gray-300">
        <a
          href={urlMapa}
          target="_blank"
          rel="noreferrer"
          className="block underline decoration-crema/50 underline-offset-4 transition hover:text-nata"
        >
          {local.barrio}, {local.direccion}
        </a>
        <p>{local.ciudad}</p>
        <p className="text-sm text-gray-400">{local.horario}</p>
        <a
          href={`https://www.instagram.com/${local.instagram}/`}
          target="_blank"
          rel="noreferrer"
          className="block text-crema transition hover:text-nata"
        >
          @{local.instagram}
        </a>
      </div>
    </section>
  );
}
