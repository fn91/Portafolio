# Portafolio Personal - Claudio Fanelli Rodríguez

Portafolio web moderno, responsive y accesible desarrollado con React, TypeScript y Tailwind CSS.

## Descripción

Este proyecto es el portafolio personal de **Claudio Fanelli Rodríguez**, desarrollador Front-End en formación. Está enfocado a mostrar proyectos, tecnologías, formación y una vía de contacto clara para procesos de selección junior.

**En vivo:** [Portafolio en Netlify](https://portafolio220.netlify.app)

## Tecnologías

| Tecnología | Versión | Uso |
|------------|---------|-----|
| React | 19 | Framework UI |
| TypeScript | 7.x | Type safety |
| Vite | 8.x | Build tool |
| Tailwind CSS | 4 | Estilos |
| Framer Motion | 12 | Animaciones |
| i18next | 26 | Traducciones en español |
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
- Paleta de comandos (⌘K / Ctrl+K) para buscar secciones disponibles y acceder a acciones rápidas

### Diseño adaptable

- En móviles, la portada ajusta el título y el retrato al ancho disponible. El menú lateral se puede desplazar en pantallas bajas y los controles principales tienen más espacio para pulsarlos.
- Las tarjetas de proyectos pasan de una columna en móvil a dos en tablet y tres en escritorio cuando hay espacio. Los enlaces de cada tarjeta quedan visibles en pantallas táctiles.
- El chat se adapta a la altura disponible, incluida la orientación horizontal. La portada y las secciones mantienen la tipografía, la paleta y las animaciones originales.
- La distribución se comprobó en Chrome a 320, 375, 390, 768, 1024 y 1440 px, sin desplazamiento horizontal en esos tamaños.

### Funcionalidades
- **i18n** en español mediante i18next
- **Filtros de proyectos** generados a partir de las categorías que tienen proyectos
- **Asistente de portfolio** con preguntas rápidas y respuestas sobre proyectos, tecnologías y contacto
- **Enlaces de proyectos** a repositorios y demos públicas cuando están disponibles. DecisionLab enlaza al repositorio, ya que su demo requiere iniciar sesión en Vercel.
- **Formulario de contacto**: Validación básica y apertura del cliente de correo mediante `mailto:`
- **Páginas adicionales**: `/now`, `/uses` y una página 404 para rutas desconocidas
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
│   │   ├── Navbar/          # Navegación fija y menú móvil
│   │   ├── Hero/            # Sección principal
│   │   ├── About/           # Sobre mí
│   │   ├── Technologies/    # Habilidades técnicas
│   │   ├── Projects/        # Proyectos destacados
│   │   ├── Experience/      # Formación académica
│   │   ├── Contact/         # Formulario de contacto
│   │   ├── Footer/          # Pie de página
│   │   ├── ScrollToTop/     # Botón volver arriba
│   │   ├── LoadingScreen/   # Pantalla de carga animada estilo terminal
│   │   ├── Chatbot.tsx      # Asistente del portafolio
│   │   ├── ui/              # Componentes UI (cursor)
│   │   └── command-palette.tsx
│   ├── pages/
│   │   ├── NotFound.tsx     # Página 404
│   │   ├── Now.tsx          # Qué estoy haciendo ahora
│   │   └── Uses.tsx         # Herramientas que uso
│   ├── context/
│   │   └── ThemeContext.jsx  # Contexto de tema
│   ├── hooks/
│   │   └── useScroll.js     # Hooks de scroll
│   ├── data/
│   │   ├── personal.js      # Datos personales
│   │   ├── projects.js      # Proyectos
│   │   ├── technologies.js  # Tecnologías
│   │   ├── experience.js    # Experiencia
│   │   └── content.js       # Servicios, skills, etc.
│   ├── i18n/
│   │   ├── index.ts         # Config i18n
│   │   └── es.json          # Traducciones ES
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
git clone https://github.com/fn91/Portafolio.git

# Entrar al directorio
cd Portafolio

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
| `pnpm exec tsc --noEmit` | Comprobar los tipos de TypeScript |

## Atajos de Teclado

| Atajo | Acción |
|-------|--------|
| `⌘K` / `Ctrl+K` | Abrir Command Palette |
| `↑` / `↓` y `Enter` | Seleccionar y ejecutar una opción de la paleta |
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
