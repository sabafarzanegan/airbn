"use client";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { deletReview } from "@/lib/actions/formAction";
import { toast } from "@/hooks/use-toast";

function Deletbtn({ id }: { id: string }) {
  return (
    <Button
      onClick={async () => {
        const data = await deletReview(id);
        if (data?.success) {
          return toast({
            description: data.message,
          });
        }
        console.log(data);
      }}
      className="mt-4"
      variant="destructive">
      <Trash />
    </Button>
  );
}

export default Deletbtn;
