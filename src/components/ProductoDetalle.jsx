import { formatPrecio } from "../utils/formatPrecio";
import { obtenerIconoCategoria } from "../utils/categoriaIconos";
import { urlImagen } from "../config";

export function ProductoDetalle({ producto, categoriaNombre, onCerrar }) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-negro">
      <div className="relative mx-auto max-w-3xl">
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Volver"
          className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-negro-suave text-xl text-white ring-1 ring-negro-borde"
        >
          ←
        </button>

        {producto.imagenUrl ? (
          <img
            src={urlImagen(producto.imagenUrl)}
            alt={producto.nombre}
            className="aspect-square w-full object-cover"
          />
        ) : (
          <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-rojo/30 to-negro-suave text-8xl">
            {obtenerIconoCategoria(categoriaNombre)}
          </div>
        )}

        <div className="px-6 py-6">
          <p className="text-xs tracking-widest text-gray-500 uppercase">Producto</p>
          <h2 className="mt-1 font-display text-3xl text-white uppercase">
            {producto.nombre}
          </h2>
          {producto.descripcion && (
            <p className="mt-3 leading-relaxed text-gray-400">
              {producto.descripcion}
            </p>
          )}
          <p className="mt-6 text-2xl font-bold text-rojo">
            {formatPrecio(producto.precio)}
          </p>
        </div>
      </div>
    </div>
  );
}
