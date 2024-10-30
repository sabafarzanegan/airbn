import { IconType } from "react-icons";
import { MdCabin } from "react-icons/md";

import { TbBuildingCottage } from "react-icons/tb";
import { PiBuildingApartment } from "react-icons/pi";
import { TbBeach } from "react-icons/tb";
import { MdOutlineVilla } from "react-icons/md";
import { FaSwimmingPool } from "react-icons/fa";
import { MdOutlineHolidayVillage } from "react-icons/md";
export type Category = {
  label: CategoryName;
  icon: IconType;
};

export type CategoryName =
  | "ویلا"
  | "آپارتمان"
  | "ساحلی"
  | "استخردار"
  | "اقامتگاه"
  | "کلبه"
  | "بوم گردی";

export const Categories: Category[] = [
  {
    label: "ویلا",
    icon: MdOutlineVilla,
  },
  {
    label: "آپارتمان",
    icon: PiBuildingApartment,
  },
  {
    label: "ساحلی",
    icon: TbBeach,
  },
  {
    label: "استخردار",
    icon: FaSwimmingPool,
  },
  {
    label: "اقامتگاه",
    icon: TbBuildingCottage,
  },
  {
    label: "کلبه",
    icon: MdCabin,
  },
  {
    label: "بوم گردی",
    icon: MdOutlineHolidayVillage,
  },
];
