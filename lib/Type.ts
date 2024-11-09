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
  { href: "/reservations ", label: "آگهی های رزروشده شما" },
  { href: "/rentals", label: "آگهی های من" },
  { href: "/profile ", label: "پروفایل" },
  { href: "/admin ", label: "ادمین" },
];

export type createProfileType = {
  username: string;
  lastName: string;
  firstName: string;
};

export type FIleImage = {
  name: string;
  lastModified: number;
  lastModifiedDate: string;
  webkitRelativePath: string | undefined;
  size: number;
  type: string;
};

export type cityType = {
  name: string;
  center: string;
  latitude: string;
  longitude: string;
  id: number;
};

export type PropertPropsCard = {
  id: string;
  image: string;
  name: string;
  tagline: string;
  country: string;
  price: number;
};

export type Booking = {
  checkIn: string;
  checkOut: string;
};
