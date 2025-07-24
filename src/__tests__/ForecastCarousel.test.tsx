import { render, screen } from "@testing-library/react";
import { ForecastCarousel } from "@/components/ForecastCarousel";
import {
  IForecast,
  MainEnum,
  Description,
  Icon,
  Pod,
} from "@/interfaces/IForecast";

const mockForecast: IForecast = {
  cod: "200",
  message: 0,
  cnt: 3,
  city: {
    id: 123,
    name: "Estelí",
    coord: { lat: 12.0, lon: -86.25 },
    country: "NI",
    population: 100000,
    timezone: -21600,
    sunrise: 1721740000,
    sunset: 1721784000,
  },
  list: [
    {
      dt: 1721772000,
      main: {
        temp: 25,
        feels_like: 26,
        temp_min: 22,
        temp_max: 28,
        pressure: 1000,
        sea_level: 1010,
        grnd_level: 990,
        humidity: 70,
        temp_kf: 1,
      },
      weather: [
        {
          id: 801,
          main: MainEnum.Clouds,
          description: Description.NubesDispersas,
          icon: Icon.The03D,
        },
      ],
      clouds: { all: 40 },
      wind: { speed: 5, deg: 100, gust: 7 },
      visibility: 10000,
      pop: 0,
      sys: { pod: Pod.D },
      dt_txt: new Date("2025-07-24T12:00:00Z"),
    },
    {
      dt: 1721782000,
      main: {
        temp: 27,
        feels_like: 28,
        temp_min: 23,
        temp_max: 30,
        pressure: 1001,
        sea_level: 1011,
        grnd_level: 991,
        humidity: 65,
        temp_kf: 1,
      },
      weather: [
        {
          id: 802,
          main: MainEnum.Clouds,
          description: Description.MuyNuboso,
          icon: Icon.The04D,
        },
      ],
      clouds: { all: 70 },
      wind: { speed: 6, deg: 110, gust: 8 },
      visibility: 10000,
      pop: 0.1,
      sys: { pod: Pod.D },
      dt_txt: new Date("2025-07-24T15:00:00Z"),
    },
    {
      dt: 1721792000,
      main: {
        temp: 24,
        feels_like: 25,
        temp_min: 21,
        temp_max: 26,
        pressure: 998,
        sea_level: 1008,
        grnd_level: 988,
        humidity: 80,
        temp_kf: 1,
      },
      weather: [
        {
          id: 500,
          main: MainEnum.Rain,
          description: Description.LluviaLigera,
          icon: Icon.The10D,
        },
      ],
      clouds: { all: 90 },
      wind: { speed: 7, deg: 120, gust: 9 },
      visibility: 9000,
      pop: 0.8,
      sys: { pod: Pod.D },
      dt_txt: new Date("2025-07-24T18:00:00Z"),
      rain: { "3h": 1.2 },
    },
  ],
};

describe("ForecastCarousel", () => {
  it("renderiza un WeatherCard por cada entrada del forecast", () => {
    render(<ForecastCarousel forecast={mockForecast} />);

    const cityOccurrences = screen.getAllByText("Estelí");
    expect(cityOccurrences.length).toBe(mockForecast.list.length);

    expect(screen.getByText("nubes dispersas")).toBeInTheDocument();
    expect(screen.getByText("muy nuboso")).toBeInTheDocument();
    expect(screen.getByText("lluvia ligera")).toBeInTheDocument();
  });

  it("muestra mensaje de error si forecast.cod es '404'", () => {
    const forecastWithError: IForecast = {
      ...mockForecast,
      cod: "404",
    };

    render(<ForecastCarousel forecast={forecastWithError} />);
    const errors = screen.getAllByText(/por favor digita bien el nombre/i);
    expect(errors.length).toBe(mockForecast.list.length);
  });
});
