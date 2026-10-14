import { obtenerIconoCategoria } from "../utils/categoriaIconos";

export function CategoriaExplorador({ categorias, idSeleccionada, onSeleccionar, onMover }) {
  return (
    <div>
      <p className="text-xs tracking-widest text-gray-500 uppercase">Explora</p>
      <h3 className="mb-3 font-display text-2xl text-white uppercase">Categorías</h3>
      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
        {categorias.map((categoria) => {
          const activa = categoria.id === idSeleccionada;
          return (
            <div key={categoria.id} className="flex w-20 shrink-0 flex-col items-center gap-1">
              <button
                type="button"
                onClick={() => onSeleccionar(categoria.id)}
                className={`flex w-20 shrink-0 flex-col items-center gap-2 rounded-xl p-3 ring-1 transition ${
                  activa
                    ? "bg-rojo/15 ring-rojo"
                    : "bg-negro-suave ring-negro-borde hover:ring-rojo/40"
                }`}
              >
                <span className="text-2xl">{obtenerIconoCategoria(categoria.nombre)}</span>
                <span className="text-center text-xs font-medium text-white">
                  {categoria.nombre}
                </span>
              </button>
              {onMover && (
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => onMover(categoria, "arriba")}
                    title="Mover antes"
                    className="rounded-full bg-negro-suave px-2 py-0.5 text-xs text-gray-400 ring-1 ring-negro-borde hover:text-white"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => onMover(categoria, "abajo")}
                    title="Mover después"
                    className="rounded-full bg-negro-suave px-2 py-0.5 text-xs text-gray-400 ring-1 ring-negro-borde hover:text-white"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
