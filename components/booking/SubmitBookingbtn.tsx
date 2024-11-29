"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { useProperty } from "@/lib/store";

function SubmitBookingbtn() {
  const { bookings } = useProperty((state) => state);
  console.log("bookings", bookings);

  const { pending } = useFormStatus();
  return (
    <div>
      <Button
        className="w-full mt-4 font-semibold"
        type="submit"
        disabled={pending}>
        {pending ? "در حال انجام..." : "رزرو کردن"}
      </Button>
    </div>
  );
}

export default SubmitBookingbtn;
