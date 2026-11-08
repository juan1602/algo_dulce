import { local } from "../data/local";

// Crédito del desarrollador al final de la página. Toda la línea es un
// enlace a WhatsApp con un mensaje listo que dice desde qué menú escriben.
const mensaje = encodeURIComponent(
  `Hola Juan Pablo, vi el menú de ${local.nombre} y me interesa uno para mi negocio.`,
);

export function Credito() {
  return (
    <footer className="border-t border-cacao-borde px-4 py-5 text-center">
      <a
        href={`https://wa.me/573182205747?text=${mensaje}`}
        target="_blank"
        rel="noreferrer"
        className="text-xs text-gray-400 transition hover:text-nata"
      >
        Desarrollado por Juan Pablo Ávila · WhatsApp 318 220 5747
      </a>
    </footer>
  );
}
