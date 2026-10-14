import { useState } from "react";
import { CategoriaExplorador } from "./CategoriaExplorador";
import { ProductoDetalle } from "./ProductoDetalle";
import { formatPrecio } from "../utils/formatPrecio";
import { obtenerIconoCategoria } from "../utils/categoriaIconos";
import { urlImagen } from "../config";

export function Menu({ categorias, cargando, error }) {
  const [idCategoriaSeleccionada, setIdCategoriaSeleccionada] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const idCategoriaActiva = idCategoriaSeleccionada ?? categorias[0]?.id ?? null;
  const categoriaActiva = categorias.find((c) => c.id === idCategoriaActiva);

  return (
    <section id="menu" className="mx-auto max-w-3xl scroll-mt-20 px-4 pt-14 pb-16">
      <h2 className="mb-8 text-center font-display text-4xl tracking-wide text-rojo uppercase">
        Explora el Menú
      </h2>

      {cargando && (
        <p className="text-center text-gray-400">Cargando menú...</p>
      )}
      {error && (
        <p className="text-center text-rojo">
          No se pudo cargar el menú. Intenta de nuevo más tarde.
        </p>
      )}

      {categoriaActiva && (
        <>
          <CategoriaExplorador
            categorias={categorias}
            idSeleccionada={idCategoriaActiva}
            onSeleccionar={setIdCategoriaSeleccionada}
          />

          <div className="mt-8 mb-4 flex items-baseline justify-between">
            <div>
              <p className="text-xs tracking-widest text-gray-500 uppercase">
                Menú
              </p>
              <h3 className="font-display text-2xl text-white uppercase">
                {categoriaActiva.nombre}
              </h3>
            </div>
            <span className="text-sm text-gray-400">
              {categoriaActiva.productos.length} productos
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {categoriaActiva.productos.map((producto) => (
              <button
                key={producto.id}
                type="button"
                onClick={() => setProductoSeleccionado(producto)}
                className="overflow-hidden rounded-xl bg-negro-suave text-left ring-1 ring-negro-borde transition hover:ring-rojo/50"
              >
                {producto.imagenUrl ? (
                  <img
                    src={urlImagen(producto.imagenUrl)}
                    alt={producto.nombre}
                    className="aspect-square w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-rojo/30 to-negro-suave text-4xl">
                    {obtenerIconoCategoria(categoriaActiva.nombre)}
                  </div>
                )}
                <div className="p-3">
                  <p className="font-semibold text-white">{producto.nombre}</p>
                  {producto.descripcion && (
                    <p className="mt-1 line-clamp-2 text-xs text-gray-400">
                      {producto.descripcion}
                    </p>
                  )}
                  <p className="mt-1 font-bold text-rojo">
                    {formatPrecio(producto.precio)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {productoSeleccionado && (
        <ProductoDetalle
          producto={productoSeleccionado}
          categoriaNombre={categoriaActiva?.nombre}
          onCerrar={() => setProductoSeleccionado(null)}
        />
      )}
    </section>
  );
}
