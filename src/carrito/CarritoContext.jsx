import { createContext, useContext, useEffect, useState } from "react";

// El carrito vive en un "contexto" de React: un estado que comparten todos
// los componentes que están dentro de <CarritoProvider>, sin tener que
// pasarlo de padre a hijo por props. Así el botón "Agregar" de una tarjeta,
// la barra de abajo y el panel del pedido ven y cambian el mismo carrito.

const CLAVE_ALMACENAMIENTO = "algo-dulce-carrito";

const CarritoContext = createContext(null);

// localStorage guarda el carrito en el navegador del cliente, para que no
// se pierda si recarga la página. Puede fallar (modo incógnito, almacenamiento
// bloqueado), así que cualquier error se ignora y el carrito arranca vacío.
function leerCarritoGuardado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_ALMACENAMIENTO));
    return Array.isArray(guardado) ? guardado : [];
  } catch {
    return [];
  }
}

export function CarritoProvider({ children }) {
  // Cada item: { id, nombre, precio, cantidad, nota }
  const [items, setItems] = useState(leerCarritoGuardado);
  const [panelAbierto, setPanelAbierto] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_ALMACENAMIENTO, JSON.stringify(items));
    } catch {
      // Sin almacenamiento el carrito sigue funcionando, solo no se recuerda.
    }
  }, [items]);

  function agregar(producto) {
    setItems((actuales) => {
      const existente = actuales.find((item) => item.id === producto.id);
      if (existente) {
        return actuales.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item,
        );
      }
      return [
        ...actuales,
        { id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1, nota: "" },
      ];
    });
  }

  function cambiarCantidad(id, cantidad) {
    setItems((actuales) =>
      cantidad <= 0
        ? actuales.filter((item) => item.id !== id)
        : actuales.map((item) => (item.id === id ? { ...item, cantidad } : item)),
    );
  }

  function cambiarNota(id, nota) {
    setItems((actuales) => actuales.map((item) => (item.id === id ? { ...item, nota } : item)));
  }

  function vaciar() {
    setItems([]);
  }

  const cantidadTotal = items.reduce((suma, item) => suma + item.cantidad, 0);
  const total = items.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
  const cantidadDe = (id) => items.find((item) => item.id === id)?.cantidad ?? 0;

  const valor = {
    items,
    cantidadTotal,
    total,
    cantidadDe,
    agregar,
    cambiarCantidad,
    cambiarNota,
    vaciar,
    panelAbierto,
    abrirPanel: () => setPanelAbierto(true),
    cerrarPanel: () => setPanelAbierto(false),
  };

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

export function useCarrito() {
  const contexto = useContext(CarritoContext);
  if (!contexto) {
    throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
  }
  return contexto;
}
