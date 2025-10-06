# 🚀 Guía de Publicación en GitHub Pages

## ✅ Cambios Realizados

He configurado tu proyecto para ser desplegado automáticamente en GitHub Pages. Aquí están los cambios:

### 1. **package.json** ✅
- Agregado `homepage`: URL de GitHub Pages
- Agregado scripts `predeploy` y `deploy`
- Instalado `gh-pages` como dependencia de desarrollo

### 2. **vite.config.ts** ✅
- Agregado `base: '/AnimeInfo/'` para rutas correctas

### 3. **.github/workflows/deploy.yml** ✅
- Workflow de GitHub Actions para deployment automático
- Se ejecuta en cada push a `main`
- También se puede ejecutar manualmente

---

## 📋 Pasos para Publicar

### Opción 1: Deployment Automático con GitHub Actions (RECOMENDADO)

1. **Hacer commit de los cambios:**
```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

2. **Habilitar GitHub Pages:**
   - Ve a tu repositorio en GitHub
   - Click en **Settings** (Configuración)
   - En el menú lateral, click en **Pages**
   - En **Source**, selecciona:
     - **Deploy from a branch**
     - Branch: **gh-pages**
     - Folder: **/ (root)**
   - Click en **Save**

3. **Esperar el deployment:**
   - Ve a la pestaña **Actions** en GitHub
   - Verás el workflow "Deploy to GitHub Pages" ejecutándose
   - Espera a que termine (círculo verde ✅)

4. **¡Listo!** Tu sitio estará en:
   ```
   https://subkhht.github.io/AnimeInfo
   ```

### Opción 2: Deployment Manual

Si prefieres hacerlo manualmente:

```bash
# 1. Compilar el proyecto
npm run build

# 2. Desplegar a GitHub Pages
npm run deploy
```

---

## 🔧 Configuración de GitHub Pages

### Primera vez:

1. **Ve a Settings → Pages**
2. **Source**: Deploy from a branch
3. **Branch**: gh-pages
4. **Folder**: / (root)
5. **Save**

### Verificar:

Después del primer deployment, verás un mensaje:
```
Your site is live at https://subkhht.github.io/AnimeInfo
```

---

## 🎯 URL de Producción

Tu aplicación estará disponible en:
```
https://subkhht.github.io/AnimeInfo
```

---

## 📊 Flujo de Trabajo

### Deployment Automático
```
1. Haces cambios en el código
2. git add . && git commit -m "mensaje"
3. git push origin main
4. GitHub Actions detecta el push
5. Ejecuta npm ci
6. Ejecuta npm run build
7. Despliega automáticamente a gh-pages
8. Tu sitio se actualiza en ~2-3 minutos
```

---

## 🔍 Verificar el Deployment

### En GitHub:
- Pestaña **Actions**: Ver progreso del workflow
- Pestaña **Settings → Pages**: Ver URL y estado

### Logs del Workflow:
1. Ve a **Actions**
2. Click en el último workflow
3. Click en **build** o **deploy** para ver logs

---

## ⚠️ Troubleshooting

### Error 404:
- Verifica que `base: '/AnimeInfo/'` esté en `vite.config.ts`
- Verifica que el branch `gh-pages` exista
- Verifica la configuración en Settings → Pages

### Workflow falla:
- Revisa los logs en Actions
- Verifica que `package.json` tenga las dependencias correctas
- Asegúrate que `npm run build` funcione localmente

### Caché de navegador:
- Haz Ctrl+F5 para refrescar sin caché
- O abre en modo incógnito

---

## 🎨 Siguientes Pasos

Después del primer deployment:

1. ✅ Compartir la URL: `https://subkhht.github.io/AnimeInfo`
2. ✅ Agregar el link a tu README
3. ✅ Configurar dominio personalizado (opcional)
4. ✅ Monitorear Analytics (opcional)

---

## 📝 Comandos Útiles

```bash
# Ver preview local del build
npm run build
npm run preview

# Desplegar manualmente
npm run deploy

# Forzar rebuild
git commit --allow-empty -m "Trigger rebuild"
git push origin main
```

---

## 🎉 ¡Todo Listo!

Tu aplicación AnimeInfo está configurada para:
- ✅ Deployment automático en cada push
- ✅ Build optimizado con Vite
- ✅ Rutas correctas para GitHub Pages
- ✅ Workflow de CI/CD configurado

Solo necesitas hacer push a GitHub y esperar ~2-3 minutos. 🚀
