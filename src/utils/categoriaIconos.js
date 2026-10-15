const iconos = {
  Meriendas: "🧇",
  "Opciones saludables": "🥗",
  "Bebidas calientes": "☕",
  Malteadas: "🥤",
  "Algo Dulce": "🥤",
  "Jugos naturales": "🍹",
  Postres: "🍮",
  Tortas: "🎂",
};

export function obtenerIconoCategoria(nombreCategoria) {
  return iconos[nombreCategoria] ?? "🍰";
}
