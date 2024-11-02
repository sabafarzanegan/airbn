"use client";

import { useFormStatus } from "react-dom";
import { FaHeart } from "react-icons/fa";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export default function StatusFavoritebtn({
  favoriteId,
}: {
  favoriteId: string | null;
}) {
  const { pending } = useFormStatus();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            type="submit"
            size="icon"
            className={`cursor-pointer p-2 ${
              favoriteId ? "text-red-600" : ""
            }`}>
            {pending ? (
              <ReloadIcon className="h-4 w-4 animate-spin" />
            ) : (
              <FaHeart />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className={`${favoriteId ? "bg-red-500" : "bg-primary"}`}>
          <p>{favoriteId ? "حدف از مورپسندها" : "اضافه به موردپسندها"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
