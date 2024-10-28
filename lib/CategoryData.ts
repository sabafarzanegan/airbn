import { IconType } from "react-icons";
import { MdCabin } from "react-icons/md";

import { TbCaravan, TbTent, TbBuildingCottage } from "react-icons/tb";

import { GiWoodCabin, GiMushroomHouse } from "react-icons/gi";
import { PiWarehouse, PiLighthouse, PiVan } from "react-icons/pi";

import { GoContainer } from "react-icons/go";

export type Category = {
  label: CategoryName;
  icon: IconType;
};

export type CategoryName =
  | "کلبه روستایی"
  | "چادر"
  | "کاروان"
  | "اتاق"
  | " اقامتگاه (یا کلبه کوهستانی)";

export const Categories: Category[] = [
  {
    label: "کلبه روستایی",
    icon: MdCabin,
  },
  {
    label: "چادر",
    icon: TbTent,
  },
  {
    label: "کاروان",
    icon: PiVan,
  },
  {
    label: "اتاق",
    icon: PiWarehouse,
  },
  {
    label: "اقامتگاه",
    icon: TbBuildingCottage,
  },
];
