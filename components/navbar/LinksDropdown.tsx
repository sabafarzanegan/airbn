import { links } from "@/lib/Type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import UserIcon from "./UserIcon";
import Link from "next/link";
import SignOutLink from "./SignOutLink";
import { SignedOut, SignedIn, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { auth } from "@clerk/nextjs/server";
function LinksDropdown() {
  const { userId } = auth();
  const isAdmin = userId === process.env.ADMIN_USER_ID;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-none peer-aria-checked:border-none">
        <UserIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-end justify-start gap-y-2 w-[200px] mt-2">
        <SignedOut>
          <DropdownMenuItem className="w-full flex items-center justify-center">
            <SignInButton mode="modal">
              <Button className="w-full" variant="secondary">
                ورود
              </Button>
            </SignInButton>
          </DropdownMenuItem>

          <DropdownMenuItem className="w-full flex items-center justify-center">
            <SignUpButton mode="modal">
              <Button className="w-full" variant="default">
                ثبت نام
              </Button>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>
        <SignedIn>
          {links.map((link) => {
            if (link.label === "ادمین" && !isAdmin) return null;
            return (
              <DropdownMenuItem className="w-full font-semibold">
                <DropdownMenuShortcut></DropdownMenuShortcut>
                <Link href={link.href}>{link.label}</Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuItem className="w-full">
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinksDropdown;
