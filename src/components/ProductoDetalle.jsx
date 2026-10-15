import { useEffect } from "react";
import { formatPrecio } from "../utils/formatPrecio";
import { obtenerIconoCategoria } from "../utils/categoriaIconos";
import { urlImagen } from "../config";
import { BotonAgregar } from "../carrito/BotonAgregar";

// En el celular ocupa toda la pantalla; desde "sm" (computador/tablet)
// es una ventana flotante centrada con la foto a un lado y la información
// al otro, dejando ver el menú oscurecido detrás.
export function ProductoDetalle({ producto, categoriaNombre, onCerrar }) {
  useEffect(() => {
    // Cerrar con la tecla Escape y bloquear el scroll de la página de atrás
    // mientras la ventana está abierta.
    function alPresionarTecla(evento) {
      if (evento.key === "Escape") onCerrar();
    }
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", alPresionarTecla);
    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", alPresionarTecla);
    };
  }, [onCerrar]);

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-cacao sm:flex sm:items-center sm:justify-center sm:bg-black/70 sm:p-6 sm:backdrop-blur-sm"
      onClick={(evento) => {
        // Solo cierra si se hace clic en el fondo oscuro, no dentro de la ventana.
        if (evento.target === evento.currentTarget) onCerrar();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={producto.nombre}
        className="relative mx-auto max-w-3xl sm:grid sm:w-full sm:grid-cols-2 sm:overflow-hidden sm:rounded-2xl sm:bg-cacao sm:shadow-2xl sm:ring-1 sm:ring-cacao-borde"
      >
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar"
          className="absolute top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-cacao-suave text-xl text-nata ring-1 ring-cacao-borde transition hover:ring-crema/50 sm:right-4 sm:left-auto"
        >
          <span className="sm:hidden">←</span>
          <span className="hidden text-base sm:inline">✕</span>
        </button>

        {producto.imagenUrl ? (
          <img
            src={urlImagen(producto.imagenUrl)}
            alt={producto.nombre}
            className="aspect-square w-full object-cover sm:h-full"
          />
        ) : (
          <div className="flex aspect-square items-center justify-center bg-gradient-to-br from-crema/30 to-cacao-suave text-8xl sm:h-full">
            {obtenerIconoCategoria(categoriaNombre)}
          </div>
        )}

        <div className="px-6 py-6 sm:flex sm:flex-col sm:justify-center sm:px-8 sm:py-10">
          <p className="text-xs tracking-widest text-gray-500 uppercase">
            {categoriaNombre ?? "Producto"}
          </p>
          <h2 className="mt-1 font-display text-3xl text-nata uppercase">
            {producto.nombre}
          </h2>
          {producto.descripcion && (
            <p className="mt-3 leading-relaxed whitespace-pre-line text-gray-400">
              {producto.descripcion}
            </p>
          )}
          <p className="mt-6 text-2xl font-bold text-crema">
            {formatPrecio(producto.precio)}
          </p>
          <div className="mt-6">
            <BotonAgregar producto={producto} grande />
          </div>
        </div>
      </div>
    </div>
  );
}
