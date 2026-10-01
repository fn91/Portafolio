# Portafolio Personal - Claudio Fanelli Rodríguez

Portafolio web moderno, responsive y accesible desarrollado con React, TypeScript y Tailwind CSS.

## Descripción

Este proyecto es el portafolio personal de **Claudio Fanelli Rodríguez**, desarrollador Front-End en formación. Está enfocado a mostrar proyectos, tecnologías, formación y una vía de contacto clara para procesos de selección junior.

**En vivo:** [https://claudiofanelli.dev](https://claudiofanelli.dev)

## Tecnologías

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 19 | Framework UI |
| TypeScript | 7.x | Type safety |
| Vite | 8.x | Build tool |
| Tailwind CSS | 4 | Estilos |
| Framer Motion | 12 | Animaciones |
| i18next | Latest | Internacionalización (ES/EN) |
| React Hook Form / Zod | — | No incluidos actualmente |
| cmdk | — | No incluido actualmente; la navegación utiliza un componente propio |

## Características

### Loading Screen Animado

El portafolio incluye una pantalla de carga estilo terminal/IDE con las siguientes características:

- **Efecto de escritura de código** - Animación de código siendo escrito línea por línea con syntax highlighting
- **Ventana estilo terminal** - Header con botones de colores (rojo, amarillo, verde) similar a VS Code
- **Barra de progreso con gradiente** - Transición de azul/púrpura a verde al completar
- **Scan lines y grid** - Efecto sutil de pantalla CRT/digital
- **Glitch effect** - Animación de distorsión al terminar la carga antes de revelar el portfolio
- **Esquinas decorativas** - Marcadores de esquina estilo HUD
- **Cursor parpadeante** - Efecto de cursor de terminal durante la escritura

El componente se encuentra en `src/components/LoadingScreen/LoadingScreen.tsx`.

### UI/UX
- Tema claro/oscuro con transición suave
- Diseño minimalista B&W
- Animaciones al hacer scroll con Framer Motion
- Cursor personalizado en desktop
- **Loading screen estilo terminal/IDE** con efecto de escritura de código, syntax highlighting, scan lines, grid background y glitch effect al completar
- Command Palette (⌘K / Ctrl+K)
- Dock de navegación
- Modo Focus (Shift+F)
- Totalmente responsive

### Funcionalidades
- **i18n**: Soporte bilingüe ES/EN con toggle
- **Formulario de contacto**: Validación básica y apertura del cliente de correo mediante `mailto:`
- **Páginas adicionales**: /now, /uses, /404
- **CV descargables**: CV de Front-End/DAM como opción principal y CV de Sistemas/Helpdesk como alternativa en `public/cv/`
- **SEO optimizado**: Meta tags, Open Graph, Twitter Cards
- **PWA**: Manifest para instalación

### Accesibilidad
- Labels asociados a inputs (htmlFor/id)
- aria-labels en botones de iconos
- aria-live para cambios dinámicos
- Navegación por teclado
- Roles ARIA en componentes interactivos

## Estructura del Proyecto

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Navbar/          # Navegación sticky
│   │   ├── Hero/            # Sección principal
│   │   ├── About/           # Sobre mí
│   │   ├── Technologies/    # Habilidades técnicas
│   │   ├── Projects/        # Proyectos destacados
│   │   ├── Experience/      # Formación académica
│   │   ├── Contact/         # Formulario de contacto
│   │   ├── Footer/          # Pie de página
│   │   ├── ScrollToTop/     # Botón volver arriba
│   │   ├── LoadingScreen/   # Pantalla de carga animada estilo terminal
│   │   ├── ui/              # Componentes UI (cursor)
│   │   └── command-palette.tsx
│   ├── pages/
│   │   ├── NotFound.tsx     # Página 404
│   │   ├── Now.tsx          # Qué estoy haciendo ahora
│   │   └── Uses.tsx         # Herramientas que uso
│   ├── context/
│   │   └── ThemeContext.tsx  # Contexto de tema
│   ├── hooks/
│   │   ├── useScroll.ts     # Hooks de scroll
│   │   └── useFocusMode.ts  # Modo Focus
│   ├── data/
│   │   ├── personal.js      # Datos personales
│   │   ├── projects.js      # Proyectos
│   │   ├── technologies.js  # Tecnologías
│   │   ├── experience.js    # Experiencia
│   │   └── content.js       # Servicios, skills, etc.
│   ├── i18n/
│   │   ├── index.ts         # Config i18n
│   │   ├── es.json          # Traducciones ES
│   │   └── en.json          # Traducciones EN
│   ├── animations/
│   │   └── index.ts         # Variantes de animación
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── types/
│   │   └── index.ts         # Definiciones TypeScript
│   ├── App.tsx              # Root con rutas
│   ├── main.tsx             # Entry point
│   └── index.css            # Estilos globales
├── index.html
├── vite.config.js
├── tsconfig.json
└── package.json
```

Las imágenes de los proyectos se encuentran en `public/projects/` y se sirven con rutas absolutas desde la aplicación.

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/fn91/portfolio.git

# Entrar al directorio
cd portfolio

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

El servidor estará disponible en `http://localhost:3000`

## Comandos

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Build de producción |
| `pnpm preview` | Vista previa del build |
| `pnpm lint` | Ejecutar linter |

## Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `⌘K` / `Ctrl+K` | Abrir Command Palette |
| `Shift+F` | Modo Focus |
| `Esc` | Cerrar Command Palette |

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Portafolio principal |
| `/now` | Qué estoy haciendo ahora |
| `/uses` | Herramientas que uso |
| `*` | Página 404 |

## Datos Personales

- **Nombre:** Claudio Fanelli Rodríguez
- **Email:** claudiofanellirodriguez03@gmail.com
- **Teléfono:** +34 663 112 384
- **GitHub:** [github.com/fn91](https://github.com/fn91)
- **LinkedIn:** [linkedin.com/in/claudio-fanelli](https://www.linkedin.com/in/claudio-fanelli)
- **Vercel:** [vercel.com/claudios-projects](https://vercel.com/claudios-projects-f9f35c91)

## Licencia

© 2025 Claudio Fanelli Rodríguez. Todos los derechos reservados.
