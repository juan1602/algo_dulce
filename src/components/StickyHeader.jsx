import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function StickyHeader() {
  const [conFondo, setConFondo] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    function alScroll() {
      setConFondo(window.scrollY > 40);
    }
    window.addEventListener("scroll", alScroll);
    return () => window.removeEventListener("scroll", alScroll);
  }, []);

  const cerrarMenu = () => setMenuAbierto(false);
  const claseEnlace =
    "block rounded-xl px-4 py-3 font-display text-2xl tracking-wide transition hover:bg-white/5 hover:text-caramelo";

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        menuAbierto
          ? "bg-cacao shadow-lg shadow-black/40"
          : conFondo
            ? "bg-cacao/95 shadow-lg shadow-black/40 backdrop-blur"
            : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-17 max-w-5xl items-center justify-between px-5">
        <a href="#" className="font-script text-4xl text-crema">
          Algo Dulce
        </a>
        <button
          type="button"
          onClick={() => setMenuAbierto((abierto) => !abierto)}
          aria-label={menuAbierto ? "Cerrar navegación" : "Abrir navegación"}
          aria-expanded={menuAbierto}
          className="grid size-11 place-items-center rounded-xl border border-nata/20 bg-white/5 text-nata"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {menuAbierto ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h10" />
            )}
          </svg>
        </button>
      </div>

      {menuAbierto && (
        <div className="mx-auto max-w-5xl px-5 pb-4">
          <a href="#menu" onClick={cerrarMenu} className={claseEnlace}>
            Menú
          </a>
          <a href="#contacto" onClick={cerrarMenu} className={claseEnlace}>
            Contacto
          </a>
          <Link to="/admin" onClick={cerrarMenu} className={`${claseEnlace} text-nata/60`}>
            Administración
          </Link>
        </div>
      )}
    </nav>
  );
}
