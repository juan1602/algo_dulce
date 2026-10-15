# Algo Dulce

Menú digital y página web de **Algo Dulce – La casa del postre**, postrería en San Martín, Cesar (Colombia).
Barrio Buenos Aires, Calle 17 # 13-26 · WhatsApp 315 304 1912 · Instagram [@algodulce_sanmartin.cesar](https://www.instagram.com/algodulce_sanmartin.cesar/).

## 🔗 En vivo

| | |
|---|---|
| **Sitio público** | https://algo-dulce-chi.vercel.app |
| **Panel de administración** | https://algo-dulce-chi.vercel.app/admin |
| **API del backend** | https://algodulce-production.up.railway.app |

## Qué hace hoy la página

**Para el cliente** (casi siempre desde el celular, por el link de Instagram o un QR):
- Portada con la marca, sección "Favoritos de la casa" y menú por categorías con fotos, descripciones y precios.
- Vista rápida de cada producto (foto grande, descripción completa y precio). En computador aparece "Vista rápida" al pasar el cursor; en celular hay un ícono de ojo en la foto.
- **Carrito de pedidos por WhatsApp**: el cliente agrega productos (con cantidad y nota por producto), escribe nombre y teléfono, elige domicilio o recoger y efectivo o transferencia, y se abre WhatsApp con el pedido ya escrito para el número del negocio.
  - El valor del domicilio depende del barrio y se confirma por WhatsApp.
  - Fuera del horario de atención se puede pedir igual, pero se avisa que se responderá al abrir.
  - El carrito y los datos del cliente se recuerdan en su navegador.
  - El 🧁 del título del mensaje se ve bien en la app del celular, pero en WhatsApp Web (PC) aparece como �. Se dejó así a propósito.
- Sección "Visítanos" con dirección (enlace a Google Maps), horario e Instagram.

**Para el negocio** (panel `/admin`, con usuario y contraseña):
- Crear, editar, eliminar y reordenar categorías y productos; marcar destacados; subir fotos (Cloudinary); cambiar la contraseña.

Los datos del negocio (dirección, horario, WhatsApp, Instagram) están en `src/data/local.js`. Si cambia el horario hay que actualizar tanto el texto `horario` como `horarioAtencion`, que es el que usa el carrito para saber si el local está abierto.

## Arquitectura

Son dos proyectos separados en un mismo repositorio, cada uno con su propio despliegue:

```
algo dulce/
├── src/            → Frontend (React + Vite)
└── backend/        → Backend (Spring Boot)
```

- **Frontend** (`src/`): se despliega en **Vercel**. Es la parte que ve cualquier cliente al escanear el QR — no requiere login.
- **Backend** (`backend/`): se despliega en **Railway**. Expone la API (`/api/menu` público, `/api/admin/*` protegido con login) y sirve de puente hacia:
  - **Neon** (PostgreSQL en la nube) — guarda categorías, productos y el usuario admin.
  - **Cloudinary** — guarda las fotos de los productos que se suben desde el panel.

```
Cliente (celular) ──► Vercel (frontend) ──► Railway (backend) ──► Neon (base de datos)
                                                      └────────► Cloudinary (fotos)
```

**Despliegue automático**: cada `git push` a `main` dispara un redeploy solo en Vercel y en Railway — no hay que subir nada manualmente.

## Stack

| | Frontend | Backend |
|---|---|---|
| Lenguaje/Framework | React + Vite | Spring Boot (Java 17) |
| Estilos | Tailwind CSS | — |
| Enrutamiento | React Router | — |
| Base de datos | — | PostgreSQL (JPA/Hibernate) |
| Autenticación | — | Spring Security (sesión por cookie) |
| Fotos | — | Cloudinary |

## Desarrollo local

### Requisitos
- Node.js + npm
- Java 17
- PostgreSQL corriendo localmente (o apuntar a Neon con las variables de entorno)

### Frontend

```bash
npm install
npm run dev
```

Levanta en `http://localhost:5173`. El proxy de Vite redirige `/api` e `/imagenes` al backend local en el puerto 8090.

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

Levanta en `http://localhost:8090`. La primera vez que corre contra una base de datos vacía, crea las tablas y siembra un menú inicial y el usuario `admin` con una contraseña por defecto (ver `UsuarioSeeder.java`). **Esa contraseña se debe cambiar desde el panel apenas se despliega**, porque este repositorio es público.

Por defecto se conecta a un Postgres local (`localhost:5432/algodulce`, usuario `root`). Para usar otra base (por ejemplo Neon), definir las variables de entorno antes de arrancar (ver tabla abajo).

## Variables de entorno

Todas tienen un valor por defecto pensado para desarrollo local — en producción (Railway) están configuradas como variables de entorno del servicio, nunca escritas en el código.

### Backend

| Variable | Uso | Valor local por defecto |
|---|---|---|
| `DATABASE_URL` | Conexión JDBC a Postgres | `jdbc:postgresql://localhost:5432/algodulce` |
| `DATABASE_USERNAME` | Usuario de la base | `root` |
| `DATABASE_PASSWORD` | Contraseña de la base | `123456` |
| `CLOUDINARY_CLOUD_NAME` | Cuenta de Cloudinary | *(vacío)* |
| `CLOUDINARY_API_KEY` | Cuenta de Cloudinary | *(vacío)* |
| `CLOUDINARY_API_SECRET` | Cuenta de Cloudinary | *(vacío)* |
| `FRONTEND_URL` | Origen permitido por CORS | `http://localhost:5173` |
| `COOKIE_SAME_SITE` | Política de la cookie de sesión | `Lax` |
| `COOKIE_SECURE` | Si la cookie requiere HTTPS | `false` |
| `PORT` | Puerto del servidor (lo define Railway solo) | `8090` |

Sin las credenciales de Cloudinary configuradas, la subida de fotos desde el panel no va a funcionar en local — para probarla hay que exportar esas tres variables antes de levantar el backend.

### Frontend

El frontend no necesita variables de entorno. Siempre llama al backend con rutas relativas (`/api/...`): en local las reenvía el proxy de Vite y en producción las reenvía Vercel a Railway (reglas en `vercel.json`). Así la cookie de sesión queda en el mismo dominio de la página y los celulares no la bloquean como cookie de terceros.

## Fases del proyecto

1. ✅ Menú digital + información del local
2. ✅ Panel de administración (crear/editar/eliminar categorías y productos, subir fotos)
3. ✅ Carrito que arma el pedido y lo envía por WhatsApp
4. ⬜ Pedidos en línea conectados al sistema del negocio (ver mejoras a futuro)

## 🚀 Mejoras a futuro

Ideas ordenadas por prioridad. Las de arriba son las que más valor dan con menos trabajo.

### 🔴 Prioridad alta (seguridad y lo básico)

- [ ] **Cambiar la contraseña `admin` por defecto** desde el panel y entregársela solo a la dueña.
- [ ] **Contraseña inicial por variable de entorno** (`ADMIN_PASSWORD` en Railway) en vez de estar escrita en `UsuarioSeeder.java`, para que nunca quede una clave conocida en un repo público.
- [ ] **Límite de intentos de inicio de sesión** (por ejemplo, bloquear 15 minutos tras 5 intentos fallidos) para que nadie adivine la clave probando.
- [ ] **Subir las fotos que faltan** (bebidas calientes, malteadas, jugos y algunos postres).
- [ ] **Revisar las descripciones** de los productos con la dueña (Beso de ángel, Almojábana, Genovesa, Red velvet y Palitos de queso son las menos seguras).
- [ ] **Copias de seguridad de la base de datos** en Neon (revisar la retención de backups) por si se borra algo por error desde el panel.

### 🟠 Para vender más

- [ ] **Sabores como opciones, no como nota**: en jugos, postres, tortas y la canasta de helado, que el cliente elija el sabor de una lista (y llegue claro en el mensaje) en vez de escribirlo a mano.
- [ ] **Marcar productos como "agotado"** desde el panel (un interruptor por producto): se ven en gris y no se pueden agregar al carrito, sin tener que borrarlos.
- [ ] **Tarifas de domicilio por barrio**: una lista de barrios con su valor (editable desde el panel) para mostrar el total con domicilio antes de enviar el pedido.
- [ ] **Ubicación del cliente**: botón "Usar mi ubicación" que agregue al mensaje un enlace de Google Maps, útil para domicilios.
- [ ] **Pedidos de tortas completas o personalizadas**: formulario con tamaño, sabor, fecha de entrega y mensaje en la torta, que también se envía por WhatsApp.
- [ ] **Promociones y combos** (por ejemplo "postre + malteada") y un **anuncio en la portada** editable desde el panel ("Hoy hay torta de zanahoria", "Cerrado por festivo").
- [ ] **Botón flotante de WhatsApp** para consultas generales, sin armar un pedido.
- [ ] **QR por mesa**: si el cliente entra desde el QR de una mesa, que el pedido diga "Mesa 3" en vez de pedir domicilio o recoger.

### 🟡 Para administrar mejor

- [ ] **Fase 4 – pedidos guardados**: además de abrir WhatsApp, guardar cada pedido en la base de datos y tener en el panel una lista de pedidos con estados (nuevo → en preparación → listo → entregado).
- [ ] **Estadísticas**: productos más pedidos, días y horas con más pedidos, total vendido por semana (sale de los pedidos guardados de la fase 4).
- [ ] **Datos del negocio editables desde el panel**: horario, dirección, WhatsApp e Instagram, en vez de estar en `src/data/local.js`.
- [ ] **Fotos más livianas**: que Cloudinary entregue las fotos redimensionadas y comprimidas según la pantalla, para que el menú cargue más rápido con datos móviles.
- [ ] **Varias fotos por producto** (galería en la vista rápida).
- [ ] **Más de un usuario** para el panel (por ejemplo, la dueña y una empleada), cada uno con su propia clave.

### 🟢 Para que la encuentren y se vea profesional

- [ ] **Dominio propio** (por ejemplo `algodulce.com.co`) en vez de `algo-dulce-chi.vercel.app`; al cambiarlo, actualizar las URLs de `index.html` (vista previa al compartir).
- [ ] **Perfil de Google (Google Business Profile)** con el enlace de la página, para aparecer en Google Maps y en búsquedas como "postres San Martín".
- [ ] **SEO básico**: datos estructurados de negocio local (schema.org), `sitemap.xml` y `robots.txt`.
- [ ] **Instalar como app** (PWA): que el cliente pueda agregar la página a la pantalla de inicio del celular con el logo de Algo Dulce.
- [ ] **Buscador** en el menú (útil cuando haya muchos productos).
- [ ] **Reseñas o testimonios** de clientes en la portada.

### ⚙️ Técnico

- [ ] **Pruebas automáticas** del armado del mensaje de WhatsApp y del cálculo del horario, que corran solas en cada `git push` (GitHub Actions).
- [ ] **Medir visitas** (por ejemplo Vercel Analytics) para saber cuánta gente entra y desde dónde.
- [ ] **Plan de Vercel**: el plan gratis (Hobby) es para uso no comercial; si el negocio crece, pasar al plan Pro.
- [ ] **Reutilizar el proyecto para otros negocios**: Algo Dulce y Díaz Burguer comparten casi todo el código. Se podría convertir en una sola plantilla configurable (nombre, colores, logo, datos y menú) para montar menús digitales a nuevos clientes en mucho menos tiempo.
