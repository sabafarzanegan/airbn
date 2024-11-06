"use client";
import React from "react";
import Bookingcalendar from "./Bookingcalendar";
import Bookingcontainer from "./Bookingcontainer";
import { Booking } from "@/lib/Type";
import { useProperty } from "@/lib/store";
import BookingInfo from "./BookingInfo";

type BookingWrapperProps = {
  propertyId: string;
  price: number;
  bookings: Booking[];
  checkIn: string | undefined;
  checkOut: string | undefined;
  orderTotal: number | undefined;
  totalNights: number | undefined;
};
function BookingWraper({
  propertyId,
  price,
  bookings,
  checkIn,
  checkOut,
  orderTotal,
  totalNights,
}: BookingWrapperProps) {
  const { range } = useProperty((state) => state);

  return (
    <div className="space-y-6">
      {checkIn === undefined && (
        <Bookingcalendar propertyId={propertyId} price={price} />
      )}
      {range > 0 && <Bookingcontainer />}
      {checkIn && (
        <BookingInfo
          checkIn={checkIn}
          checkOut={checkOut}
          orderTotal={orderTotal}
          totalNights={totalNights}
        />
      )}
    </div>
  );
}

export default BookingWraper;
