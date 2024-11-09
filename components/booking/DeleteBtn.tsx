"use client";
import React from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { Loader2 } from "lucide-react";

import { useFormStatus } from "react-dom";

function DeleteBtnBooking() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} variant="destructive">
      {pending ? <Loader2 className="animate-spin" /> : <Trash />}
    </Button>
  );
}

export default DeleteBtnBooking;
