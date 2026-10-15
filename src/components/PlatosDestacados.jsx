import { useState } from "react";
import { ProductoDetalle } from "./ProductoDetalle";
import { VistaRapida } from "./VistaRapida";
import { BotonAgregar } from "../carrito/BotonAgregar";
import { formatPrecio } from "../utils/formatPrecio";
import { obtenerIconoCategoria } from "../utils/categoriaIconos";
import { urlImagen } from "../config";

export function PlatosDestacados({ categorias, cargando }) {
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const destacados = categorias.flatMap((categoria) =>
    categoria.productos
      .filter((producto) => producto.destacado)
      .map((producto) => ({ ...producto, categoriaNombre: categoria.nombre })),
  );

  if (cargando || destacados.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-14 text-center">
      <h2 className="font-display text-4xl tracking-wide text-crema uppercase">
        Favoritos de la casa
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
        Lo que más piden nuestros clientes
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {destacados.map((producto) => (
          <article
            key={producto.id}
            className="flex flex-col overflow-hidden rounded-2xl bg-cacao-suave text-left ring-1 ring-cacao-borde transition hover:ring-crema/50"
          >
            <button
              type="button"
              onClick={() => setProductoSeleccionado(producto)}
              className="group flex flex-1 flex-col text-left"
            >
              <div className="relative">
                {producto.imagenUrl ? (
                  <img
                    src={urlImagen(producto.imagenUrl)}
                    alt={producto.nombre}
                    className="aspect-video w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-crema/30 to-cacao-suave text-4xl">
                    {obtenerIconoCategoria(producto.categoriaNombre)}
                  </div>
                )}
                <VistaRapida />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-nata uppercase">
                  {producto.nombre}
                </h3>
                <p className="mt-2 text-sm leading-snug text-gray-400">
                  {producto.descripcion}
                </p>
                <p className="mt-4 text-xl font-bold text-crema">
                  {formatPrecio(producto.precio)}
                </p>
              </div>
            </button>
            <div className="px-6 pb-6">
              <BotonAgregar producto={producto} grande />
            </div>
          </article>
        ))}
      </div>

      {productoSeleccionado && (
        <ProductoDetalle
          producto={productoSeleccionado}
          categoriaNombre={productoSeleccionado.categoriaNombre}
          onCerrar={() => setProductoSeleccionado(null)}
        />
      )}
    </section>
  );
}
