# Proyecto: Algo Dulce – menú digital y página web

## Contexto
Negocio "Algo Dulce". Proyecto adaptado a partir del menú digital de otro restaurante
(Díaz Burguer): no debe quedar nada conectado a su repo, base de datos ni despliegues.
Postrería ("La casa del postre", desde 2023): tortas, postres, malteadas, waffles y meriendas.
Colores de marca: café chocolate (`cacao` #3f1310) y crema (`crema` #fcd9b3), sacados del logo.
Tipografías: Great Vibes (nombre/eslogan), Josefin Sans (títulos), Archivo (texto).
Los clientes entran casi siempre desde el celular (link de Instagram o QR).

## Fases
1. Menú digital + información del local + botón de pedir por WhatsApp.
2. Panel de administración para que el dueño edite precios y productos (backend Spring Boot + PostgreSQL).
3. Carrito que arma el pedido y lo envía por WhatsApp.
4. Pedidos en línea conectados al sistema del negocio.

Las fases 1 y 2 ya vienen hechas del proyecto original; lo actual es adaptarlas a Algo Dulce.

## Stack
- Frontend: React + Vite, estilos con Tailwind CSS (colores de marca definidos como tema).
- Backend: Spring Boot + PostgreSQL, paquete `com.algodulce.backend`.
- Fotos de productos en Cloudinary (carpeta `algo-dulce/productos`).

## Reglas
- Todo el texto de la interfaz en español de Colombia.
- Diseño mobile-first.
- Precios en pesos colombianos con formato $16.000.
- Los datos del menú van separados de los componentes, con una estructura
  que después pueda venir de una API.
- Trabaja un paso a la vez. Antes de cambios grandes, explícame el plan y espera mi aprobación.
- Explícame brevemente las decisiones técnicas: estoy aprendiendo y quiero entender el código.
