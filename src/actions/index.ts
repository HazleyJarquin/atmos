"use server";

import { IWeatherResponse } from "@/interfaces/IWeather";

export async function getWeatherByCity(
  city: string
): Promise<IWeatherResponse> {
  const apiKey = process.env.OPEN_WEATHER_API_KEY;
  try {
    console.log("fetch ejecutado:", city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lang=es&q=${city}&appid=${apiKey}&units=metric`,
      {
        next: { revalidate: 60 },
      }
    );
    if (!response.ok) {
      return { error: "Ciudad no encontrada. Por favor verifica el nombre." };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener el clima:", error);
    return { error: "Error al consultar el clima. Intenta más tarde." };
  }
}
