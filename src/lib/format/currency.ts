export type Currency = "USD" | "INR";

const LOCALE_BY_CURRENCY: Record<Currency, string> = {
  USD: "en-US",
  INR: "en-IN",
};

export function formatCurrency(amountCents: number, currency: Currency): string {
  return new Intl.NumberFormat(LOCALE_BY_CURRENCY[currency], {
    style: "currency",
    currency,
  }).format(amountCents / 100);
}

export function formatSignedCurrency(amountCents: number, currency: Currency): string {
  const formatted = formatCurrency(Math.abs(amountCents), currency);
  return amountCents < 0 ? `-${formatted}` : `+${formatted}`;
}
