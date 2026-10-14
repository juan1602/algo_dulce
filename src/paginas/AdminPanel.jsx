import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMenu } from "../hooks/useMenu";
import { CategoriaExplorador } from "../components/CategoriaExplorador";
import { FormularioCategoria } from "../components/admin/FormularioCategoria";
import { FormularioProducto } from "../components/admin/FormularioProducto";
import { FormularioPassword } from "../components/admin/FormularioPassword";
import { formatPrecio } from "../utils/formatPrecio";
import { obtenerIconoCategoria } from "../utils/categoriaIconos";
import { API_URL, urlImagen } from "../config";
import {
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
  moverCategoria,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  moverProducto,
} from "../servicios/adminApi";

export function AdminPanel() {
  const navegar = useNavigate();
  const { categorias, cargando, recargar } = useMenu();

  const [idCategoriaSeleccionada, setIdCategoriaSeleccionada] = useState(null);
  const [categoriaEnEdicion, setCategoriaEnEdicion] = useState(null);
  const [productoEnEdicion, setProductoEnEdicion] = useState(null);
  const [cambiandoPassword, setCambiandoPassword] = useState(false);

  const idCategoriaActiva = idCategoriaSeleccionada ?? categorias[0]?.id ?? null;
  const categoriaActiva = categorias.find((c) => c.id === idCategoriaActiva);

  async function cerrarSesion() {
    await fetch(`${API_URL}/api/auth/logout`, { method: "POST", credentials: "include" });
    navegar("/admin/login");
  }

  async function guardarCategoria(nombre) {
    if (categoriaEnEdicion?.id) {
      await actualizarCategoria(categoriaEnEdicion.id, nombre);
    } else {
      await crearCategoria(nombre);
    }
    setCategoriaEnEdicion(null);
    await recargar();
  }

  async function manejarEliminarCategoria(categoria) {
    if (!confirm(`¿Eliminar la categoría "${categoria.nombre}" y todos sus productos?`)) {
      return;
    }
    await eliminarCategoria(categoria.id);
    if (idCategoriaSeleccionada === categoria.id) {
      setIdCategoriaSeleccionada(null);
    }
    await recargar();
  }

  async function manejarMoverCategoria(categoria, direccion) {
    await moverCategoria(categoria.id, direccion);
    await recargar();
  }

  async function guardarProducto(datos) {
    if (productoEnEdicion && productoEnEdicion !== "nuevo") {
      await actualizarProducto(productoEnEdicion.id, datos);
    } else {
      await crearProducto(datos);
    }
    setProductoEnEdicion(null);
    await recargar();
  }

  async function manejarEliminarProducto(producto) {
    if (!confirm(`¿Eliminar "${producto.nombre}"?`)) {
      return;
    }
    await eliminarProducto(producto.id);
    await recargar();
  }

  async function manejarMoverProducto(producto, direccion) {
    await moverProducto(producto.id, direccion);
    await recargar();
  }

  return (
    <div className="min-h-screen bg-negro px-4 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-3xl text-rojo uppercase">
            Panel de administración
          </h1>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setCambiandoPassword(true)}
              className="rounded-full bg-negro-suave px-4 py-2 text-sm ring-1 ring-negro-borde transition hover:ring-rojo/50"
            >
              Cambiar contraseña
            </button>
            <button
              type="button"
              onClick={cerrarSesion}
              className="rounded-full bg-negro-suave px-4 py-2 text-sm ring-1 ring-negro-borde transition hover:ring-rojo/50"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {cargando && <p className="text-gray-400">Cargando...</p>}

        {!cargando && (
          <>
            {categorias.length > 0 && (
              <div className="mb-4">
                <CategoriaExplorador
                  categorias={categorias}
                  idSeleccionada={idCategoriaActiva}
                  onSeleccionar={setIdCategoriaSeleccionada}
                  onMover={manejarMoverCategoria}
                />
              </div>
            )}

            <div className="mb-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setCategoriaEnEdicion({})}
                className="rounded-full bg-negro-suave px-4 py-2 text-sm ring-1 ring-negro-borde transition hover:ring-rojo/50"
              >
                + Nueva categoría
              </button>
              {categoriaActiva && (
                <>
                  <button
                    type="button"
                    onClick={() => setCategoriaEnEdicion(categoriaActiva)}
                    className="rounded-full bg-negro-suave px-4 py-2 text-sm ring-1 ring-negro-borde transition hover:ring-rojo/50"
                  >
                    Editar categoría
                  </button>
                  <button
                    type="button"
                    onClick={() => manejarEliminarCategoria(categoriaActiva)}
                    className="rounded-full bg-negro-suave px-4 py-2 text-sm text-rojo ring-1 ring-negro-borde transition hover:ring-rojo/50"
                  >
                    Eliminar categoría
                  </button>
                </>
              )}
            </div>

            {categoriaActiva && (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-display text-2xl text-white uppercase">
                    {categoriaActiva.nombre}
                  </h2>
                  <button
                    type="button"
                    onClick={() => setProductoEnEdicion("nuevo")}
                    className="rounded-full bg-rojo px-4 py-2 text-sm font-semibold text-white uppercase transition hover:bg-rojo-oscuro"
                  >
                    + Nuevo producto
                  </button>
                </div>

                <div className="space-y-3">
                  {categoriaActiva.productos.map((producto, indice) => (
                    <div
                      key={producto.id}
                      className="flex items-center gap-4 rounded-xl bg-negro-suave p-4 ring-1 ring-negro-borde"
                    >
                      {producto.imagenUrl ? (
                        <img
                          src={urlImagen(producto.imagenUrl)}
                          alt={producto.nombre}
                          className="h-14 w-14 shrink-0 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-rojo/30 to-negro text-2xl">
                          {obtenerIconoCategoria(categoriaActiva.nombre)}
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-white">
                          {producto.nombre}{" "}
                          {producto.destacado && (
                            <span className="text-xs text-rojo">★ destacado</span>
                          )}
                        </p>
                        <p className="text-sm text-gray-400">
                          {formatPrecio(producto.precio)}
                        </p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          onClick={() => manejarMoverProducto(producto, "arriba")}
                          disabled={indice === 0}
                          title="Mover arriba"
                          className="rounded-full bg-negro px-2 py-0.5 text-xs text-gray-400 ring-1 ring-negro-borde hover:text-white disabled:opacity-30"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => manejarMoverProducto(producto, "abajo")}
                          disabled={indice === categoriaActiva.productos.length - 1}
                          title="Mover abajo"
                          className="rounded-full bg-negro px-2 py-0.5 text-xs text-gray-400 ring-1 ring-negro-borde hover:text-white disabled:opacity-30"
                        >
                          ↓
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => setProductoEnEdicion(producto)}
                        className="rounded-full bg-negro px-3 py-1.5 text-xs ring-1 ring-negro-borde transition hover:ring-rojo/50"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => manejarEliminarProducto(producto)}
                        className="rounded-full bg-negro px-3 py-1.5 text-xs text-rojo ring-1 ring-negro-borde transition hover:ring-rojo/50"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                  {categoriaActiva.productos.length === 0 && (
                    <p className="text-sm text-gray-400">
                      Esta categoría todavía no tiene productos.
                    </p>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {categoriaEnEdicion !== null && (
        <FormularioCategoria
          categoria={categoriaEnEdicion.id ? categoriaEnEdicion : null}
          onGuardar={guardarCategoria}
          onCancelar={() => setCategoriaEnEdicion(null)}
        />
      )}

      {productoEnEdicion !== null && categoriaActiva && (
        <FormularioProducto
          producto={productoEnEdicion === "nuevo" ? null : productoEnEdicion}
          categorias={categorias}
          categoriaIdPorDefecto={idCategoriaActiva}
          onGuardar={guardarProducto}
          onCancelar={() => setProductoEnEdicion(null)}
        />
      )}

      {cambiandoPassword && (
        <FormularioPassword onCerrar={() => setCambiandoPassword(false)} />
      )}
    </div>
  );
}
