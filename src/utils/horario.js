import { local } from "../data/local";

// Devuelve el día de la semana (0 = domingo) y los minutos desde la
// medianoche en hora de Colombia, sin importar la zona horaria del celular.
function ahoraEnColombia(fecha) {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Bogota",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(fecha);

  const valor = (tipo) => partes.find((parte) => parte.type === tipo).value;
  const dias = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return {
    dia: dias.indexOf(valor("weekday")),
    minutos: Number(valor("hour")) * 60 + Number(valor("minute")),
  };
}

function aMinutos(hora) {
  const [horas, minutos] = hora.split(":").map(Number);
  return horas * 60 + minutos;
}

export function estaAbierto(fecha = new Date()) {
  const { dias, abre, cierra } = local.horarioAtencion;
  const { dia, minutos } = ahoraEnColombia(fecha);
  return dias.includes(dia) && minutos >= aMinutos(abre) && minutos < aMinutos(cierra);
}
