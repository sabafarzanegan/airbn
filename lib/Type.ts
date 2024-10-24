import { House } from "lucide-react";
export type NavLinks = {
  href: string;
  label: string;
};
export const links: NavLinks[] = [
  { href: "/", label: "خانه" },
  { href: "/favorites ", label: "نشان شده" },
  { href: "/bookings ", label: "رزرو شده" },
  { href: "/reviews ", label: "نظرات" },
  { href: "/rentals/create ", label: "ساختن آگهی" },
  { href: "/rentals", label: "اجاره شده" },
  { href: "/profile ", label: "پروفایل" },
];

export type createProfileType = {
  username: string;
  lastName: string;
  firstName: string;
};
