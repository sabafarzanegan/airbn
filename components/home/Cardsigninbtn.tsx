import React from "react";
import { Button } from "../ui/button";
import { SignInButton } from "@clerk/nextjs";
import { FaRegHeart } from "react-icons/fa";

function Cardsigninbtn() {
  return (
    <SignInButton mode="modal">
      <Button
        variant="outline"
        size="icon"
        className="p-2 cursor-pointer"
        type="button">
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
}

export default Cardsigninbtn;
