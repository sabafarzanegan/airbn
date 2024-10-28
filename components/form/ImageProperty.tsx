"use client";

import { UploadImameInSupabase } from "@/lib/supabase";
import { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

function ImageProperty() {
  const [image, setImage] = useState({
    file: {
      name: "",
      lastModified: 0,
      lastModifiedDate: "",
      webkitRelativePath: "",
      size: 0,
      type: "",
    },
    name: "",
    lastModified: 0,
    size: 0,
    type: "",
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    console.log(file);

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
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const path = await UploadImameInSupabase(image.file);
    } catch (error) {}
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="profilepicture" className="px-4">
          تصویر
        </Label>
        <input
          onChange={handleFileChange}
          type="file"
          accept="image/*"
          required
          id="profilepicture"
          name="profilepicture"
          className=""
        />

        <Button type="submit">ارسال</Button>
      </form>
    </div>
  );
}

export default ImageProperty;
