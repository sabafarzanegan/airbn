import { create } from "zustand";
import { Booking } from "./Type";

// Define the state's shape
type PropertyState = {
  propertyId: string;
  price: number;
  bookings: Booking[];
  range: number;
};

// Create the store
export const useProperty = create<PropertyState>(() => {
  return {
    propertyId: "",
    price: 0,
    bookings: [{ checkIn: "", checkOut: "" }],
    range: 0,
  };
});
