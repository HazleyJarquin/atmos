# 🌤️ Atmos

**Atmos** es una aplicación web que permite buscar y visualizar el clima actual de cualquier ciudad del mundo utilizando la API de [OpenWeather](https://openweathermap.org/api). Fue desarrollada con **Next.js 15 (App Router)**, **TypeScript**, y componentes UI de **shadcn/ui**.

🔗 [Ver demo en vivo](https://atmos-haz.up.railway.app/)

---

## 🚀 Tecnologías utilizadas

- ⚛️ [Next.js 15 (App Router)](https://nextjs.org/docs/app)
- 💬 [OpenWeather API](https://openweathermap.org/current)
- 💅 [shadcn/ui](https://ui.shadcn.com/)
- 🧪 [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/)
- 🧠 TypeScript
- 🎨 Tailwind CSS

---

## 📦 Instalación

```bash
git clone https://github.com/HazleyJarquin/atmos
cd atmos
npm install
```

> Asegúrate de tener **Node.js v18+** y una cuenta en [OpenWeather](https://openweathermap.org/).

### 🔐 Configuración del entorno

Crea un archivo `.env.local` o `.env` en la raíz del proyecto con tu clave de API:

```env
OPEN_WEATHER_API_KEY=tu_api_key_aqui
```

---

## 🧭 Cómo usar

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Luego visita: [http://localhost:3000](http://localhost:3000)

📝 Escribí el nombre de una ciudad y obtené el clima actual (temperatura, estado del cielo, viento, etc.).

---

## ✅ Testing

Este proyecto incluye pruebas unitarias para los componentes principales:

- `CitySearchForm` (formulario de búsqueda)
- `WeatherCard` (tarjeta del clima)
- Lógica de renderizado condicional (errores, estados)

### Ejecutar tests:

```bash
npm run test
```

### Ver cobertura:

```bash
npm run test:coverage
```

### Abrir reporte HTML de cobertura:

```bash
start coverage/lcov-report/index.html
```

> La aplicación cumple con un mínimo del **80% de cobertura** de código según los umbrales definidos en `jest.config.js`.

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── CitySearchForm/
│   ├── WeatherCard/
│   └── ui/            # Componentes de shadcn
├── lib/
├── utils/
├── __tests__/         # Pruebas unitarias
├── actions/           # Lógica del servidor (server actions)

```

---

## 🧠 Lógica general

- Al iniciar, se consulta el clima de una ciudad por defecto (`London`).
- El usuario puede buscar otras ciudades y se muestra la información en tiempo real.
- En caso de error (ciudad inválida), se muestra un mensaje adecuado.
- Los íconos del clima son SVGs personalizados según el tipo de clima.

---

## 🚀 Producción

Para generar el build de producción:

```bash
npm run build
npm run start
```

---

## ✨ Créditos

- API de datos climáticos por [OpenWeather](https://openweathermap.org/)
- UI components por [shadcn/ui](https://ui.shadcn.com/)
- Desarrollo por [Hazley Jarquin]
