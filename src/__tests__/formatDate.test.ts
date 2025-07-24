import { formatDate } from "@/utils/formatDate";

describe("formatDate", () => {
  it("formatea correctamente un timestamp Unix a formato español largo", () => {
    const timestamp = 1721772000;
    const formatted = formatDate(timestamp);

    expect(formatted).toMatch(
      /^(lunes|martes|miércoles|jueves|viernes|sábado|domingo),?\s+\d{1,2}\s+de\s+(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre),?\s+\d{2}:\d{2}$/
    );
  });

  it("devuelve un string vacío si se le pasa un valor inválido (opcional)", () => {
    const result = formatDate(NaN);
    expect(result).toBe("Fecha inválida");
  });
});
