import { render, screen, fireEvent } from "@testing-library/react";
import { CitySearchForm } from "@/components/CitySearchForm";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("CitySearchForm", () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    push.mockClear();
  });

  it("renderiza correctamente con ciudad inicial", () => {
    render(<CitySearchForm initialCity="Estelí" />);
    const input = screen.getByPlaceholderText(
      "Buscar ciudad..."
    ) as HTMLInputElement;
    expect(input.value).toBe("Estelí");
  });

  it("envía la búsqueda al hacer submit", () => {
    render(<CitySearchForm initialCity="Tokyo" />);
    const input = screen.getByPlaceholderText("Buscar ciudad...");
    const button = screen.getByRole("button", { name: /buscar/i });

    fireEvent.change(input, { target: { value: "Madrid" } });
    fireEvent.click(button);

    expect(push).toHaveBeenCalledWith("/?city=Madrid");
  });

  it("no hace push si el input está vacío", () => {
    render(<CitySearchForm initialCity="" />);
    const input = screen.getByPlaceholderText("Buscar ciudad...");
    const button = screen.getByRole("button", { name: /buscar/i });

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(button);

    expect(push).not.toHaveBeenCalled();
  });

  it("los botones de ciudades precargadas actualizan el input y hacen push", () => {
    render(<CitySearchForm initialCity="" />);
    const cityButton = screen.getByRole("button", { name: "Panamá" });

    fireEvent.click(cityButton);

    const input = screen.getByPlaceholderText(
      "Buscar ciudad..."
    ) as HTMLInputElement;
    expect(input.value).toBe("Panamá");
    expect(push).toHaveBeenCalledWith("/?city=Panam%C3%A1"); // Panamá URL encoded
  });
});
