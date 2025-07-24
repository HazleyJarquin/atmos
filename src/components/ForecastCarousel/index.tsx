import { IForecast } from "@/interfaces/IForecast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { WeatherCard } from "../WeatherCard";

interface Props {
  forecast: IForecast;
}

export const ForecastCarousel = ({ forecast }: Props) => {
  return (
    <Carousel className="w-full max-w-4xl mx-auto my-4">
      <CarouselContent className="-ml-1">
        {forecast.list.map((f, index) => (
          <CarouselItem
            key={index}
            className="pl-1 basis-[85%] shrink-0 md:basis-1/2 lg:basis-1/3"
          >
            <div className="p-1">
              <WeatherCard
                variant="Forecast"
                city={forecast.city.name}
                description={f.weather[0].description}
                dt={f.dt}
                main={f.weather[0].main}
                wind={`${f.wind.speed} m/s`}
                temp={`${f.main.temp} °C`}
                tempMin={`${f.main.temp_min} °C`}
                tempMax={`${f.main.temp_max} °C`}
                hasError={forecast.cod === "404"}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white hover:text-white" />
      <CarouselNext className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white hover:text-white" />
    </Carousel>
  );
};
