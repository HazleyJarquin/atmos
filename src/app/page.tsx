import { getForecastByCity, getWeatherByCity } from "@/actions";
import { CitySearchForm } from "@/components/CitySearchForm";
import { ForecastCarousel } from "@/components/ForecastCarousel";
import { WeatherCard } from "@/components/WeatherCard";

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
      className={`bg-slate-950 w-full ${
        forecast && forecast.list && forecast.list.length > 0
          ? "h-full"
          : "h-screen"
      } md:h-screen flex flex-col items-center justify-center p-4 gap-2`}
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
      {forecast && forecast.list && forecast.list.length > 0 && (
        <ForecastCarousel forecast={forecast} />
      )}
    </div>
  );
}
