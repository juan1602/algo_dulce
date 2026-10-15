// Capa que aparece encima de la foto de un producto al pasar el cursor.
// Funciona con la clase "group" del botón que la contiene: cuando el
// cursor entra al botón (group-hover), la capa pasa de invisible a visible.
// En el celular no hay cursor, así que basta con tocar el producto.
export function VistaRapida() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-cacao/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
      <span className="flex items-center gap-2 rounded-full bg-crema px-4 py-2 text-sm font-semibold text-cacao shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        Vista rápida
      </span>
    </div>
  );
}
