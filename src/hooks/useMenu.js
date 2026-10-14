import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../config";

export function useMenu() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargar = useCallback(() => {
    setCargando(true);
    setError(null);
    return fetch(`${API_URL}/api/menu`)
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar el menú");
        }
        return respuesta.json();
      })
      .then(setCategorias)
      .catch(setError)
      .finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return { categorias, cargando, error, recargar: cargar };
}
