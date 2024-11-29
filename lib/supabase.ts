import { createClient } from "@supabase/supabase-js";
import { FIleImage } from "./Type";

const bucket = "homeAway";

const supabaseUrl = "https://npubsfsnwzoctizdjhvn.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASEKEY;

const supabase = createClient(supabaseUrl as string, supabaseKey as string);
export const UploadImameInSupabase = async (image: FIleImage) => {
  const Timestamp = Date.now();
  const newName = `${Timestamp}-${image.name}`;
  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: "3600" });
  if (!data) throw new Error("مشکلی پیش آمد");
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
