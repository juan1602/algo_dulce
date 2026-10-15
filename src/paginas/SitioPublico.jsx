import { useEffect } from "react";
import { useMenu } from "../hooks/useMenu";
import { StickyHeader } from "../components/StickyHeader";
import { Hero } from "../components/Hero";
import { PlatosDestacados } from "../components/PlatosDestacados";
import { Menu } from "../components/Menu";
import { Contacto } from "../components/Contacto";
import { CarritoProvider } from "../carrito/CarritoContext";
import { BarraCarrito } from "../carrito/BarraCarrito";
import { PanelPedido } from "../carrito/PanelPedido";

export function SitioPublico() {
  const { categorias, cargando, error } = useMenu();

  // Una vez carga el menú, la página crece de tamaño. Si el usuario
  // hizo clic en "Ver menú" (o entró con #menu en el link) antes de que
  // terminara de cargar, el scroll automático del navegador queda corto
  // porque calculó la posición con la página todavía chica — así que lo
  // reubicamos apenas los datos están listos.
  useEffect(() => {
    if (!cargando && window.location.hash === "#menu") {
      document.getElementById("menu")?.scrollIntoView();
    }
  }, [cargando]);

  return (
    <CarritoProvider>
      {/* pb-24 deja espacio para que la barra del carrito no tape el final de la página. */}
      <div className="min-h-screen bg-cacao pb-24">
        <StickyHeader />
        <Hero />
        <PlatosDestacados categorias={categorias} cargando={cargando} />
        <Menu categorias={categorias} cargando={cargando} error={error} />
        <Contacto />
      </div>
      <BarraCarrito />
      <PanelPedido />
    </CarritoProvider>
  );
}
