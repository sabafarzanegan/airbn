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

export function convertToFarsi(number: number) {
  const englishToFarsi = {
    "0": "۰",
    "1": "۱",
    "2": "۲",
    "3": "۳",
    "4": "۴",
    "5": "۵",
    "6": "۶",
    "7": "۷",
    "8": "۸",
    "9": "۹",
  };

  return number
    .toString()
    .split("")
    .map((digit) => englishToFarsi[digit] || digit)
    .join("");
}
