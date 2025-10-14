# � AnimeInfo - Tu Guía Definitiva de Anime

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-success?style=for-the-badge&logo=pwa)](https://subkhht.github.io/AnimeInfo)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.11-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.16-38B2AC?style=for-the-badge&logo=tailwind-css)

> Una aplicación web profesional y moderna para descubrir, explorar y organizar tus animes favoritos. Con PWA, notificaciones, caché inteligente y mucho más.

🌐 **[Ver Demo en Vivo](https://subkhht.github.io/AnimeInfo)** | 📱 **Instalable como App**

---

## ✨ Características Principales

### 🔍 **Búsqueda y Exploración**
- 🎯 **Búsqueda avanzada** de animes y personajes
- 🔝 **2000 animes** con carga progresiva (250 iniciales → 2000 totales)
- 🎭 **Filtros dinámicos** por género, puntuación, estado
- 📊 **Ordenamiento** por score, popularidad, título, episodios
- 🌐 **Traducción automática** al español (sinopsis, géneros)

### 📱 **PWA (Progressive Web App)** ⭐ NUEVO
- 📲 **Instalable** como aplicación nativa
- 🔌 **Funciona offline** con Service Worker
- 🎨 **Splash screen** personalizado
- ⚡ **Acceso rápido** desde home screen
- 🚀 **Shortcuts**: Buscar y Favoritos

### 🔔 **Sistema de Notificaciones** ⭐ NUEVO
- ✅ **Notificaciones toast** profesionales
- ❤️ Feedback al agregar/quitar favoritos
- 📤 Confirmación de exportar/importar datos
- 🎨 **Estilos personalizados** con gradientes anime

### ❤️ **Sistema de Favoritos**
- 💾 **Guardar animes** favoritos
- 🔴 **Filtro de emisión** (separa animes en emisión)
- 📋 **Vista grid/lista** personalizable
- 📤 **Exportar/importar** datos (JSON)

### � **Notas Personalizadas**
- ✍️ **Añadir notas** a cualquier anime
- 🎨 **Editor rico** con formato
- 💾 **Guardado automático** en localStorage
- 🗑️ **Gestión completa** (crear, editar, eliminar)

### 📊 **Estadísticas y Análisis**
- 📈 **Dashboard completo** con métricas
- 🎭 **Géneros favoritos** con gráficos
- ⭐ **Rating promedio** de favoritos
- 📺 **Total de episodios** acumulados

### 🎬 **Detalles Completos**
- 🖼️ **Imágenes HD** y trailers integrados
- 👥 **Personajes principales** (hasta 12)
- 🏢 **Estudios de animación**
- 🌟 **Ranking y popularidad** en MyAnimeList
- 📅 **Fechas de emisión** y estado

### 💀 **Loading Skeletons** ⭐ NUEVO
- ⚡ **Percepción de carga** más rápida
- 🎨 **Diseño que imita** las tarjetas reales
- ✨ **Animación suave** de pulse

### 🛡️ **Error Boundary** ⭐ NUEVO
- 🔒 **Captura todos los errores** de React
- 🎨 **Pantalla de error** profesional
- 🔄 **Recuperación fácil** con botones de acción
- 🐛 **Debug info** en modo desarrollo

### 🎨 **Diseño y UX**
- 🌈 **Tema oscuro/claro** con transiciones suaves
- 🎭 **Estética anime** con gradientes neón
- ⭐ **Fondo animado** con estrellas flotantes
- 📱 **Responsive** en todos los dispositivos
- 🎯 **Animaciones CSS** mejoradas y profesionales

### ⚡ **Rendimiento**
- 💾 **Caché inteligente** (24 horas)
- 🔄 **Carga progresiva** para miles de animes
- 🚀 **Optimización de imágenes** con lazy loading
- 💬 **Caché de traducciones** en memoria
- ⚛️ **React.memo** para evitar re-renders

---

## 🚀 Tecnologías
- ✅ Sinopsis de animes de inglés a español
- ✅ Biografías de personajes de inglés a español
- ✅ Géneros de anime con traducciones localizadas
- ✅ Estados de emisión y clasificaciones traducidas

**API de Traducción**: Utiliza MyMemory Translation API (gratuita con límites)

## 🚀 Tecnologías Utilizadas

- **React 18**: Biblioteca de UI moderna y eficiente
- **TypeScript**: Tipado estático para código más robusto
- **Vite**: Build tool ultra-rápido
- **TailwindCSS**: Framework de CSS utility-first
- **Jikan API v4**: API gratuita de MyAnimeList con datos completos

## 📦 Instalación

1. Clona este repositorio:
```bash
git clone <url-del-repositorio>
cd AnimeInfo
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## 🛠️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Genera la versión de producción
- `npm run preview` - Previsualiza la versión de producción

## 🎯 Uso

### Buscar Animes
1. Haz clic en "🎬 Buscar Anime"
2. Escribe el nombre del anime (ej: "Naruto", "One Piece", "Death Note")
3. Presiona buscar o Enter
4. Haz clic en cualquier tarjeta para ver detalles completos

### Buscar Personajes
1. Haz clic en "👤 Buscar Personaje"
2. Escribe el nombre del personaje (ej: "Naruto Uzumaki", "Monkey D. Luffy")
3. Presiona buscar o Enter
4. Haz clic en cualquier tarjeta para ver la biografía completa

### Explorar Top Animes
1. Haz clic en "⭐ Top Animes"
2. Explora los animes más populares de MyAnimeList
3. Haz clic en cualquier anime para ver sus detalles

## 📊 Información Disponible

### Para Animes:
- ⭐ Puntuación (0-10)
- 🏆 Ranking global
- 📺 Número de episodios
- 📊 Estado (Finalizado, En emisión, etc.)
- 📅 Fechas de emisión
- 🎭 Géneros
- 🎬 Estudios de producción
- 📖 Sinopsis completa
- 👥 Personajes principales con roles
- 📈 Popularidad y miembros
- 🔞 Clasificación de edad

### Para Personajes:
- ❤️ Número de favoritos
- 📝 Apodos
- 📖 Biografía detallada
- 🎌 Nombre en japonés (kanji)
- 🖼️ Imágenes de alta calidad

## 🎨 Paleta de Colores

La aplicación utiliza una paleta temática de anime:

- **Primary**: `#FF6B9D` - Rosa vibrante
- **Secondary**: `#C06C84` - Rosa oscuro
- **Dark**: `#1A0B2E` - Púrpura oscuro
- **Darker**: `#16003B` - Púrpura muy oscuro
- **Light**: `#FFC2E2` - Rosa claro
- **Accent**: `#00FFF5` - Cian brillante

## 🌐 API

Esta aplicación utiliza la [Jikan API v4](https://jikan.moe/) (MyAnimeList API no oficial).

### Endpoints utilizados:
- `GET /anime?q={query}` - Buscar animes
- `GET /anime/{id}/full` - Obtener detalles completos de un anime
- `GET /anime/{id}/characters` - Obtener personajes de un anime
- `GET /characters?q={query}` - Buscar personajes
- `GET /characters/{id}/full` - Obtener detalles completos de un personaje
- `GET /top/anime` - Obtener top animes

### Rate Limiting:
- **Límite**: 60 requests por minuto
- **Límite diario**: 100,000 requests
- La API es completamente gratuita y no requiere autenticación

## 📁 Estructura del Proyecto

```
AnimeInfo/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── AnimeCard.tsx
│   │   ├── CharacterCard.tsx
│   │   ├── AnimeDetails.tsx
│   │   ├── CharacterDetails.tsx
│   │   ├── SearchBar.tsx
│   │   └── LoadingSpinner.tsx
│   ├── services/           # Servicios de API
│   │   └── api.ts
│   ├── types/             # Tipos de TypeScript
│   │   └── index.ts
│   ├── App.tsx            # Componente principal
│   ├── main.tsx           # Punto de entrada
│   └── index.css          # Estilos globales
├── public/                # Archivos estáticos
├── index.html             # HTML principal
├── package.json           # Dependencias
├── tsconfig.json          # Configuración TypeScript
├── vite.config.ts         # Configuración Vite
├── tailwind.config.js     # Configuración TailwindCSS
└── README.md             # Este archivo
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas! Si tienes ideas para mejorar la aplicación:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.

## 💖 Agradecimientos

- [Jikan API](https://jikan.moe/) por proporcionar la API gratuita de MyAnimeList
- [MyAnimeList](https://myanimelist.net/) por mantener la base de datos más completa de anime
- La comunidad de anime por su pasión y apoyo
- Todos los desarrolladores que contribuyen a las herramientas open-source utilizadas

## 📧 Contacto

Si tienes preguntas o sugerencias, no dudes en abrir un issue en GitHub.

---

Hecho con ❤️ por un fan del anime
