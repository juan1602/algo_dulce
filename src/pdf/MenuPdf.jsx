import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { formatPrecio } from "../utils/formatPrecio";
import { local } from "../data/local";
import logo from "../assets/logo-algo-dulce.jpg";
import greatVibes from "@fontsource/great-vibes/files/great-vibes-latin-400-normal.woff";
import josefin600 from "@fontsource/josefin-sans/files/josefin-sans-latin-600-normal.woff";
import josefin700 from "@fontsource/josefin-sans/files/josefin-sans-latin-700-normal.woff";
import archivo400 from "@fontsource/archivo/files/archivo-latin-400-normal.woff";
import archivo700 from "@fontsource/archivo/files/archivo-latin-700-normal.woff";

// Este archivo describe el PDF con componentes de @react-pdf/renderer.
// Se parecen a los de React normal, pero en vez de <div> y <p> se usan
// <View> y <Text>, y los estilos son objetos (no clases de Tailwind).

// Las mismas tipografías de la página web.
Font.register({ family: "GreatVibes", src: greatVibes });
Font.register({
  family: "Josefin",
  fonts: [
    { src: josefin600, fontWeight: 600 },
    { src: josefin700, fontWeight: 700 },
  ],
});
Font.register({
  family: "Archivo",
  fonts: [
    { src: archivo400, fontWeight: 400 },
    { src: archivo700, fontWeight: 700 },
  ],
});
// Sin esto, el PDF parte las palabras con guiones al final de la línea.
Font.registerHyphenationCallback((palabra) => [palabra]);

// Colores de la marca (los mismos de index.css).
const cacao = "#3f1310";
const crema = "#fcd9b3";
const cremaOscura = "#e8b98a";
const nata = "#fff5ea";
const cafeTexto = "#6b4a44";

const estilos = StyleSheet.create({
  portada: {
    backgroundColor: cacao,
    color: nata,
    alignItems: "center",
    justifyContent: "center",
    padding: 48,
  },
  logo: { width: 220, height: 220, borderRadius: 110 },
  eslogan: { fontFamily: "GreatVibes", fontSize: 40, color: crema, marginTop: 28 },
  tituloPortada: {
    fontFamily: "Josefin",
    fontWeight: 700,
    fontSize: 22,
    letterSpacing: 6,
    color: nata,
    marginTop: 18,
  },
  ciudadPortada: {
    fontFamily: "Archivo",
    fontSize: 11,
    letterSpacing: 3,
    color: cremaOscura,
    marginTop: 8,
  },

  pagina: {
    backgroundColor: nata,
    color: cacao,
    fontFamily: "Archivo",
    paddingTop: 44,
    paddingBottom: 60,
    paddingHorizontal: 54,
  },
  encabezado: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: cremaOscura,
    paddingBottom: 6,
    marginBottom: 18,
  },
  marcaEncabezado: { fontFamily: "GreatVibes", fontSize: 22, color: cacao },
  textoEncabezado: { fontFamily: "Josefin", fontWeight: 600, fontSize: 9, letterSpacing: 2, color: cafeTexto },

  categoria: { marginBottom: 18 },
  tituloCategoria: {
    fontFamily: "Josefin",
    fontWeight: 700,
    fontSize: 16,
    letterSpacing: 2,
    color: cacao,
    backgroundColor: crema,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
  producto: { paddingVertical: 5, paddingHorizontal: 10 },
  filaProducto: { flexDirection: "row", alignItems: "flex-end" },
  nombreProducto: { fontWeight: 700, fontSize: 11 },
  // Línea de puntos entre el nombre y el precio, como en una carta.
  puntos: {
    flexGrow: 1,
    borderBottomWidth: 1,
    borderBottomColor: cremaOscura,
    borderBottomStyle: "dotted",
    marginHorizontal: 6,
    marginBottom: 3,
  },
  precio: { fontWeight: 700, fontSize: 11 },
  descripcion: { fontSize: 9, color: cafeTexto, marginTop: 2, lineHeight: 1.35, paddingRight: 70 },

  cierre: {
    marginTop: 44,
    width: 430,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4f1d19",
    borderWidth: 1,
    borderColor: cremaOscura,
    color: nata,
    borderRadius: 8,
    padding: 16,
  },
  marcoQr: { width: 92, height: 92, backgroundColor: nata, borderRadius: 4, alignItems: "center", justifyContent: "center" },
  qr: { width: 84, height: 84 },
  textoCierre: { flex: 1, marginLeft: 18 },
  tituloCierre: { fontFamily: "Josefin", fontWeight: 700, fontSize: 14, letterSpacing: 2, color: crema },
  lineaCierre: { fontFamily: "Archivo", fontSize: 9.5, marginTop: 4, color: nata },

  pie: {
    position: "absolute",
    bottom: 26,
    left: 54,
    right: 54,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: cafeTexto,
  },
});

// wrap={false}: un producto nunca se corta entre dos páginas.
function ProductoPdf({ producto }) {
  return (
    <View style={estilos.producto} wrap={false}>
      <View style={estilos.filaProducto}>
        <Text style={estilos.nombreProducto}>{producto.nombre}</Text>
        <View style={estilos.puntos} />
        <Text style={estilos.precio}>{formatPrecio(producto.precio)}</Text>
      </View>
      {producto.descripcion && (
        <Text style={estilos.descripcion}>{producto.descripcion.trim()}</Text>
      )}
    </View>
  );
}

// 573153041912 → 315 304 1912
function telefonoLegible(numero) {
  const local10 = numero.replace(/^57/, "");
  return `${local10.slice(0, 3)} ${local10.slice(3, 6)} ${local10.slice(6)}`;
}

export function MenuPdf({ categorias, qr }) {
  const telefono = telefonoLegible(local.whatsapp);

  return (
    <Document title={`Menú – ${local.nombre}`} author={local.nombre} language="es">
      <Page size="LETTER" style={estilos.portada}>
        <Image src={logo} style={estilos.logo} />
        <Text style={estilos.eslogan}>{local.eslogan}</Text>
        <Text style={estilos.tituloPortada}>MENÚ</Text>
        <Text style={estilos.ciudadPortada}>{local.ciudad.toUpperCase()}</Text>

        {/* Cómo pedir, en la portada: así es lo primero que se ve. */}
        <View style={estilos.cierre}>
          {qr && (
            <View style={estilos.marcoQr}>
              <Image src={qr} style={estilos.qr} />
            </View>
          )}
          <View style={estilos.textoCierre}>
            <Text style={estilos.tituloCierre}>HAZ TU PEDIDO</Text>
            <Text style={estilos.lineaCierre}>WhatsApp: {telefono}</Text>
            <Text style={estilos.lineaCierre}>Instagram: @{local.instagram}</Text>
            <Text style={estilos.lineaCierre}>
              {local.barrio}, {local.direccion} · {local.ciudad}
            </Text>
            <Text style={estilos.lineaCierre}>{local.horario}</Text>
            <Text style={[estilos.lineaCierre, { color: crema }]}>
              Escanea el código para ver el menú con fotos y pedir por WhatsApp.
            </Text>
          </View>
        </View>
      </Page>

      <Page size="LETTER" style={estilos.pagina}>
        <View style={estilos.encabezado} fixed>
          <Text style={estilos.marcaEncabezado}>{local.nombre}</Text>
          <Text style={estilos.textoEncabezado}>MENÚ</Text>
        </View>

        {categorias.map((categoria) => {
          const [primero, ...resto] = categoria.productos;
          return (
            <View key={categoria.id} style={estilos.categoria}>
              {/* El título va pegado al primer producto (wrap={false}) para que
                  nunca quede solo al final de una página. */}
              <View wrap={false}>
                <Text style={estilos.tituloCategoria}>{categoria.nombre.toUpperCase()}</Text>
                {primero && <ProductoPdf producto={primero} />}
              </View>
              {resto.map((producto) => (
                <ProductoPdf key={producto.id} producto={producto} />
              ))}
            </View>
          );
        })}

        <View style={estilos.pie} fixed>
          <Text>
            {local.nombre} · {local.direccion}, {local.barrio} · WhatsApp {telefono}
          </Text>
          <Text render={({ pageNumber, totalPages }) => `${pageNumber - 1} / ${totalPages - 1}`} />
        </View>
      </Page>
    </Document>
  );
}
