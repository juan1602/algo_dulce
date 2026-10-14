import { useState } from "react";
import { cambiarPassword } from "../../servicios/adminApi";

export function FormularioPassword({ onCerrar }) {
  const [passwordActual, setPasswordActual] = useState("");
  const [passwordNueva, setPasswordNueva] = useState("");
  const [passwordConfirmar, setPasswordConfirmar] = useState("");
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);
  const [guardando, setGuardando] = useState(false);

  async function manejarEnvio(evento) {
    evento.preventDefault();
    setError(null);

    if (passwordNueva !== passwordConfirmar) {
      setError("Las contraseñas nuevas no coinciden");
      return;
    }

    setGuardando(true);
    try {
      await cambiarPassword(passwordActual, passwordNueva);
      setExito(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-cacao-suave p-6 ring-1 ring-cacao-borde">
        <h3 className="mb-4 font-display text-2xl text-crema uppercase">
          Cambiar contraseña
        </h3>

        {exito ? (
          <>
            <p className="mb-4 text-sm text-green-400">
              Contraseña actualizada correctamente.
            </p>
            <button
              type="button"
              onClick={onCerrar}
              className="w-full rounded-full bg-crema py-2 text-sm font-semibold text-cacao uppercase transition hover:bg-crema-oscura"
            >
              Cerrar
            </button>
          </>
        ) : (
          <form onSubmit={manejarEnvio}>
            <label className="mb-1 block text-sm text-gray-400" htmlFor="password-actual">
              Contraseña actual
            </label>
            <input
              id="password-actual"
              type="password"
              value={passwordActual}
              onChange={(evento) => setPasswordActual(evento.target.value)}
              required
              autoComplete="current-password"
              className="mb-3 w-full rounded-lg bg-cacao px-3 py-2 text-nata ring-1 ring-cacao-borde outline-none focus:ring-crema"
            />

            <label className="mb-1 block text-sm text-gray-400" htmlFor="password-nueva">
              Contraseña nueva
            </label>
            <input
              id="password-nueva"
              type="password"
              value={passwordNueva}
              onChange={(evento) => setPasswordNueva(evento.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              className="mb-3 w-full rounded-lg bg-cacao px-3 py-2 text-nata ring-1 ring-cacao-borde outline-none focus:ring-crema"
            />

            <label className="mb-1 block text-sm text-gray-400" htmlFor="password-confirmar">
              Confirmar contraseña nueva
            </label>
            <input
              id="password-confirmar"
              type="password"
              value={passwordConfirmar}
              onChange={(evento) => setPasswordConfirmar(evento.target.value)}
              required
              autoComplete="new-password"
              className="mb-4 w-full rounded-lg bg-cacao px-3 py-2 text-nata ring-1 ring-cacao-borde outline-none focus:ring-crema"
            />

            {error && <p className="mb-4 text-sm text-crema">{error}</p>}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onCerrar}
                className="flex-1 rounded-full bg-cacao py-2 text-sm ring-1 ring-cacao-borde"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={guardando}
                className="flex-1 rounded-full bg-crema py-2 text-sm font-semibold text-cacao uppercase disabled:opacity-60"
              >
                {guardando ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
