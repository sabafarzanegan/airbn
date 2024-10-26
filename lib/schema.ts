import { z } from "zod";
export const createProfileSchema = z.object({
  username: z.string().min(4, { message: "نام کاربری حداقل باید دو حرف باشد" }),
  firstName: z.string().min(2, { message: " نام حداقل باید دو حرف باشد" }),
  lastName: z
    .string()
    .min(4, { message: " نام خانوادگی حداقل باید دو حرف باشد" }),
});

const validation = () => {
  const maxUploadSize = 1024 * 1024;
  return z.instanceof(File).refine((file) => {
    return !file || file.size <= maxUploadSize;
  }, "حجم عکس باید کمتراز 1MBباشد");
};

export const ImageValidationFile = z.object({
  ImageFile: validation(),
});
