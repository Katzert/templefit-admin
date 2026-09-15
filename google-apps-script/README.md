# 📊 Guía de Sincronización: TempleFit CRM con Google Sheets

Esta solución conecta **TempleFit Admin** directamente con una hoja de cálculo en el **Google Drive de Paulo**, permitiendo:
* Visualizar en tiempo real a los **67+ atletas** con sus números de WhatsApp, cuotas y balances en Bolivianos (Bs.).
* Llevar el libro contable de **Finanzas** e **Inventario** en pestañas separadas.
* Sincronizar en segundo plano sin caducidades ni bloqueos de 30 días.

---

## 🚀 Pasos de Configuración (Única Vez - 3 Minutos)

### Paso 1: Crear la Hoja en Google Drive
1. Entra a tu cuenta de Google y abre [Google Sheets](https://sheets.new).
2. Nómbrala en la esquina superior izquierda: **`TempleFit CRM Maestro`**.

### Paso 2: Pegar el Script de Conexión
1. En el menú superior de la hoja, haz clic en **Extensiones** > **Apps Script**.
2. Se abrirá una pestaña nueva con un editor de código.
3. Borra cualquier código que aparezca y pega **todo el contenido** del archivo [`Code.gs`](./Code.gs).
4. Haz clic en el ícono de **Guardar** (💾 o <kbd>Ctrl</kbd> + <kbd>S</kbd>).

### Paso 3: Publicar la Aplicación Web
1. En la esquina superior derecha, haz clic en el botón azul **Implementar** (*Deploy*) > **Nueva implementación** (*New deployment*).
2. En la columna izquierda, haz clic en el ícono de engranaje (⚙️) y selecciona **Aplicación web** (*Web app*).
3. Rellena los campos tal como se indica:
   * **Descripción:** `TempleFit Sync Webhook`
   * **Ejecutar como (*Execute as*):** `Yo (tu correo de Google)`
   * **Quién tiene acceso (*Who has access*):** `Cualquier persona (*Anyone*)`
4. Haz clic en **Implementar**.
5. Google te pedirá **Revisar permisos** (*Authorize access*). Haz clic en tu cuenta, luego en **Configuración avanzada** (*Advanced*) y selecciona **Ir a TempleFit Sync Webhook (no seguro)** > **Permitir**.
6. Google te mostrará una ventana con la **URL de la aplicación web** (un enlace que empieza por `https://script.google.com/macros/s/.../exec`). **Copia esa URL.**

---

### Paso 4: Pegar la URL en TempleFit Admin
1. Abre tu panel de **TempleFit Admin**.
2. En la barra superior, haz clic en el botón **Google Sheets** (ícono de hoja de cálculo verde).
3. Pega la URL en el campo de texto y haz clic en **Probar & Guardar Enlace**.
4. Haz clic en **Sincronizar Todo Ahora**.

¡Listo! A partir de ese momento, cada cambio que realices en el CRM se guardará automáticamente tanto en tu navegador como en tu hoja de Google Sheets.
