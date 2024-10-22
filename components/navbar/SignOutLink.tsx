"use client";
import { useToast } from "@/hooks/use-toast";
import { SignOutButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
function SignOutLink() {
  const { toast } = useToast();
  const handlelogout = () => {
    toast({ description: "شما از حساب کاربری خود خارج شدید" });
  };
  return (
    <SignOutButton redirectUrl="/">
      <Button
        variant="destructive"
        onClick={handlelogout}
        className="flex items-center justify-between w-full px-1">
        <span>
          <LogOut className="w-4 h-4" />
        </span>
        <span>خروج</span>
      </Button>
    </SignOutButton>
  );
}

export default SignOutLink;
