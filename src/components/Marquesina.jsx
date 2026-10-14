// Cinta inclinada con texto que se mueve en bucle. El texto se repite
// dos veces para que la animación (que corre -50%) no deje huecos.
export function Marquesina({ texto, className = "" }) {
  return (
    <div className={`flex h-10 items-center overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquesina gap-5 font-display text-2xl tracking-wide whitespace-nowrap">
        <span>{texto}</span>
        <span>{texto}</span>
        <span aria-hidden="true">{texto}</span>
        <span aria-hidden="true">{texto}</span>
      </div>
    </div>
  );
}
