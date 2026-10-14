import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

export function AdminLogin() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const navegar = useNavigate();

  async function manejarEnvio(evento) {
    evento.preventDefault();
    setError(null);
    setEnviando(true);

    try {
      const respuesta = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username: usuario, password: contrasena }),
      });

      if (!respuesta.ok) {
        throw new Error("Usuario o contraseña incorrectos");
      }

      navegar("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cacao px-4">
      <form
        onSubmit={manejarEnvio}
        className="w-full max-w-sm rounded-2xl bg-cacao-suave p-8 ring-1 ring-cacao-borde"
      >
        <h1 className="mb-6 text-center font-display text-3xl text-crema uppercase">
          Panel Algo Dulce
        </h1>

        <label className="mb-1 block text-sm text-gray-400" htmlFor="usuario">
          Usuario
        </label>
        <input
          id="usuario"
          value={usuario}
          onChange={(evento) => setUsuario(evento.target.value)}
          autoComplete="username"
          className="mb-4 w-full rounded-lg bg-cacao px-3 py-2 text-nata ring-1 ring-cacao-borde outline-none focus:ring-crema"
        />

        <label className="mb-1 block text-sm text-gray-400" htmlFor="contrasena">
          Contraseña
        </label>
        <input
          id="contrasena"
          type="password"
          value={contrasena}
          onChange={(evento) => setContrasena(evento.target.value)}
          autoComplete="current-password"
          className="mb-4 w-full rounded-lg bg-cacao px-3 py-2 text-nata ring-1 ring-cacao-borde outline-none focus:ring-crema"
        />

        {error && <p className="mb-4 text-sm text-crema">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-full bg-crema py-2 font-semibold tracking-wide text-cacao uppercase transition hover:bg-crema-oscura disabled:opacity-60"
        >
          {enviando ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
