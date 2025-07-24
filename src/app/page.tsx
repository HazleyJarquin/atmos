import { getForecastByCity, getWeatherByCity } from "@/actions";
import { CitySearchForm } from "@/components/CitySearchForm";
import { ForecastCarousel } from "@/components/ForecastCarousel";
import { WeatherCard } from "@/components/WeatherCard";
import { CloudSunIcon } from "lucide-react";

interface Props {
  searchParams: Promise<{
    city?: string;
  }>;
}

export default async function Home({ searchParams }: Props) {
  const city = (await searchParams).city || "London";

  const [currentWeather, forecast] = await Promise.all([
    getWeatherByCity(city),
    getForecastByCity(city),
  ]);

  return (
    <div
      className={`bg-slate-950 w-full min-h-screen flex flex-col items-center p-4 gap-6`}
    >
      <CitySearchForm initialCity={city} />

      <WeatherCard
        variant="Current"
        city={currentWeather.name ?? ""}
        main={currentWeather?.weather?.[0]?.main ?? ""}
        description={currentWeather?.weather?.[0]?.description ?? ""}
        wind={`${currentWeather.wind?.speed ?? 0} m/s`}
        temp={`${currentWeather.main?.temp ?? 0} °C`}
        tempMin={`${currentWeather.main?.temp_min ?? 0} °C`}
        tempMax={`${currentWeather.main?.temp_max ?? 0} °C`}
        hasError={!!currentWeather.error}
      />

      {forecast?.list?.length > 0 && (
        <>
          <div className="flex flex-col md:flex-row items-center gap-2 mt-6 text-white">
            <CloudSunIcon className="w-6 h-6 text-yellow-400" />
            <h2 className="text-lg text-center md:text-xl font-semibold">
              Pronóstico extendido para los próximos días
            </h2>
          </div>
          <ForecastCarousel forecast={forecast} />
        </>
      )}
    </div>
  );
}
