import { links } from "@/lib/Type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "../ui/dropdown-menu";
import UserIcon from "./UserIcon";
import Link from "next/link";

function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-none aria-expanded:border-none">
        <UserIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-end justify-start gap-y-2">
        {links.map((link) => (
          <DropdownMenuItem className="w-full">
            <DropdownMenuShortcut></DropdownMenuShortcut>
            <Link href={link.href}>{link.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default LinksDropdown;
