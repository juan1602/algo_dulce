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
    <div className="flex min-h-screen items-center justify-center bg-negro px-4">
      <form
        onSubmit={manejarEnvio}
        className="w-full max-w-sm rounded-2xl bg-negro-suave p-8 ring-1 ring-negro-borde"
      >
        <h1 className="mb-6 text-center font-display text-3xl text-rojo uppercase">
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
          className="mb-4 w-full rounded-lg bg-negro px-3 py-2 text-white ring-1 ring-negro-borde outline-none focus:ring-rojo"
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
          className="mb-4 w-full rounded-lg bg-negro px-3 py-2 text-white ring-1 ring-negro-borde outline-none focus:ring-rojo"
        />

        {error && <p className="mb-4 text-sm text-rojo">{error}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="w-full rounded-full bg-rojo py-2 font-semibold tracking-wide text-white uppercase transition hover:bg-rojo-oscuro disabled:opacity-60"
        >
          {enviando ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
