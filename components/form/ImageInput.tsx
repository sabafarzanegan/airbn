"use client";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { uploadImageaction } from "@/lib/actions/formAction";
import { Label } from "../ui/label";
import { UploadImameInSupabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { CloudUpload } from "lucide-react";

function ImageInput({
  profilePicture,
}: {
  profilePicture: string | undefined;
}) {
  const [isLoading, setIsloading] = useState(false);
  const [image, setImage] = useState({
    file: {
      name: "",
      lastModified: 0,
      lastModifiedDate: "",
      webkitRelativePath: "",
      size: 0,
      type: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];

    if (file) {
      setImage({
        file: file,
        name: file.name,
        lastModified: file.lastModified,
        size: file.size,
        type: file.type,
      });
    }
  };
  const InputFileRef = useRef<HTMLInputElement | null>(null);
  const handleButtonClick = () => {
    if (InputFileRef.current !== null) {
      InputFileRef.current.click();
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsloading(true);
      const path = await UploadImameInSupabase(image.file);

      const data = await uploadImageaction(path);

      if (data?.success) {
        toast({
          description: data.message,
        });
        setIsloading(false);

        window.location.reload();
      } else {
        setIsloading(false);

        toast({
          description: "خطا در بارگزاری عکس",
        });
      }
    } catch (error) {
      setIsloading(false);
    }
  };
  return (
    <div className="space-y-4 mb-3">
      {profilePicture !== undefined && (
        <Image
          src={profilePicture}
          alt="profilepicture"
          width={100}
          height={100}
          className="w-16 h-16 rounded-full "
        />
      )}
      <form onSubmit={handleSubmit}>
        <Label htmlFor="profilepicture" className="px-4">
          تصویرکاربری
        </Label>
        <input
          onChange={handleFileChange}
          type="file"
          accept="image/*"
          required
          id="profilepicture"
          name="profilepicture"
          ref={InputFileRef}
          className="hidden"
        />
        <div>
          {!image.file.name ? (
            <div
              onClick={handleButtonClick}
              className="my-2 cursor-pointer flex  flex-col items-center justify-center gap-y-2 p-4 border border-dashed">
              <CloudUpload />
              <p className="text-sm text-gray-500">
                تصویر موردنظر را انتخاب کنید
              </p>
            </div>
          ) : (
            <div
              onClick={handleButtonClick}
              className="my-2 cursor-pointer flex  flex-col items-center justify-center gap-y-2 p-4 border border-dashed">
              <p className=" text-gray-500 text-primary text-lg">
                تصویر انتخاب شده:
              </p>
              <span className="text-sm">{image.file.name}</span>
            </div>
          )}
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading ? "درحال ارسال" : "ذخیره عکس"}
        </Button>
      </form>
    </div>
  );
}

export default ImageInput;
