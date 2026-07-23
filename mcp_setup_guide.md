# 🔌 Guía de Configuración e Instalación de Servidores MCP para TempleFit

Para que **Antigravity IDE** ejecute las herramientas externas de automatización (Base de datos Supabase, mensajes de WhatsApp por Twilio, cobros de Stripe, y búsquedas con Tavily), se deben declarar los **Servidores MCP** en la configuración de la IDE con sus respectivas credenciales y API Keys.

---

## 🛠️ Archivo de Configuración MCP (`mcp_config.json`)

Copia este bloque de configuración en el menú de **Settings > MCP Servers** en Antigravity IDE o en tu archivo de configuración MCP global:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server"],
      "env": {
        "SUPABASE_URL": "https://TU_PROYECTO.supabase.co",
        "SUPABASE_SERVICE_ROLE_KEY": "TU_SUPABASE_SERVICE_ROLE_KEY"
      }
    },
    "tavily-search": {
      "command": "npx",
      "args": ["-y", "tavily-mcp"],
      "env": {
        "TAVILY_API_KEY": "tvly-TU_API_KEY_DE_TAVILY"
      }
    },
    "twilio-whatsapp": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-twilio"],
      "env": {
        "TWILIO_ACCOUNT_SID": "AC_TU_ACCOUNT_SID",
        "TWILIO_AUTH_TOKEN": "TU_AUTH_TOKEN"
      }
    },
    "stripe": {
      "command": "npx",
      "args": ["-y", "@stripe/mcp-server"],
      "env": {
        "STRIPE_SECRET_KEY": "sk_test_TU_STRIPE_SECRET_KEY"
      }
    }
  }
}
```

---

## 🔑 Credenciales Requeridas (Paso a Paso)

### 1. 🗄️ Supabase (Base de Datos Real en la Nube)
* **¿Para qué sirve?** Almacenar fichas de alumnos y pagos de forma permanente.
* **Obtener API Key:**
  1. Crea una cuenta gratuita en [supabase.com](https://supabase.com).
  2. Crea un proyecto llamado `templefit-db`.
  3. Ve a `Project Settings > API` y copia la **Project URL** y la **service_role key**.

### 2. 🔍 Tavily Search (Investigador IA)
* **¿Para qué sirve?** Buscar estudios nutricionales, datos de salud y versículos bíblicos para alimentar el *TempleWiki*.
* **Obtener API Key:**
  1. Registrate gratis en [tavily.com](https://tavily.com).
  2. Copia tu `API Key` gratuita de bienvenida.

### 3. 💬 Twilio (WhatsApp Automático)
* **¿Para qué sirve?** Enviar mensajes de vencimiento y seguimiento del Reto 21 Días.
* **Obtener API Key:**
  1. Registrate en [twilio.com](https://www.twilio.com).
  2. Activa el Sandbox de WhatsApp o tu número verificado.
  3. Copia el `Account SID` y el `Auth Token` desde la consola de Twilio.

### 4. 💳 Stripe (Pagos y Membresías)
* **¿Para qué sirve?** Registrar ventas automáticas del Reto 21 Días y cuotas de gimnasio.
* **Obtener API Key:**
  1. Registrate en [stripe.com](https://stripe.com).
  2. En la consola de desarrolladores, genera una **Secret Key** (`sk_test_...`).

---

## 🚀 ¿Cómo activarlos en Antigravity IDE?

1. Una vez agregues tus claves al archivo `mcp_config.json`, Antigravity IDE reconocerá los nuevos servidores MCP.
2. Podrás pedirme directamente comandos como:
   - *"Busca con Tavily los últimos estudios sobre ayuno intermitente para el libro"*
   - *"Crea una tabla en Supabase para guardar los hábitos de los alumnos"*
   - *"Envía un mensaje de WhatsApp a los alumnos que vencen hoy usándo Twilio"*
