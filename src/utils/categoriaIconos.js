const iconos = {
  Hamburguesas: "🍔",
  Papas: "🍟",
  Sándwiches: "🥪",
  Perros: "🌭",
  Adicionales: "➕",
  Entradas: "🍽️",
  Bebidas: "🥤",
};

export function obtenerIconoCategoria(nombreCategoria) {
  return iconos[nombreCategoria] ?? "🍴";
}
