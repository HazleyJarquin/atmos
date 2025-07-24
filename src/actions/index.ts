"use server";

import { IForecast } from "@/interfaces/IForecast";
import { IWeatherResponse } from "@/interfaces/IWeather";

const apiKey = process.env.OPEN_WEATHER_API_KEY;
export async function getWeatherByCity(
  city: string
): Promise<IWeatherResponse> {
  try {
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

export async function getForecastByCity(city: string): Promise<IForecast> {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lang=es&q=${city}&appid=${apiKey}&units=metric`,
      {
        next: { revalidate: 60 },
      }
    );
    const data: IForecast = await response.json();

    if (data.cod === "404") {
      return {
        message: data.message,
        cod: data.cod,
        cnt: 0,
        list: [],
        city: {
          id: 0,
          name: "",
          coord: { lat: 0, lon: 0 },
          country: "",
          population: 0,
          timezone: 0,
          sunrise: 0,
          sunset: 0,
        },
      };
    }

    return data;
  } catch (error) {
    console.error("Error al obtener la previsión del clima:", error);
    return {
      cod: "500",
      message: 0,
      cnt: 0,
      list: [],
      city: {
        id: 0,
        name: "",
        coord: { lat: 0, lon: 0 },
        country: "",
        population: 0,
        timezone: 0,
        sunrise: 0,
        sunset: 0,
      },
    };
  }
}
