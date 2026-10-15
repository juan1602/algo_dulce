import { useCarrito } from "./CarritoContext";

// Si el producto no está en el carrito muestra "Agregar"; si ya está,
// muestra los botones – cantidad + para cambiarla (en 0 se quita).
export function BotonAgregar({ producto, grande = false }) {
  const { cantidadDe, agregar, cambiarCantidad } = useCarrito();
  const cantidad = cantidadDe(producto.id);
  const alto = grande ? "h-12 text-base" : "h-9 text-sm";

  if (cantidad === 0) {
    return (
      <button
        type="button"
        onClick={() => agregar(producto)}
        className={`${alto} w-full rounded-full bg-crema font-semibold text-cacao transition hover:bg-crema-oscura active:scale-95`}
      >
        Agregar
      </button>
    );
  }

  return (
    <div className={`${alto} flex w-full items-center justify-between rounded-full bg-cacao ring-1 ring-crema`}>
      <button
        type="button"
        onClick={() => cambiarCantidad(producto.id, cantidad - 1)}
        aria-label={`Quitar un ${producto.nombre}`}
        className="h-full px-4 text-lg font-bold text-crema"
      >
        –
      </button>
      <span className="font-semibold text-nata" aria-live="polite">
        {cantidad}
      </span>
      <button
        type="button"
        onClick={() => agregar(producto)}
        aria-label={`Agregar otro ${producto.nombre}`}
        className="h-full px-4 text-lg font-bold text-crema"
      >
        +
      </button>
    </div>
  );
}
