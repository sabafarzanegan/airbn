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
