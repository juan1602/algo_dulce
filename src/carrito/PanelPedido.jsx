import { useEffect, useState } from "react";
import { useCarrito } from "./CarritoContext";
import { armarMensajePedido, urlWhatsApp } from "./mensajePedido";
import { formatPrecio } from "../utils/formatPrecio";
import { estaAbierto } from "../utils/horario";
import { local } from "../data/local";

const CLAVE_DATOS = "algo-dulce-datos-cliente";

const DATOS_VACIOS = {
  nombre: "",
  telefono: "",
  entrega: "recoger",
  direccion: "",
  barrio: "",
  pago: "efectivo",
  pagaCon: "",
};

// Los datos del cliente se recuerdan en su navegador para que la próxima
// vez no tenga que escribirlos otra vez ("con cuánto paga" no, porque cambia).
function leerDatosGuardados() {
  try {
    const guardados = JSON.parse(localStorage.getItem(CLAVE_DATOS));
    return { ...DATOS_VACIOS, ...guardados, pagaCon: "" };
  } catch {
    return DATOS_VACIOS;
  }
}

function validar(datos) {
  const errores = {};
  if (!datos.nombre.trim()) errores.nombre = "Escribe tu nombre.";
  if (datos.telefono.replace(/\D/g, "").length < 7) errores.telefono = "Escribe un número de contacto válido.";
  if (datos.entrega === "domicilio") {
    if (!datos.direccion.trim()) errores.direccion = "Escribe la dirección.";
    if (!datos.barrio.trim()) errores.barrio = "Escribe el barrio.";
  }
  return errores;
}

export function PanelPedido() {
  const { items, total, cambiarCantidad, cambiarNota, vaciar, panelAbierto, cerrarPanel } = useCarrito();
  const [datos, setDatos] = useState(leerDatosGuardados);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);

  // Mientras el panel está abierto: cerrar con Escape y bloquear el scroll de atrás.
  useEffect(() => {
    if (!panelAbierto) return undefined;
    function alPresionarTecla(evento) {
      if (evento.key === "Escape") cerrarPanel();
    }
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", alPresionarTecla);
    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", alPresionarTecla);
    };
  }, [panelAbierto, cerrarPanel]);

  if (!panelAbierto) {
    return null;
  }

  const abierto = estaAbierto();

  function cambiar(campo, valor) {
    setDatos((actuales) => ({ ...actuales, [campo]: valor }));
    setErrores((actuales) => ({ ...actuales, [campo]: undefined }));
  }

  function enviarPedido(evento) {
    evento.preventDefault();
    const nuevosErrores = validar(datos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    try {
      localStorage.setItem(CLAVE_DATOS, JSON.stringify({ ...datos, pagaCon: "" }));
    } catch {
      // Si no se puede guardar, no pasa nada: solo no se recuerdan los datos.
    }

    const mensaje = armarMensajePedido({ items, total, datos, abierto });
    const url = urlWhatsApp(local.whatsapp, mensaje);
    // Algunos navegadores (por ejemplo el que trae Instagram por dentro)
    // bloquean abrir pestañas nuevas. Si pasa, se abre WhatsApp en la misma
    // pestaña; el carrito queda guardado por si el cliente vuelve.
    const ventana = window.open(url, "_blank");
    if (ventana) {
      ventana.opener = null;
    } else {
      window.location.href = url;
    }
    setEnviado(true);
  }

  function cerrar() {
    setEnviado(false);
    cerrarPanel();
  }

  function nuevoPedido() {
    vaciar();
    setEnviado(false);
    cerrarPanel();
  }

  const claseCampo =
    "mt-1 w-full rounded-xl bg-cacao px-4 py-3 text-nata ring-1 ring-cacao-borde placeholder:text-gray-500 focus:ring-2 focus:ring-crema focus:outline-none";

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm"
      onClick={(evento) => {
        if (evento.target === evento.currentTarget) cerrar();
      }}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Tu pedido"
        className="flex h-full w-full flex-col bg-cacao-suave shadow-2xl sm:max-w-md sm:ring-1 sm:ring-cacao-borde"
      >
        <header className="flex items-center justify-between border-b border-cacao-borde px-5 py-4">
          <h2 className="font-display text-2xl text-crema uppercase">Tu pedido</h2>
          <button
            type="button"
            onClick={cerrar}
            aria-label="Cerrar pedido"
            className="grid size-10 place-items-center rounded-full bg-cacao text-nata ring-1 ring-cacao-borde transition hover:ring-crema/50"
          >
            ✕
          </button>
        </header>

        {enviado ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-5xl">🧁</p>
            <h3 className="font-display text-2xl text-nata uppercase">¡Ya casi!</h3>
            <p className="text-gray-300">
              Tu pedido se abrió en WhatsApp. Solo falta que le des <strong>enviar</strong>.
            </p>
            {!abierto && (
              <p className="text-sm text-crema-oscura">
                Estamos fuera de horario: te responderemos apenas abramos.
              </p>
            )}
            <div className="mt-4 flex w-full flex-col gap-3">
              <button
                type="button"
                onClick={nuevoPedido}
                className="h-12 rounded-full bg-crema font-semibold text-cacao transition hover:bg-crema-oscura"
              >
                Hacer un nuevo pedido
              </button>
              <button
                type="button"
                onClick={() => setEnviado(false)}
                className="h-12 rounded-full font-semibold text-crema ring-1 ring-crema/50 transition hover:bg-white/5"
              >
                Volver a mi pedido
              </button>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center text-gray-400">
            <p className="text-5xl">🛒</p>
            <p>Tu pedido está vacío.</p>
            <button type="button" onClick={cerrar} className="font-semibold text-crema underline underline-offset-4">
              Ver el menú
            </button>
          </div>
        ) : (
          <form onSubmit={enviarPedido} noValidate className="flex min-h-0 flex-1 flex-col">
            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="rounded-xl bg-cacao p-4 ring-1 ring-cacao-borde">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-nata">{item.nombre}</p>
                        <p className="text-sm text-gray-400">{formatPrecio(item.precio)} c/u</p>
                      </div>
                      <p className="font-bold text-crema">{formatPrecio(item.precio * item.cantidad)}</p>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex h-9 items-center rounded-full ring-1 ring-crema/60">
                        <button
                          type="button"
                          onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                          aria-label={`Quitar un ${item.nombre}`}
                          className="h-full px-3 font-bold text-crema"
                        >
                          –
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{item.cantidad}</span>
                        <button
                          type="button"
                          onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                          aria-label={`Agregar otro ${item.nombre}`}
                          className="h-full px-3 font-bold text-crema"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => cambiarCantidad(item.id, 0)}
                        className="text-sm text-gray-400 underline underline-offset-4 hover:text-nata"
                      >
                        Quitar
                      </button>
                    </div>
                    <input
                      type="text"
                      value={item.nota}
                      onChange={(evento) => cambiarNota(item.id, evento.target.value)}
                      placeholder="Nota (ej.: sabor, sin hielo…)"
                      aria-label={`Nota para ${item.nombre}`}
                      className="mt-3 w-full rounded-lg bg-cacao-suave px-3 py-2 text-sm text-nata ring-1 ring-cacao-borde placeholder:text-gray-500 focus:ring-crema focus:outline-none"
                    />
                  </li>
                ))}
              </ul>

              <fieldset className="space-y-4">
                <legend className="mb-2 font-display text-xl text-crema uppercase">Tus datos</legend>

                <label className="block text-sm text-gray-300">
                  Nombre
                  <input
                    type="text"
                    autoComplete="name"
                    value={datos.nombre}
                    onChange={(evento) => cambiar("nombre", evento.target.value)}
                    className={claseCampo}
                  />
                  {errores.nombre && <span className="mt-1 block text-crema-oscura">{errores.nombre}</span>}
                </label>

                <label className="block text-sm text-gray-300">
                  Teléfono de contacto
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={datos.telefono}
                    onChange={(evento) => cambiar("telefono", evento.target.value)}
                    placeholder="300 123 4567"
                    className={claseCampo}
                  />
                  {errores.telefono && <span className="mt-1 block text-crema-oscura">{errores.telefono}</span>}
                </label>
              </fieldset>

              <fieldset>
                <legend className="mb-2 font-display text-xl text-crema uppercase">Entrega</legend>
                <div className="grid grid-cols-2 gap-3">
                  <Opcion nombre="entrega" valor="recoger" actual={datos.entrega} onCambiar={cambiar}>
                    🏠 Recoger
                  </Opcion>
                  <Opcion nombre="entrega" valor="domicilio" actual={datos.entrega} onCambiar={cambiar}>
                    🛵 Domicilio
                  </Opcion>
                </div>
                {datos.entrega === "domicilio" ? (
                  <div className="mt-4 space-y-4">
                    <label className="block text-sm text-gray-300">
                      Dirección
                      <input
                        type="text"
                        autoComplete="street-address"
                        value={datos.direccion}
                        onChange={(evento) => cambiar("direccion", evento.target.value)}
                        placeholder="Calle 10 # 5-20"
                        className={claseCampo}
                      />
                      {errores.direccion && <span className="mt-1 block text-crema-oscura">{errores.direccion}</span>}
                    </label>
                    <label className="block text-sm text-gray-300">
                      Barrio
                      <input
                        type="text"
                        value={datos.barrio}
                        onChange={(evento) => cambiar("barrio", evento.target.value)}
                        className={claseCampo}
                      />
                      {errores.barrio && <span className="mt-1 block text-crema-oscura">{errores.barrio}</span>}
                    </label>
                    <p className="text-xs text-gray-400">
                      El valor del domicilio depende del barrio y te lo confirmamos por WhatsApp.
                    </p>
                  </div>
                ) : (
                  <p className="mt-3 text-xs text-gray-400">
                    Recoges en {local.barrio}, {local.direccion}.
                  </p>
                )}
              </fieldset>

              <fieldset>
                <legend className="mb-2 font-display text-xl text-crema uppercase">Forma de pago</legend>
                <div className="grid grid-cols-2 gap-3">
                  <Opcion nombre="pago" valor="efectivo" actual={datos.pago} onCambiar={cambiar}>
                    💵 Efectivo
                  </Opcion>
                  <Opcion nombre="pago" valor="transferencia" actual={datos.pago} onCambiar={cambiar}>
                    📲 Transferencia
                  </Opcion>
                </div>
                {datos.pago === "efectivo" ? (
                  <label className="mt-4 block text-sm text-gray-300">
                    ¿Con cuánto pagas? <span className="text-gray-500">(opcional, para llevarte el cambio)</span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={datos.pagaCon}
                      onChange={(evento) => cambiar("pagaCon", evento.target.value)}
                      placeholder="$50.000"
                      className={claseCampo}
                    />
                  </label>
                ) : (
                  <p className="mt-3 text-xs text-gray-400">
                    Te enviamos los datos para la transferencia por WhatsApp.
                  </p>
                )}
              </fieldset>
            </div>

            <footer className="space-y-3 border-t border-cacao-borde px-5 py-4">
              {!abierto && (
                <p className="rounded-xl bg-cacao px-4 py-3 text-sm text-crema-oscura ring-1 ring-cacao-borde">
                  🌙 Estamos fuera de horario ({local.horario}). Puedes enviar tu pedido y te
                  responderemos apenas abramos.
                </p>
              )}
              <div className="flex items-baseline justify-between">
                <span className="text-gray-300">Total productos</span>
                <span className="text-2xl font-bold text-crema">{formatPrecio(total)}</span>
              </div>
              {datos.entrega === "domicilio" && (
                <p className="-mt-2 text-right text-xs text-gray-400">+ domicilio por confirmar</p>
              )}
              <button
                type="submit"
                className="flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] font-semibold text-white transition hover:brightness-95 active:scale-[0.98]"
              >
                <IconoWhatsApp />
                Pedir por WhatsApp
              </button>
            </footer>
          </form>
        )}
      </aside>
    </div>
  );
}

// Botón tipo "radio" con estilo de tarjeta seleccionable.
function Opcion({ nombre, valor, actual, onCambiar, children }) {
  const activa = actual === valor;
  return (
    <label
      className={`flex cursor-pointer items-center justify-center rounded-xl px-3 py-3 text-sm font-semibold ring-1 transition ${
        activa ? "bg-crema/15 text-nata ring-crema" : "bg-cacao text-gray-300 ring-cacao-borde hover:ring-crema/40"
      }`}
    >
      <input
        type="radio"
        name={nombre}
        value={valor}
        checked={activa}
        onChange={() => onCambiar(nombre, valor)}
        className="sr-only"
      />
      {children}
    </label>
  );
}

function IconoWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.36 9.36 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.65l6.05-1.59a11.3 11.3 0 0 0 5.4 1.38h.01c6.25 0 11.34-5.09 11.34-11.35 0-3.03-1.18-5.88-3.32-8.02" />
    </svg>
  );
}
