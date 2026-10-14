// Las peticiones al backend usan rutas relativas (/api/...) en el mismo
// dominio de la página. En desarrollo las reenvía el proxy de Vite
// (vite.config.js) y en producción las reenvía Vercel a Railway
// (vercel.json). Así la cookie de sesión es "del mismo sitio" y los
// celulares no la bloquean como cookie de terceros.
export const API_URL = "";

export function urlImagen(ruta) {
  if (!ruta) return ruta;
  // Las fotos de Cloudinary ya son URLs completas (https://...);
  // las rutas relativas antiguas (/imagenes/...) también pasan por el proxy.
  return ruta.startsWith("http") ? ruta : `${API_URL}${ruta}`;
}
