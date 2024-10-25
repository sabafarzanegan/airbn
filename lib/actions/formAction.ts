"use server";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { createProfileType } from "../Type";
import db from "../db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
  const user = await getAuthuser();
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

export const getAuthuser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("ابتدا باید وارد حساب کاربری خود شوید");
  }
  if (!user.privateMetadata.hasProfile) return redirect("/profile/create");
  return user;
};

export const updateProfileAction = async (formData: createProfileType) => {
  const user = await getAuthuser();

  try {
    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        username: formData.username,
        lastName: formData.lastName,
        firstName: formData.firstName,
      },
    });
    revalidatePath("/profile");
    return { success: true, message: "حساب کاربری با موفقیت تغییر کرد" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "مشکلی به وجود آمد",
    };
  }
};

export const fetchUser = async () => {
  const user = await getAuthuser();

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      firstName: true,
      lastName: true,
      username: true,
      profileImage: true,
    },
  });
  return {
    firstName: profile?.firstName,
    lastName: profile?.lastName,
    username: profile?.username,
    profileImage: profile?.profileImage,
  };
};
