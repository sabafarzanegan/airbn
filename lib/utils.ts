import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment-jalaali";

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

  // فرمت عدد به صورت ۳ رقمی
  const formattedNumber = new Intl.NumberFormat("fa-IR").format(number);

  return formattedNumber
    .split("")
    .map((digit) => englishToFarsi[digit] || digit)
    .join("");
}

function isLeapYear(year) {
  return year % 4 === 0;
}

function getDaysInMonth(year, month) {
  if (month === 12) {
    return isLeapYear(year) ? 30 : 29;
  }
  return month % 2 === 1 ? 31 : 30;
}

function convertPersianToEnglishNumber(persianNumber: string) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let englishNumber = "";
  for (let char of persianNumber) {
    const index = persianDigits.indexOf(char);
    englishNumber += index !== -1 ? englishDigits[index] : char;
  }

  return englishNumber;
}

export function calculateDateDifference(dateArray) {
  if (dateArray.length !== 2) {
    console.log("The array must contain exactly two dates.");
    return null;
  }

  const date1 = moment(
    convertPersianToEnglishNumber(dateArray[0]),
    "jYYYY/jMM/jDD"
  );
  const date2 = moment(
    convertPersianToEnglishNumber(dateArray[1]),
    "jYYYY/jMM/jDD"
  );

  console.log("Parsed Date 1:", date1.format("YYYY-MM-DD"));
  console.log("Parsed Date 2:", date2.format("YYYY-MM-DD"));

  if (!date1.isValid() || !date2.isValid()) {
    console.log(
      "Invalid date format. Please ensure dates are in the 'jYYYY/jMM/jDD' format."
    );
    return null;
  }

  const diffInDays = date2.diff(date1, "days");

  console.log(`Difference in days: ${diffInDays}`);

  return Math.abs(diffInDays);
}
