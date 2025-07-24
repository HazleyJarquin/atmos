import { render, screen } from "@testing-library/react";
import { WeatherCard } from "@/components/WeatherCard";
import { formatDate } from "@/utils/formatDate";

describe("WeatherCard", () => {
  const defaultProps = {
    city: "Estelí",
    description: "nublado",
    main: "Clouds",
    wind: "10 km/h",
    temp: "25°C",
    tempMin: "20°C",
    tempMax: "28°C",
    variant: "Current" as const,
  };

  it("renderiza correctamente con datos válidos (variant='Current')", () => {
    render(<WeatherCard {...defaultProps} />);

    expect(screen.getByText("Estelí")).toBeInTheDocument();
    expect(screen.getByText("25°C")).toBeInTheDocument();
    expect(screen.getByText("nublado")).toBeInTheDocument();
    expect(screen.getByText("10 km/h")).toBeInTheDocument();
    expect(screen.getByText("20°C - 28°C")).toBeInTheDocument();

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "nublado");
    expect(image).toHaveAttribute("src", expect.stringContaining("/icons/"));
  });

  it("muestra mensaje de error si `hasError` es true", () => {
    render(<WeatherCard {...defaultProps} hasError={true} />);

    expect(screen.getByText("Ciudad no encontrada")).toBeInTheDocument();
    expect(
      screen.getByText("Por favor digita bien el nombre de la ciudad")
    ).toBeInTheDocument();

    expect(screen.queryByText("25°C")).not.toBeInTheDocument();
    expect(screen.queryByText("10 km/h")).not.toBeInTheDocument();
    expect(screen.queryByText("20°C - 28°C")).not.toBeInTheDocument();
  });

  it("renderiza correctamente en modo 'Forecast' mostrando la fecha", () => {
    const forecastProps = {
      ...defaultProps,
      variant: "Forecast" as const,
      dt: 1721772000,
    };

    render(<WeatherCard {...forecastProps} />);

    const formattedDate = formatDate(forecastProps.dt!);
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
    expect(screen.getByText("Estelí")).toBeInTheDocument();
    expect(screen.getByText("25°C")).toBeInTheDocument();
  });
});
