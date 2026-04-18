# Sistema de Reservación de Asientos

Un sistema web interactivo para la reservación de asientos, construido con **Next.js**, **React**, **Tailwind CSS** y componentes de **Radix UI** (shadcn/ui).

## Características

- 🎟️ Selección interactiva de asientos en tiempo real.
- 🎨 Interfaz de usuario moderna y responsiva.
- ♿ Accesibilidad garantizada con componentes de Radix UI.
- ⚡ Rápido rendimiento gracias a Next.js.
- 📱 Soporte completo para dispositivos móviles.

---

## 🛠️ Requisitos Previos

Antes de instalar el proyecto, asegúrate de tener instalados los siguientes programas:

1. **Node.js** (versión 18 o superior): [Descargar Node.js](https://nodejs.org/)
2. **Git**: [Descargar Git](https://git-scm.com/)
3. **pnpm** (Gestor de paquetes recomendado)

### ¿Cómo instalar `pnpm`?

Si no tienes `pnpm` instalado, puedes instalarlo globalmente usando `npm` (que viene incluido con Node.js). Abre tu terminal (Símbolo del sistema, PowerShell o terminal de VS Code) y ejecuta:

```bash
npm install -g pnpm
```

Para verificar que se instaló correctamente, ejecuta:

```bash
pnpm --version
```

---

## 🚀 Instalación Paso a Paso

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

### 1. Clonar el repositorio

Abre tu terminal y clona el repositorio usando Git:

```bash
git clone https://github.com/Orlando0409/reservacion-de-acientos.git
```

### 2. Entrar a la carpeta del proyecto

```bash
cd reservacion-de-acientos
```

### 3. Instalar las dependencias

Usa `pnpm` para instalar todas las dependencias necesarias. Esto descargará las librerías listadas en el archivo `package.json`.

```bash
pnpm install
```

### 4. Ejecutar el servidor de desarrollo

Una vez instaladas las dependencias, inicia el servidor local:

```bash
pnpm next dev
```

### 5. Ver la aplicación

Abre tu navegador web favorito (Chrome, Edge, Firefox, Safari) y ve a la siguiente dirección:

[http://localhost:3000](http://localhost:3000)

¡Listo! Ya deberías ver la aplicación funcionando en tu máquina.

---

## 💻 ¿Cómo funciona el sistema?

El proyecto está diseñado bajo una arquitectura moderna utilizando las últimas características de React y Next.js.

### Arquitectura Principal

- **Next.js (App Router):** Actúa como el framework principal. La lógica de enrutamiento y las vistas se encuentran en la carpeta `app/`. Por ejemplo, `app/page.tsx` es la vista principal que carga al entrar a la aplicación.
- **Componentes Visuales (`components/ui`):** Contiene componentes base reutilizables (Botones, Modales, Formularios, etc.) creados con **Radix UI** y estilizados con **Tailwind CSS**. Esto asegura que los componentes sean accesibles y fáciles de mantener.
- **Lógica de Negocio (`components/theater`):** Aquí se encuentran los componentes específicos del dominio, como el mapa de asientos (`seat-map.tsx`), el escenario (`stage.tsx`), el formulario de reservación (`reservation-form.tsx`) y las leyendas (`legend.tsx`).
- **Gestión de Formularios y Validación:** Se utiliza `react-hook-form` junto con `zod` para manejar el estado de los formularios de reservación y validar que los datos ingresados (como nombre, correo, etc.) sean correctos antes de procesar la reserva.
- **Notificaciones / Toasts:** Cuando un usuario realiza una acción (por ejemplo, seleccionar un asiento o confirmar una reserva), el sistema utiliza componentes de notificaciones (Toasts o Sonner) para dar retroalimentación visual en tiempo real.

### Flujo de Usuario

1. **Visualización:** El usuario visualiza el mapa del teatro/sala. Los asientos están categorizados por colores y estados (disponible, seleccionado, ocupado).
2. **Selección:** El usuario hace clic en los asientos disponibles. El estado local de React se actualiza para reflejar la selección actual.
3. **Formulario:** El usuario llena el formulario de reservación con sus datos personales.
4. **Confirmación:** Al enviar el formulario, el sistema valida la información y completa el proceso, mostrando una notificación de éxito.

---

## 📚 Modificar y Aprender Más

Si deseas realizar cambios:
- La vista principal está en `app/page.tsx`. El sitio se actualizará automáticamente apenas guardes cambios.
- Los estilos globales están en `app/globals.css`.

Para aprender más sobre las herramientas utilizadas:
- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de shadcn/ui](https://ui.shadcn.com/)

<a href="https://v0.app/chat/api/kiro/clone/Orlando0409/reservaci-n-de-acientos" alt="Open in Kiro"><img src="https://pdgvvgmkdvyeydso.public.blob.vercel-storage.com/open%20in%20kiro.svg?sanitize=true" /></a>
