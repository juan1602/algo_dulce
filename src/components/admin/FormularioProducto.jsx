import { useState } from "react";
import { subirImagen } from "../../servicios/adminApi";
import { urlImagen } from "../../config";

export function FormularioProducto({
  producto,
  categorias,
  categoriaIdPorDefecto,
  onGuardar,
  onCancelar,
}) {
  const [nombre, setNombre] = useState(producto?.nombre ?? "");
  const [descripcion, setDescripcion] = useState(producto?.descripcion ?? "");
  const [precio, setPrecio] = useState(producto?.precio ?? "");
  const [destacado, setDestacado] = useState(producto?.destacado ?? false);
  const [categoriaId, setCategoriaId] = useState(categoriaIdPorDefecto);
  const [imagenUrl, setImagenUrl] = useState(producto?.imagenUrl ?? null);
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  async function manejarArchivo(evento) {
    const archivo = evento.target.files[0];
    if (!archivo) return;

    setSubiendoImagen(true);
    setError(null);
    try {
      const resultado = await subirImagen(archivo);
      setImagenUrl(resultado.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubiendoImagen(false);
    }
  }

  async function manejarEnvio(evento) {
    evento.preventDefault();
    setError(null);
    setGuardando(true);
    try {
      await onGuardar({
        nombre,
        descripcion: descripcion || null,
        precio: Number(precio),
        destacado,
        imagenUrl,
        categoriaId: Number(categoriaId),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 px-4 py-8">
      <form
        onSubmit={manejarEnvio}
        className="mx-auto w-full max-w-md rounded-2xl bg-negro-suave p-6 ring-1 ring-negro-borde"
      >
        <h3 className="mb-4 font-display text-2xl text-rojo uppercase">
          {producto ? "Editar producto" : "Nuevo producto"}
        </h3>

        <label className="mb-1 block text-sm text-gray-400" htmlFor="nombre-producto">
          Nombre
        </label>
        <input
          id="nombre-producto"
          value={nombre}
          onChange={(evento) => setNombre(evento.target.value)}
          required
          className="mb-3 w-full rounded-lg bg-negro px-3 py-2 text-white ring-1 ring-negro-borde outline-none focus:ring-rojo"
        />

        <label className="mb-1 block text-sm text-gray-400" htmlFor="descripcion-producto">
          Descripción
        </label>
        <textarea
          id="descripcion-producto"
          value={descripcion}
          onChange={(evento) => setDescripcion(evento.target.value)}
          rows={3}
          className="mb-3 w-full rounded-lg bg-negro px-3 py-2 text-white ring-1 ring-negro-borde outline-none focus:ring-rojo"
        />

        <label className="mb-1 block text-sm text-gray-400" htmlFor="precio-producto">
          Precio (COP)
        </label>
        <input
          id="precio-producto"
          type="number"
          value={precio}
          onChange={(evento) => setPrecio(evento.target.value)}
          required
          min="0"
          className="mb-3 w-full rounded-lg bg-negro px-3 py-2 text-white ring-1 ring-negro-borde outline-none focus:ring-rojo"
        />

        <label className="mb-1 block text-sm text-gray-400" htmlFor="categoria-producto">
          Categoría
        </label>
        <select
          id="categoria-producto"
          value={categoriaId}
          onChange={(evento) => setCategoriaId(evento.target.value)}
          className="mb-3 w-full rounded-lg bg-negro px-3 py-2 text-white ring-1 ring-negro-borde outline-none focus:ring-rojo"
        >
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>

        <label className="mb-3 flex items-center gap-2 text-sm text-gray-400">
          <input
            type="checkbox"
            checked={destacado}
            onChange={(evento) => setDestacado(evento.target.checked)}
            className="h-4 w-4 accent-rojo"
          />
          Destacado (aparece en "Platos Destacados")
        </label>

        <label className="mb-1 block text-sm text-gray-400">Foto</label>
        {imagenUrl && (
          <img
            src={urlImagen(imagenUrl)}
            alt="Vista previa"
            className="mb-2 h-32 w-32 rounded-lg object-cover"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={manejarArchivo}
          className="mb-3 w-full text-sm text-gray-400"
        />
        {subiendoImagen && (
          <p className="mb-3 text-sm text-gray-400">Subiendo imagen...</p>
        )}

        {error && <p className="mb-3 text-sm text-rojo">{error}</p>}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancelar}
            className="flex-1 rounded-full bg-negro py-2 text-sm ring-1 ring-negro-borde"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={guardando || subiendoImagen}
            className="flex-1 rounded-full bg-rojo py-2 text-sm font-semibold uppercase text-white disabled:opacity-60"
          >
            {guardando ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
