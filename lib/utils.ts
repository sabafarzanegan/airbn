import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAsToman(price: string | number) {
  const numericPrice = Number(price);

  if (isNaN(numericPrice)) {
    throw new Error("Invalid price value");
  }

  const tomanAmount = new Intl.NumberFormat("fa-IR", {
    style: "currency",
    currency: "IRR",
    minimumFractionDigits: 0,
  }).format(numericPrice * 10);

  return tomanAmount.replace("ریال", "تومان");
}
