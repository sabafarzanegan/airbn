"use client";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";

import { UploadImameInSupabase } from "@/lib/supabase";
import { uploadImage } from "@/lib/actions/formAction";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

function ChangeImage({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
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
  const inputRef = useRef(null);
  const handleRef = () => {
    inputRef.current.click();
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      setImage({
        file: file,
      });
    }
    console.log(image.file);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const path = await UploadImameInSupabase(image.file);
      console.log(path);

      const data = await uploadImage(path, id);
      console.log(data);

      if (data?.success) {
        toast({
          description: data.message,
        });

        setLoading(false);
        setImage({
          file: {
            name: "",
            lastModified: 0,
            lastModifiedDate: "",
            webkitRelativePath: "",
            size: 0,
            type: "",
          },
        });
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div>
      {image.file.name ? (
        <form onSubmit={handleSubmit}>
          <Button disabled={loading} type="submit">
            {loading ? <Loader2 className="animate-spin" /> : "تغییر"}
          </Button>
        </form>
      ) : (
        <>
          <input
            onChange={handleFileChange}
            accept="image/*"
            required
            id="profilepicture"
            name="profilepicture"
            ref={inputRef}
            type="file"
            className="hidden"
          />
          <Button onClick={handleRef}>تغییر</Button>
        </>
      )}
    </div>
  );
}

export default ChangeImage;
