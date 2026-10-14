import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API_URL } from "../config";

export function RutaProtegida({ children }) {
  const [estado, setEstado] = useState("verificando");

  useEffect(() => {
    fetch(`${API_URL}/api/auth/me`, { credentials: "include" })
      .then((respuesta) => setEstado(respuesta.ok ? "autenticado" : "no-autenticado"))
      .catch(() => setEstado("no-autenticado"));
  }, []);

  if (estado === "verificando") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-negro text-gray-400">
        Verificando sesión...
      </div>
    );
  }

  if (estado === "no-autenticado") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
