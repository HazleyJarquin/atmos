import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { weatherIcons } from "@/utils/weatherIcons";
import { MapPinIcon, WindIcon } from "lucide-react";

interface Props {
  city: string;
  description: string;
  main: string;
  hasError?: boolean;
  wind: string;
  temp: string;
  tempMin: string;
  tempMax: string;
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
}: Props) => {
  return (
    <Card className="relative w-full  md:w-[350px] rounded-xl bg-[#2A2E3B]/80 text-white shadow-lg backdrop-blur-xl overflow-hidden border border-gray-700">
      <div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(100, 150, 255, 0.3) 0%, transparent 70%)",
        }}
      />
      <CardHeader className="flex flex-row items-center gap-2 justify-center px-6 py-4 relative z-10">
        <MapPinIcon className="w-5 h-5" />
        <h2 className="text-xl font-semibold">
          {hasError ? "Ciudad no encontrada" : `${city}`}
        </h2>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8 relative z-10">
        {!hasError && (
          <span className="text-lg font-semibold text-yellow-500">{temp}</span>
        )}

        <Image
          src={weatherIcons[main] || "/icons/cloudy-day.svg"}
          alt={description}
          width={100}
          height={100}
          className="w-32 h-32"
        />
        <span
          className={`${
            hasError
              ? "text-md text-muted-foreground font-medium text-center"
              : "text-lg text-white font-medium capitalize"
          }`}
        >
          {hasError
            ? "Por favor digita bien el nombre de la ciudad"
            : `${description}`}
        </span>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-between px-6 py-4 border-t border-gray-700 relative z-10">
        <div className="flex items-center gap-2">
          <WindIcon />
          {wind}
        </div>
        <div>
          <div className="text-sm text-gray-400">
            {tempMin} - {tempMax}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
