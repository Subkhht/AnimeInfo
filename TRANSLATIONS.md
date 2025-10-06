# 🌐 Sistema de Traducción - AnimeInfo

Este documento describe el sistema de traducción implementado en la aplicación AnimeInfo.

## 📋 Características Implementadas

### 1. Traducción de Sinopsis de Animes
- **Ubicación**: `src/components/AnimeDetails.tsx`
- **Funcionamiento**: Cuando se abre el detalle de un anime, la sinopsis en inglés se traduce automáticamente al español
- **API Utilizada**: MyMemory Translation API
- **Estado de Carga**: Muestra un spinner mientras se traduce

### 2. Traducción de Biografías de Personajes
- **Ubicación**: `src/components/CharacterDetails.tsx`
- **Funcionamiento**: Al abrir los detalles de un personaje, la biografía se traduce automáticamente al español
- **API Utilizada**: MyMemory Translation API
- **Estado de Carga**: Muestra un spinner mientras se traduce

### 3. Traducción de Géneros
- **Ubicación**: `src/utils/translations.ts`
- **Funcionamiento**: Diccionario local con más de 70 géneros traducidos
- **Ejemplos**:
  - Action → Acción
  - Romance → Romance
  - Slice of Life → Vida Cotidiana
  - Fantasy → Fantasía
  - Sci-Fi → Ciencia Ficción

### 4. Traducción de Estados de Emisión
- **Ubicación**: `src/components/AnimeDetails.tsx`
- **Traducciones**:
  - `Finished Airing` → "Finalizado"
  - `Currently Airing` → "En emisión"
  - `Not yet aired` → "Próximamente"

### 5. Traducción de Clasificaciones
- **Ubicación**: `src/components/AnimeDetails.tsx`
- **Ejemplos**:
  - `G - All Ages` → "Para todas las edades"
  - `PG-13 - Teens 13 or older` → "Adolescentes +13"
  - `R - 17+ (violence & profanity)` → "+17 (violencia y lenguaje)"

## 🛠️ Archivos Modificados

### Nuevos Archivos
1. **`src/utils/translations.ts`**
   - Diccionario de géneros traducidos
   - Función `translateGenre()`: Traduce géneros desde el diccionario
   - Función `translateText()`: Traduce texto usando MyMemory API

### Archivos Modificados
1. **`src/components/AnimeDetails.tsx`**
   - Agregado estado para sinopsis traducida
   - Implementado useEffect para traducción automática
   - Actualizado renderizado de géneros con traducciones
   - Traducción de estados y clasificaciones

2. **`src/components/CharacterDetails.tsx`**
   - Agregado estado para biografía traducida
   - Implementado useEffect para traducción automática
   - Spinner de carga durante traducción

3. **`README.md`**
   - Documentación de características de traducción
   - Sección nueva sobre el sistema de traducción

## 🔄 Flujo de Traducción

```
Usuario abre detalle de anime/personaje
           ↓
  Se carga el componente
           ↓
    useEffect se ejecuta
           ↓
 Se muestra spinner "Traduciendo..."
           ↓
  Llamada a MyMemory API
           ↓
  Traducción completada
           ↓
Se muestra texto en español
```

## 🌍 API de Traducción

**Nombre**: MyMemory Translation API
**URL**: https://mymemory.translated.net/
**Características**:
- ✅ Gratuita con límites razonables
- ✅ No requiere API key
- ✅ Soporta múltiples idiomas
- ⚠️ Límite de 1000 palabras por día (versión gratuita)
- ⚠️ Límite de 10,000 caracteres por solicitud

## 📊 Géneros Traducidos (Muestra)

| Inglés | Español |
|--------|---------|
| Action | Acción |
| Adventure | Aventura |
| Comedy | Comedia |
| Drama | Drama |
| Fantasy | Fantasía |
| Horror | Terror |
| Mystery | Misterio |
| Romance | Romance |
| Sci-Fi | Ciencia Ficción |
| Slice of Life | Vida Cotidiana |
| Sports | Deportes |
| Supernatural | Sobrenatural |
| Psychological | Psicológico |
| Mecha | Mecha |
| Magic | Magia |
| School | Escolar |
| Martial Arts | Artes Marciales |
| Super Power | Super Poderes |
| Samurai | Samurái |
| Award Winning | Ganador de Premios |
| Gourmet | Gourmet |
| Detective | Detective |
| Time Travel | Viajes en el Tiempo |
| Video Game | Videojuego |
| Mythology | Mitología |

... y más de 40 géneros adicionales!

## 🚀 Mejoras Futuras Posibles

1. **Caché de Traducciones**
   - Almacenar traducciones en localStorage
   - Evitar traducciones duplicadas

2. **Fallback**
   - Si la API falla, mostrar texto original
   - Mensaje de error más descriptivo

3. **Otras APIs de Traducción**
   - Google Cloud Translation API (de pago, mejor calidad)
   - DeepL API (mejor para textos largos)
   - LibreTranslate (auto-hospedado, privacidad)

4. **Selector de Idioma**
   - Permitir al usuario elegir el idioma
   - Soportar inglés, español, japonés, etc.

5. **Traducción Offline**
   - Modelos de ML en el navegador
   - TensorFlow.js para traducción local

## 🎯 Notas de Implementación

- Las traducciones son asíncronas y no bloquean la UI
- Se usa React hooks (useState, useEffect) para manejo de estado
- Los errores se capturan y registran en consola
- Si la traducción falla, se muestra el texto original
- El diccionario de géneros es local y no requiere conexión

## 💡 Uso

Las traducciones funcionan automáticamente sin configuración adicional. Simplemente:

1. Busca un anime o personaje
2. Abre los detalles
3. La traducción se aplica automáticamente
4. ¡Disfruta del contenido en español!

---

**Desarrollado con ❤️ para la comunidad anime hispanohablante**
