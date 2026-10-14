import { formatPrecio } from "../utils/formatPrecio";
import { obtenerIconoCategoria } from "../utils/categoriaIconos";
import { urlImagen } from "../config";

export function PlatosDestacados({ categorias, cargando }) {
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
      <h2 className="font-display text-4xl tracking-wide text-rojo uppercase">
        Platos Destacados
      </h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
        Los favoritos de la casa
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {destacados.map((producto) => (
          <article
            key={producto.id}
            className="overflow-hidden rounded-2xl bg-negro-suave text-left ring-1 ring-negro-borde"
          >
            {producto.imagenUrl ? (
              <img
                src={urlImagen(producto.imagenUrl)}
                alt={producto.nombre}
                className="aspect-video w-full object-cover"
              />
            ) : (
              <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-rojo/30 to-negro-suave text-4xl">
                {obtenerIconoCategoria(producto.categoriaNombre)}
              </div>
            )}
            <div className="p-6">
              <h3 className="font-display text-2xl text-white uppercase">
                {producto.nombre}
              </h3>
              <p className="mt-2 text-sm leading-snug text-gray-400">
                {producto.descripcion}
              </p>
              <p className="mt-4 text-xl font-bold text-rojo">
                {formatPrecio(producto.precio)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
