"use server";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { createProfileType } from "../Type";
import db from "../db";
import { redirect } from "next/navigation";
export const createProfileAction = async (formData: createProfileType) => {
  try {
    const user = await currentUser();
    console.log(user);
    if (!user) throw new Error("لطفا ابتدا وارد شوید");

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl,
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
      },
    });

    console.log(formData);
    await clerkClient.users.updateUserMetadata(user.id, {
      privateMetadata: { hasProfile: true },
    });

    return { success: true, message: "حساب کاربری با موفقیت ساخته شد" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "مشکلی به وجود آمد",
    };
  }
};

export const fetchImageUser = async () => {
  const user = await currentUser();
  if (!user) return null;
  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });
  return profile?.profileImage;
};
