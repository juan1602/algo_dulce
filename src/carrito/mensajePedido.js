import { formatPrecio } from "../utils/formatPrecio";

// Arma el texto del pedido que se envía por WhatsApp. Está separado de los
// componentes para que el formato del mensaje se pueda cambiar en un solo lugar.
// En WhatsApp, *texto* sale en negrita y _texto_ en cursiva.
export function armarMensajePedido({ items, total, datos, abierto }) {
  const lineas = [];

  lineas.push("🧁 *Nuevo pedido – Algo Dulce*");
  lineas.push("");
  lineas.push(`*Cliente:* ${datos.nombre.trim()}`);
  lineas.push(`*Teléfono:* ${datos.telefono.trim()}`);
  lineas.push("");
  lineas.push("*Pedido:*");
  for (const item of items) {
    lineas.push(`• ${item.cantidad} × ${item.nombre} — ${formatPrecio(item.precio * item.cantidad)}`);
    if (item.nota.trim()) {
      lineas.push(`   _Nota: ${item.nota.trim()}_`);
    }
  }
  lineas.push("");
  lineas.push(`*Total productos:* ${formatPrecio(total)}`);
  lineas.push("");

  if (datos.entrega === "domicilio") {
    lineas.push("*Entrega:* Domicilio (valor según el barrio, por confirmar)");
    lineas.push(`*Dirección:* ${datos.direccion.trim()}, barrio ${datos.barrio.trim()}`);
  } else {
    lineas.push("*Entrega:* Recoger en el local");
  }

  if (datos.pago === "efectivo") {
    const conCuanto = datos.pagaCon.trim();
    lineas.push(`*Pago:* Efectivo${conCuanto ? ` (paga con ${conCuanto})` : ""}`);
  } else {
    lineas.push("*Pago:* Transferencia (por favor envíenme los datos)");
  }

  if (!abierto) {
    lineas.push("");
    lineas.push("_Pedido enviado fuera del horario de atención._");
  }

  return lineas.join("\n");
}

// wa.me abre WhatsApp (app o web) con el chat del número y el mensaje ya
// escrito. El texto debe ir codificado para que tildes, saltos de línea y
// emojis lleguen bien.
export function urlWhatsApp(numero, mensaje) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}
