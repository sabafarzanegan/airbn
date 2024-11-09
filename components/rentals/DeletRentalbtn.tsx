"use client";
import { Loader2, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

function DeletRentalbtn() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} variant="destructive">
      {pending ? <Loader2 className="animate-spin" /> : <Trash />}
    </Button>
  );
}

export default DeletRentalbtn;
