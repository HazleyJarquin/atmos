"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SearchIcon } from "lucide-react";
interface Props {
  initialCity: string;
}
export const CitySearchForm = ({ initialCity }: Props) => {
  const [cityInput, setCityInput] = useState(initialCity);
  const router = useRouter();
  const cities = ["London", "Nicaragua", "Panamá"];
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cityInput.trim()) return;
    router.push(`/?city=${encodeURIComponent(cityInput.trim())}`);
  };

  return (
    <div className="w-full flex flex-col items-center gap-2 sticky top-0 z-[999] bg-slate-950 p-4">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 w-full max-w-md"
      >
        <Input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Buscar ciudad..."
          className="flex-1 bg-slate-800 text-slate-50 border-slate-700 placeholder:text-slate-400 focus-visible:ring-blue-500"
        />
        <Button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
        >
          <SearchIcon className="h-4 w-4" />
          Buscar
        </Button>
      </form>
      <div className="flex gap-2 items-center">
        {cities.map((c) => (
          <Button
            key={c}
            onClick={() => {
              setCityInput(c);
              router.push(`/?city=${encodeURIComponent(c)}`);
            }}
            className={
              c === cityInput
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-slate-50"
            }
          >
            {c}
          </Button>
        ))}
      </div>
    </div>
  );
};
