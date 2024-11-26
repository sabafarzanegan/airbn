import { links } from "@/lib/Type";

import UserIcon from "./UserIcon";
import Link from "next/link";
import SignOutLink from "./SignOutLink";
import { SignedOut, SignedIn, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { auth } from "@clerk/nextjs/server";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
function LinksDropdown() {
  const { userId } = auth();
  const isAdmin = userId === process.env.ADMIN_USER_ID;
  return (
    <Sheet>
      <SheetTrigger>
        <UserIcon />
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <div className="py-6 space-y-3">
          <SignedOut>
            <SignInButton mode="modal">
              <Button className="w-full " variant="secondary">
                ورود
              </Button>
            </SignInButton>

            <SignUpButton mode="modal">
              <Button className="w-full" variant="default">
                ثبت نام
              </Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <div className="flex flex-col gap-y-3">
              {links.map((link) => {
                if (link.label === "ادمین" && !isAdmin) return null;
                return (
                  <Link className="w-full font-semibold" href={link.href}>
                    <SheetClose>{link.label}</SheetClose>
                  </Link>
                );
              })}
            </div>

            <SignOutLink />
          </SignedIn>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default LinksDropdown;
