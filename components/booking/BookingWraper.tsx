"use client";
import React, { useEffect } from "react";
import Bookingcalendar from "./Bookingcalendar";
import Bookingcontainer from "./Bookingcontainer";
import { Booking } from "@/lib/Type";
import { useProperty } from "@/lib/store";

type BookingWrapperProps = {
  propertyId: string;
  price: number;
  bookings: Booking[];
};
function BookingWraper({ propertyId, price, bookings }: BookingWrapperProps) {
  const { range } = useProperty((state) => state);

  return (
    <div className="space-y-6">
      <Bookingcalendar propertyId={propertyId} price={price} />
      {range > 0 && <Bookingcontainer />}
    </div>
  );
}

export default BookingWraper;
