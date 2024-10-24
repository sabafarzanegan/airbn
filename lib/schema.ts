import { z } from "zod";
export const createProfileSchema = z.object({
  username: z.string().min(4, { message: "نام کاربری حداقل باید دو حرف باشد" }),
  firstName: z.string().min(2, { message: " نام حداقل باید دو حرف باشد" }),
  lastName: z
    .string()
    .min(4, { message: " نام خانوادگی حداقل باید دو حرف باشد" }),
});
