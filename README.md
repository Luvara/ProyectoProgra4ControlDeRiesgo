<section align="center">
  
# Proyecto Programacion 4: Control De Riesgos
<img src="https://mikeguzman.github.io/EIF201-Progra-I/resources/una_logo.jpeg"  width="500"/>

<h3>Ingeniería en sistemas de información</h3>
<h3>Programación 4</h3>

<h2> Developers </h2>

[![Luis Vargas Araya](https://img.shields.io/badge/Luvara-blue?style=for-the-badge&logo=html5&logoColor=black&label=Luis%20Vargas%20Araya&labelColor=white)](https://github.com/Luvara)

[![Kevin Fallas Chavarria](https://img.shields.io/badge/kevtico20-blue?style=for-the-badge&logo=react&logoColor=black&label=Kevin%20Fallas%20Chavarria&labelColor=white)](https://github.com/kevtico20)

[![Kevin Arauz Jimenez](https://img.shields.io/badge/kjarj54-blue?style=for-the-badge&logo=typescript&logoColor=black&label=Kevin%20Arauz%20Jimenez&labelColor=white)](https://github.com/kjarj54)

[![Anthony Avila Hernandez](https://img.shields.io/badge/Anthonyah131-blue?style=for-the-badge&logo=nextdotjs&logoColor=black&label=Anthony%20Avila%20Hernandez&labelColor=white)](https://github.com/kevtico20)

---

</section>

## Resumen

Aplicación web para la gestión de riesgos (Control de Riesgo) desarrollada como proyecto de la materia Programación 4. Permite crear y mantener formularios y preguntas, gestionar usuarios y roles administrativos (TI, coordinadores, jefes de área, etc.), responder formularios, visualizar métricas y enviar notificaciones por correo. La aplicación está construida con Next.js (App Router) y TypeScript.

## Características principales

- Gestión CRUD de formularios y preguntas.
- Paneles administrativos para distintos roles (TI, coordinadores, jefes de área).
- Subida y gestión de archivos/media con Cloudinary.
- Envío de correos mediante plantillas (templates) para activación, desactivación y notificaciones.
- Visualización de datos con gráficos (Chart.js).
- Estado global sencillo con Zustand.

## Tecnologías principales

- Next.js (App Router) + TypeScript
- React 18
- Tailwind CSS + PostCSS
- Prisma (ORM) para la base de datos
- Cloudinary para almacenamiento de medios
- Resend para envío de emails (cliente `resend`)
- NextAuth para autenticación
- Zustand para estado global
- Chart.js (`react-chartjs-2`) para gráficas

## Dependencias clave (destacadas)

- `next` — framework principal
- `react`, `react-dom` — UI
- `@prisma/client`, `prisma` (dev) — ORM y client
- `next-auth` — autenticación
- `cloudinary`, `next-cloudinary` — integración Cloudinary
- `resend` — envío de correos
- `zustand` — estado global
- `chart.js`, `react-chartjs-2` — visualizaciones
- `tailwindcss`, `postcss`, `autoprefixer` — estilos
- `js-cookie` — manejo de cookies

## Scripts útiles (en `package.json`)

- `npm run dev` — arranca la app en modo desarrollo (`next dev`).
- `npm run build` — construye la app para producción.
- `npm run start` — ejecuta la build en producción.
- `npm run lint` — ejecuta ESLint.
- `npm run prisma` — `prisma generate` (genera el cliente Prisma).
- `npm run lint:spell` — comprobación ortográfica con `cspell`.

## Archivos y rutas importantes

- `app/` — rutas y API (App Router). Aquí están las páginas públicas y las rutas `app/api/*`.
- `components/` — UI y componentes reutilizables (formularios, header, modals, templates de email, etc.).
- `lib/prisma.ts` — cliente Prisma.
- `lib/cloudinary.ts` — configuración de Cloudinary.
- `prisma/schema.prisma` — modelos de datos.
- `public/formData.json`, `public/userData.json` — datos de ejemplo.

## Variables de entorno (ejemplos a configurar)

Las variables exactas dependen del código y de los servicios que uses; ejemplos típicos que debes definir en `.env`:

- `DATABASE_URL` — conexión a la base de datos (Postgres, MySQL, etc.).
- `NEXTAUTH_SECRET` — secreto para NextAuth.
- `RESEND_API_KEY` — clave para Resend (si se usa Resend).
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — credenciales Cloudinary.
- `SMTP_*` o similares si se usa un SMTP alternativo.

Revisa los archivos en `app/api/` para confirmar nombres exactos de variables.

## Ejecutar localmente (PowerShell)

1. Instalar dependencias e iniciar en modo desarrollo:

npm install
npm run dev

2. Prisma: después de configurar `DATABASE_URL` ejecutar:

npx prisma generate
npx prisma migrate dev

## Notas y recomendaciones

- No subir credenciales en `.env` al repositorio. Usa `.env.example` o secretos en el despliegue.
- Si necesitas probar sin servicios externos, `public/*.json` contiene datos de ejemplo.
- Para conocer rutas API disponibles revisa `app/api/` — hay endpoints para `forms`, `questions`, `users`, `auth`, `cloudinary`, `sendEmail*`, `dashboard`, `departments`, `sections`, `usertype`, `answers`, etc.

---
