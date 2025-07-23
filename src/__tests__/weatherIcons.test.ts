import { weatherIcons } from "@/utils/weatherIcons";

describe("weatherIcons", () => {
  it("devuelve el ícono correcto para 'Clear'", () => {
    expect(weatherIcons["Clear"]).toBe("/icons/clear-day.svg");
  });

  it("devuelve el ícono correcto para 'Rain'", () => {
    expect(weatherIcons["Rain"]).toBe("/icons/rain.svg");
  });

  it("devuelve el ícono por defecto para claves desconocidas", () => {
    const icon = weatherIcons["NoExiste"] || weatherIcons["Default"];
    expect(icon).toBe("/icons/clear-day.svg");
  });
});
