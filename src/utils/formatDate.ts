export function formatDate(dt: number): string {
  const date = new Date(dt * 1000);
  if (isNaN(date.getTime())) return "Fecha inválida";

  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}
