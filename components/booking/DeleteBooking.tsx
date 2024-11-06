"use client";

import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { deleteBookingAction } from "@/lib/actions/formAction";

function DeleteBooking({ bookingId }: { bookingId: string }) {
  const deletHandler = deleteBookingAction.bind(null, {
    bookingId,
  });

  return (
    <form action={deletHandler}>
      <Button variant="destructive">
        <Trash />
      </Button>
    </form>
  );
}

export default DeleteBooking;
