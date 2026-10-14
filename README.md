# Algo Dulce

Menú digital y página web de Algo Dulce.

## 🔗 En vivo

Pendiente: todavía no está desplegado. Cuando existan, aquí van los enlaces del sitio público (Vercel), el panel de administración (`/admin`) y la API del backend (Railway).

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

Levanta en `http://localhost:8090`. La primera vez que corre contra una base de datos vacía, crea las tablas y siembra el menú inicial (categorías, productos y el usuario admin: `admin` / `admin123`).

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
3. ⬜ Carrito que arma el pedido y lo envía por WhatsApp
4. ⬜ Pedidos en línea conectados al sistema del negocio
