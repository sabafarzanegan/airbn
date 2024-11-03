import { string, z } from "zod";
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

export const propertySchema = z.object({
  // image: z.object({
  //   name: z.string(),
  //   lastModified: z.number(),
  //   lastModifiedDate: z.string(),
  //   webkitRelativePath: z.string(),
  //   size: z.number(),
  //   type: z.string(),
  // }),
  name: z
    .string()
    .min(2, {
      message: "نام حداقل باید 2 حرف باشد",
    })
    .max(100, {
      message: "نام باید کمتر از 100حرف باشد.",
    }),
  tagline: z
    .string()
    .min(2, {
      message: "حداقل 2 tag اضافه کنید.",
    })
    .max(100, {
      message: "کمتر از 100 tag باشد",
    }),
  price: z.coerce.number().int().min(0, {
    message: "باید یک مقدار مثبت باشد",
  }),
  category: z.string(),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(" ").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    {
      message: "محتوا باید بین 10 تا 1000حرف باشد",
    }
  ),
  country: z.string(),
  guests: z.coerce.number().int().min(0, {
    message: "تعداد مهمان باید یک عدد مثبت باشد",
  }),
  bedrooms: z.coerce.number().int().min(0, {
    message: "باید یک مقدار مثبت باشد",
  }),
  beds: z.coerce.number().int().min(0, {
    message: "باید یک مقدار مثبت باشد",
  }),
  baths: z.coerce.number().int().min(0, {
    message: "باید یک مقدار مثبت باشد",
  }),
  amenities: z.string(),
});

export const reviewSchema = z.object({
  propertyId: z.string(),
  rating: z.coerce.number().int(),
  comment: z.string().min(2, { message: "لطفا متن نظر خود رابنویسید" }),
});
