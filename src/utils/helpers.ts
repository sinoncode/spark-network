export function formatCurrency(value: number | undefined) {
  if (typeof value !== "number") return "-";
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(value);
}
