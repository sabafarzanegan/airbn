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

export type propertyType = {
  name: string;
  tagline: string;
  price: number;
  category: string;
  description: string;
  country: string;
  guests: number;
  bedrooms: string;
  beds: number;
  baths: number;
  amenities: string;
};

export type DetailProperty = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  image: string;
  country: string;
  description: string;

  price: number;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  amenities: string;
  createdAt: Date;
  updatedAt: Date;
  profileId: string;
  profile: {
    id: string;
    clerkId: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    profileImage: string;
    createdAt: Date;
    updatedAt: Date;
  };
  bookings: [{ checkIn: string; checkOut: string }];
};
