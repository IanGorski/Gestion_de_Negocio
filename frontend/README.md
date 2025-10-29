# Sistema de Gestión de Negocios Locales - Frontend

Sistema completo de gestión para negocios locales desarrollado con React.js, Vite y Tailwind CSS.

## 🚀 Características

- **Dashboard**: Panel de control con estadísticas y gráficos en tiempo real
- **Gestión de Pagos**: Registro y seguimiento de transacciones
- **Inventario**: Control completo de productos y stock
- **Reportes**: Análisis y exportación de datos
- **Configuración**: Personalización del negocio y usuarios

## 📋 Tecnologías

- **React.js 19+**: Framework de interfaz de usuario
- **Vite**: Build tool moderna y rápida
- **Tailwind CSS**: Framework de estilos utility-first
- **React Router**: Navegación entre páginas
- **Material-UI**: Componentes de interfaz
- **Recharts**: Visualización de datos
- **Axios**: Cliente HTTP
- **React Hook Form + Yup**: Manejo y validación de formularios
- **date-fns**: Manipulación de fechas
- **React Icons**: Biblioteca de iconos

## 🛠️ Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

## 📁 Estructura del Proyecto

```
frontend/
├── public/              # Archivos estáticos
├── src/
│   ├── assets/         # Imágenes e iconos
│   ├── components/     # Componentes React
│   │   ├── common/     # Componentes reutilizables
│   │   ├── dashboard/  # Componentes del dashboard
│   │   ├── payments/   # Componentes de pagos
│   │   ├── inventory/  # Componentes de inventario
│   │   ├── reports/    # Componentes de reportes
│   │   └── settings/   # Componentes de configuración
│   ├── pages/          # Páginas de la aplicación
│   ├── context/        # Contextos de React
│   ├── hooks/          # Custom hooks
│   ├── services/       # Servicios y API
│   ├── utils/          # Utilidades y helpers
│   ├── styles/         # Estilos globales
│   ├── App.jsx         # Componente principal
│   ├── main.jsx        # Punto de entrada
│   └── routes.jsx      # Configuración de rutas
├── .env.example        # Ejemplo de variables de entorno
├── package.json        # Dependencias del proyecto
├── tailwind.config.js  # Configuración de Tailwind
└── vite.config.js      # Configuración de Vite
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción
npm run build        # Construye la aplicación para producción
npm run preview      # Previsualiza la build de producción

# Linting
npm run lint         # Ejecuta ESLint
```

## 🌐 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Sistema de Gestión
```

## 🎨 Estilos

El proyecto utiliza Tailwind CSS con una paleta de colores personalizada:

- **Primary**: Azul (#3B82F6)
- **Secondary**: Verde (#10B981)
- **Accent**: Naranja (#F59E0B)
- **Danger**: Rojo (#EF4444)

## 🔐 Autenticación

El sistema incluye autenticación basada en tokens JWT:

1. Login en `/login`
2. Token almacenado en localStorage
3. Rutas protegidas con PrivateRoute
4. Renovación automática de token

## 📦 Componentes Principales

### Common Components
- Button: Botones personalizables
- Input: Campos de entrada
- Modal: Ventanas modales
- Card: Tarjetas de información
- Table: Tablas con paginación
- Loader: Indicadores de carga
- Navbar: Barra de navegación

### Pages
- Dashboard: Panel principal
- Login: Autenticación
- Payments: Gestión de pagos
- Inventory: Gestión de inventario
- Reports: Reportes y análisis
- Settings: Configuración del sistema

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
