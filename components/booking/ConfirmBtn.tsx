"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useProperty } from "@/lib/store";
import { createBookingAction } from "@/lib/actions/formAction";
import SubmitBookingbtn from "./SubmitBookingbtn";

function ConfirbookingmBtn() {
  const { userId } = useAuth();
  const { propertyId, range, bookings, price } = useProperty((state) => state);
  console.log(propertyId, range, bookings, price);

  if (!userId) {
    <SignInButton mode="modal">
      <Button type="button" className="w-full">
        ابتدا وارد شوید
      </Button>
    </SignInButton>;
  }

  const createBooking = createBookingAction.bind(null, {
    propertyId,
    checkIn: bookings[0].checkIn,
    checkOut: bookings[0].checkOut,
    orderTotal: range * price + 100000,
    totalNights: range,
  });

  return (
    <form action={createBooking}>
      <SubmitBookingbtn />
    </form>
  );
}

export default ConfirbookingmBtn;
