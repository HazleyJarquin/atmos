import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { weatherIcons } from "@/utils/weatherIcons";
import { MapPinIcon, WindIcon } from "lucide-react";
import { formatDate } from "@/utils/formatDate";

interface Props {
  city: string;
  description: string;
  main: string;
  hasError?: boolean;
  wind: string;
  temp: string;
  tempMin: string;
  tempMax: string;
  dt?: number;
  variant: "Forecast" | "Current";
}

export const WeatherCard = ({
  city,
  description,
  main,
  hasError,
  wind,
  temp,
  tempMin,
  tempMax,
  dt,
  variant = "Current",
}: Props) => {
  const isForecast = variant === "Forecast";

  return (
    <Card className="relative w-full md:max-w-80 rounded-xl bg-[#2A2E3B]/80 text-white shadow-lg backdrop-blur-xl overflow-hidden border border-gray-700">
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(100, 150, 255, 0.3) 0%, transparent 70%)",
        }}
      />

      <CardHeader className="flex flex-col items-center gap-2 justify-center px-6 py-4 relative z-10">
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-5 h-5" />
          <h2 className="text-xl sm:text-lg font-semibold">
            {hasError ? "Ciudad no encontrada" : city}
          </h2>
        </div>

        {isForecast && dt && (
          <span className="capitalize">{formatDate(dt)}</span>
        )}
      </CardHeader>

      <CardContent
        className={`flex flex-col items-center gap-3 justify-center relative z-10 ${
          isForecast ? "px-4 py-3 sm:px-3 sm:py-2" : "px-6 py-5 sm:px-4 sm:py-3"
        }`}
      >
        {!hasError && (
          <span
            className={`font-semibold text-yellow-500 ${
              isForecast ? "text-3xl sm:text-2xl" : "text-xl sm:text-lg"
            }`}
          >
            {temp}
          </span>
        )}

        <Image
          src={weatherIcons[main] || "/icons/cloudy-day.svg"}
          alt={description}
          width={isForecast ? 80 : 120}
          height={isForecast ? 80 : 120}
          className={`mb-2 ${
            isForecast
              ? "w-20 h-20 sm:w-16 sm:h-16"
              : "w-32 h-32 sm:w-24 sm:h-24"
          }`}
        />

        <span
          className={`text-center ${
            hasError
              ? "text-md text-muted-foreground font-medium"
              : `${
                  isForecast ? "text-base sm:text-sm" : "text-lg sm:text-base"
                } text-white font-medium capitalize`
          }`}
        >
          {hasError
            ? "Por favor digita bien el nombre de la ciudad"
            : description}
        </span>

        {!hasError && (
          <div className="flex justify-between items-center w-full text-sm text-gray-300 border-t border-gray-700 pt-3 mt-2 sm:pt-2 sm:mt-1">
            <div className="flex items-center gap-2">
              <WindIcon className="w-4 h-4" />
              {wind}
            </div>
            <div>
              {tempMin} - {tempMax}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
