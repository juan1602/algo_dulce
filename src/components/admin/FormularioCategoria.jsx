import { useState } from "react";

export function FormularioCategoria({ categoria, onGuardar, onCancelar }) {
  const [nombre, setNombre] = useState(categoria?.nombre ?? "");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  async function manejarEnvio(evento) {
    evento.preventDefault();
    setError(null);
    setGuardando(true);
    try {
      await onGuardar(nombre);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <form
        onSubmit={manejarEnvio}
        className="w-full max-w-sm rounded-2xl bg-cacao-suave p-6 ring-1 ring-cacao-borde"
      >
        <h3 className="mb-4 font-display text-2xl text-crema uppercase">
          {categoria ? "Editar categoría" : "Nueva categoría"}
        </h3>

        <label className="mb-1 block text-sm text-gray-400" htmlFor="nombre-categoria">
          Nombre
        </label>
        <input
          id="nombre-categoria"
          value={nombre}
          onChange={(evento) => setNombre(evento.target.value)}
          required
          className="mb-4 w-full rounded-lg bg-cacao px-3 py-2 text-nata ring-1 ring-cacao-borde outline-none focus:ring-crema"
        />

        {error && <p className="mb-3 text-sm text-crema">{error}</p>}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancelar}
            className="flex-1 rounded-full bg-cacao py-2 text-sm ring-1 ring-cacao-borde"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={guardando}
            className="flex-1 rounded-full bg-crema py-2 text-sm font-semibold uppercase text-cacao disabled:opacity-60"
          >
            {guardando ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
