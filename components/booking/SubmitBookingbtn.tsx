"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

function SubmitBookingbtn() {
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
