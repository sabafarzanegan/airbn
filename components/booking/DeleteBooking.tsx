"use client";

import { deleteBookingAction } from "@/lib/actions/formAction";

import DeleteBtnBooking from "./DeleteBtn";

function DeleteBooking({ bookingId }: { bookingId: string }) {
  const deletHandler = deleteBookingAction.bind(null, {
    bookingId,
  });

  return (
    <form action={deletHandler}>
      <DeleteBtnBooking />
    </form>
  );
}

export default DeleteBooking;
