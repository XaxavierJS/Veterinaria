# 📋 Documentación del Proyecto Veterinaria MVP

## 📌 Descripción General

Sistema de gestión para clínicas veterinarias desarrollado con **Next.js 15**, **React 19**, **Material-UI 6** y **TypeScript**. Permite administrar citas, tutores y mascotas de manera eficiente.

## 🏗️ Arquitectura del Proyecto

```
VeterinariaMVP/
├── src/
│   ├── app/                    # Rutas de Next.js (App Router)
│   │   ├── layout.tsx          # Layout principal con Sidebar y Header
│   │   ├── page.tsx            # Dashboard principal
│   │   ├── loading.tsx         # Componente de carga
│   │   ├── globals.css         # Estilos globales
│   │   └── citas/
│   │       └── page.tsx        # Página de gestión de citas
│   │
│   ├── components/             # Componentes reutilizables
│   │   ├── Header.tsx          # Barra superior de navegación
│   │   ├── Profile.tsx         # Componente de perfil de usuario
│   │   ├── citas/              # Componentes del módulo de citas
│   │   │   ├── Citas.tsx       # Tabla principal de citas
│   │   │   ├── AgregarCitaModal.tsx
│   │   │   ├── EditarCitaModal.tsx
│   │   │   ├── VerCitaModal.tsx
│   │   │   ├── CancelarCitaModal.tsx
│   │   │   └── CitaActions.tsx
│   │   ├── dashboard/          # Componentes del dashboard
│   │   │   ├── CitasResumen.tsx
│   │   │   ├── GananciasAnuales.tsx
│   │   │   ├── GananciasMensuales.tsx
│   │   │   ├── ProximasCitas.tsx
│   │   │   └── TutoresFrecuentes.tsx
│   │   ├── shared/             # Componentes compartidos
│   │   │   └── DashboardCard.tsx
│   │   └── sidebar/            # Componentes del menú lateral
│   │       ├── Sidebar.tsx
│   │       ├── SidebarItems.tsx
│   │       ├── MenuItems.tsx
│   │       ├── NavItems.tsx
│   │       └── NavGroup.tsx
│   │
│   ├── data/                   # Datos estáticos/mock
│   │   ├── citas.json          # Datos de citas
│   │   └── baseDeDatos.json    # Base de datos general
│   │
│   ├── types/                  # Definiciones de tipos TypeScript
│   │   └── index.ts            # Tipos e interfaces centralizados
│   │
│   └── utils/                  # Utilidades y configuración
│       ├── DefaultColors.tsx   # Tema de Material-UI
│       ├── theme.ts            # Configuración del tema
│       ├── validationSchema.ts # Esquemas de validación Yup
│       └── createEmotionCache.ts
│
├── public/                     # Archivos estáticos
├── package.json
├── tsconfig.json
└── next.config.ts
```

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Next.js | 15.1.4 | Framework React con SSR |
| React | 19.0.0 | Biblioteca UI |
| Material-UI | 6.4.0 | Sistema de diseño |
| TypeScript | 5.x | Tipado estático |
| Formik | 2.4.6 | Gestión de formularios |
| Yup | 1.6.1 | Validación de esquemas |
| ApexCharts | 4.3.0 | Gráficos y visualización |
| Lodash | 4.17.21 | Utilidades JavaScript |

## 📦 Módulos Principales

### 1. Dashboard (`/`)
Vista principal con resúmenes estadísticos:
- **CitasResumen**: Gráfico de barras con citas realizadas vs canceladas
- **GananciasAnuales**: Donut chart con comparativa anual
- **GananciasMensuales**: Gráfico de área con tendencia mensual
- **ProximasCitas**: Timeline de citas del día
- **TutoresFrecuentes**: Tabla de tutores con más visitas

### 2. Gestión de Citas (`/citas`)
CRUD completo de citas veterinarias:
- Tabla con paginación y ordenamiento
- Búsqueda por tutor, mascota o motivo
- Filtrado por estado (Aceptado, Pendiente, Pagado, Cancelado)
- Modales para crear, ver, editar y cancelar citas

## 📝 Modelos de Datos

### Cita
```typescript
interface Cita {
  id_cita: number;
  tutor: {
    id_tutor: string;
    nombre: string;
    rut?: string;
  };
  mascota: {
    id_mascota: string;
    nombre: string;
    numero_ficha?: string;
  };
  motivo: string;
  estado: 'Aceptado' | 'Pendiente' | 'Pagado' | 'Cancelado';
  fecha: string;      // Formato "dd/mm/aaaa"
  hora?: string;      // Formato "hh:mm"
  precio: number;     // En CLP
}
```

## ✅ Validaciones

El sistema utiliza **Yup** para validaciones:

| Campo | Reglas |
|-------|--------|
| Nombre Tutor | 1-200 caracteres, obligatorio |
| RUT Tutor | Formato "12.345.678-9", obligatorio |
| Nombre Mascota | 1-200 caracteres, obligatorio |
| Ficha Mascota | Formato "#XXXXXX" (7 caracteres), obligatorio |
| Motivo | 1-500 caracteres, obligatorio |
| Fecha | Formato "dd/mm/aaaa", obligatorio |
| Hora | Formato "hh:mm", obligatorio |
| Precio | Número positivo, obligatorio |

## 🎨 Sistema de Diseño

El tema se define en `src/utils/DefaultColors.tsx`:

### Paleta de Colores
- **Primary**: `#5D87FF` (Azul principal)
- **Secondary**: `#49BEFF` (Azul secundario)
- **Success**: `#13DEB9` (Verde éxito)
- **Error**: `#FA896B` (Rojo error)
- **Warning**: `#FFAE1F` (Amarillo advertencia)

### Tipografía
- Fuente principal: **Plus Jakarta Sans**
- Fallbacks: Helvetica, Arial, sans-serif

## 🚀 Scripts Disponibles

```bash
# Desarrollo (puerto 4000 con Turbopack)
npm run dev

# Construcción para producción
npm run build

# Iniciar servidor de producción
npm run start

# Ejecutar linter
npm run lint
```

## 🔧 Configuración

### Puerto de Desarrollo
El servidor de desarrollo corre en el **puerto 4000** (configurado en `package.json`).

### Variables de Entorno
Actualmente no se utilizan variables de entorno. Para integrar con una API real:

```env
NEXT_PUBLIC_API_URL=https://api.veterinaria.com
```

## 📊 Flujos de Usuario

### Crear Nueva Cita
1. Usuario navega a `/citas`
2. Click en "Agregar Cita"
3. Completa el formulario con datos del tutor, mascota y cita
4. Sistema valida los campos
5. Click en "Guardar" para crear la cita con estado "Aceptado"

### Cancelar Cita
1. En la tabla de citas, click en el ícono de cancelar
2. Confirmar en el modal de cancelación
3. Estado de la cita cambia a "Cancelado"

## 🐛 Problemas Conocidos y Soluciones

1. **Formik no actualiza valores iniciales**: Se agregó `enableReinitialize={true}` en EditarCitaModal
2. **Validación de fecha incompatible**: El input type="date" usa formato ISO, pero la validación espera "dd/mm/aaaa"
3. **Prop no utilizada en CitaActions**: Se eliminó `id_cita` de la interfaz

## 🔮 Mejoras Futuras

- [ ] Integración con API backend real
- [ ] Autenticación y autorización
- [ ] Módulo de tutores completo (`/tutores`)
- [ ] Módulo de mascotas completo (`/mascotas`)
- [ ] Notificaciones por email/SMS
- [ ] Calendario interactivo
- [ ] Reportes exportables (PDF/Excel)
- [ ] Modo oscuro
- [ ] PWA con soporte offline

## 👥 Contribuir

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto es privado y de uso exclusivo.

---

*Documentación generada el 31 de enero de 2026*
