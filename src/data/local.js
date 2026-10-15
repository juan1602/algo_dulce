// Información del negocio. Pensado para que en la Fase 2
// esto venga de una API en lugar de estar escrito aquí.
export const local = {
  nombre: "Algo Dulce",
  eslogan: "La casa del postre",
  ciudad: "San Martín, Cesar",
  barrio: "Buenos Aires",
  direccion: "Calle 17 # 13-26",
  horario: "Jueves a lunes, 3:30 p. m. a 7:30 p. m.",
  // El mismo horario, pero en un formato que el código pueda revisar para
  // saber si el local está abierto. Días: 0 = domingo, 1 = lunes … 6 = sábado.
  // Horas en formato de 24 horas, hora de Colombia.
  horarioAtencion: {
    dias: [4, 5, 6, 0, 1],
    abre: "15:30",
    cierra: "19:30",
  },
  whatsapp: "573153041912",
  instagram: "algodulce_sanmartin.cesar",
};
