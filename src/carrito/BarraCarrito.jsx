import { useCarrito } from "./CarritoContext";
import { formatPrecio } from "../utils/formatPrecio";

// Barra fija en la parte de abajo que aparece apenas hay algo en el carrito.
export function BarraCarrito() {
  const { cantidadTotal, total, abrirPanel, panelAbierto } = useCarrito();

  if (cantidadTotal === 0 || panelAbierto) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4">
      <button
        type="button"
        onClick={abrirPanel}
        className="mx-auto flex w-full max-w-xl items-center justify-between gap-3 rounded-full bg-crema px-5 py-3.5 font-semibold text-cacao shadow-2xl shadow-black/50 transition hover:bg-crema-oscura active:scale-[0.98]"
      >
        <span className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-full bg-cacao text-sm text-crema">
            {cantidadTotal}
          </span>
          {cantidadTotal === 1 ? "producto" : "productos"} · {formatPrecio(total)}
        </span>
        <span>Ver pedido →</span>
      </button>
    </div>
  );
}
