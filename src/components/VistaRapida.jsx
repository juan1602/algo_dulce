// Indicador de "vista rápida" encima de la foto de un producto.
//
// - Con mouse (computador): una capa que aparece al pasar el cursor. Funciona
//   con la clase "group" del botón que la contiene: cuando el cursor entra al
//   botón (group-hover), la capa pasa de invisible a visible.
// - Con pantalla táctil (celular/tablet) no hay cursor, así que se muestra
//   siempre un ojo pequeño en la esquina para indicar que la foto se puede
//   tocar. "pointer-coarse" es la forma de Tailwind de decir "pantalla táctil".
export function VistaRapida() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-cacao/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:hidden">
        <span className="flex items-center gap-2 rounded-full bg-crema px-4 py-2 text-sm font-semibold text-cacao shadow-lg">
          <IconoOjo className="h-5 w-5" />
          Vista rápida
        </span>
      </div>

      <span
        className="pointer-events-none absolute top-2 right-2 hidden size-8 place-items-center rounded-full bg-cacao/75 text-crema shadow-md ring-1 ring-crema/30 backdrop-blur-sm pointer-coarse:grid"
        aria-hidden="true"
      >
        <IconoOjo className="h-4 w-4" />
      </span>
    </>
  );
}

function IconoOjo({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
