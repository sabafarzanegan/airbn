"use client";
import {
  EmailShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";
import { TbBrandTelegram } from "react-icons/tb";
import { BiLogoGmail } from "react-icons/bi";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { PiShareFatDuotone } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
const url = process.env.NEXT_PUBLIC_WEBSITE_URL;

function SharedBtn({ propertyId, name }: { propertyId: string; name: string }) {
  const shareLink = `${url}/properties/${propertyId}`;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <PiShareFatDuotone />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex items-center justify-between ">
        <TelegramShareButton url={shareLink} title={name}>
          <TbBrandTelegram className="hover:text-primary transition-colors duration-150 text-lg" />
        </TelegramShareButton>
        <EmailShareButton url={shareLink} title={name}>
          <BiLogoGmail className="hover:text-primary transition-colors duration-150 text-lg" />
        </EmailShareButton>
        <WhatsappShareButton url={shareLink} title={name}>
          <FaWhatsapp className="hover:text-primary transition-colors duration-150 text-lg" />
        </WhatsappShareButton>
        <LinkedinShareButton url={shareLink} title={name}>
          <FaLinkedinIn className="hover:text-primary transition-colors duration-150 text-lg" />
        </LinkedinShareButton>
      </PopoverContent>
    </Popover>
  );
}

export default SharedBtn;
