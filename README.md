# ClockexTime

Aplicación web para gestionar fichajes de empleados, jornadas de trabajo y solicitudes de horas extra.

## Funcionalidades

- Inicio de sesión con autenticación JWT.
- Registro de entrada y salida de jornada.
- Resumen de horas trabajadas.
- Gestión de solicitudes de horas extra.
- Panel de administración para usuarios y revisión de horas extra.
- Roles de usuario para separar vistas de empleado y administrador.

## Tecnologías

- Frontend: React, Vite y React Router.
- Backend: Node.js, Express y MySQL.
- Base de datos: MySQL.

## Estructura

```text
clockextime/
  backend/    API REST con Express
  frontend/   Aplicación web con React
  database/   Script SQL de la base de datos
```

## Requisitos

- Node.js
- npm
- MySQL

## Configuracion

1. Crear la base de datos ejecutando el script:

```bash
database/schema.sql
```

2. Crear los archivos de entorno a partir de los ejemplos:

```bash
backend/.env.example -> backend/.env
frontend/.env.example -> frontend/.env
```

Variables del backend:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your-db-password
DB_NAME=timeclock
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=8h
```

Variable del frontend:

- Desarrollo local

```env
VITE_API_URL=http://localhost:3000
```

- Producción, si frontend y backend se sirven desde el mismo dominio

```env
VITE_API_URL=/api
```

En producción puede usarse VITE_API_URL=/api si el servidor o proxy redirige /api al backend.

## Instalación y ejecución

Instalar dependencias del backend:

```bash
cd backend
npm install
npm run dev
```

Instalar dependencias del frontend:

```bash
cd frontend
npm install
npm run dev
```

La aplicación frontend se ejecuta con Vite y consume la API configurada en `VITE_API_URL`.

## Scripts disponibles

Backend:

```bash
npm run dev
npm start
```

Frontend:

```bash
npm run dev
npm run build
```
