import { createClient } from "@supabase/supabase-js";

const bucket = "homeAway";

const supabaseUrl = "https://npubsfsnwzoctizdjhvn.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(
  supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wdWJzZnNud3pvY3RpemRqaHZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3NzI3OTMsImV4cCI6MjA0NTM0ODc5M30.CrnH2eZ138xjOQfXJVm2wU_tyVrPIIrcFOkAJYvqRZM"
);
export const UploadImameInSupabase = async (image) => {
  const Timestamp = Date.now();
  const newName = `${Timestamp}-${image.name}`;
  const { data } = await supabase.storage
    .from(bucket)
    .upload(newName, image, { cacheControl: "3600" });
  if (!data) throw new Error("مشکلی پیش آمد");
  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl;
};
