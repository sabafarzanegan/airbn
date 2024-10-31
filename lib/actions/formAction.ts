"use server";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { createProfileType, FIleImage } from "../Type";
import db from "../db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { propertySchema } from "@/lib/schema";
import { UploadImameInSupabase } from "../supabase";
import { toast } from "@/hooks/use-toast";

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
    redirect("/profile/create");
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

export const uploadImageaction = async (data: string) => {
  const user = await getAuthuser();
  try {
    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: {
        profileImage: data,
      },
    });
    return { success: true, message: "تصویر شما با موفقیت آپلود شد" };
  } catch (error) {
    console.log(error);
  }
};

export const getCenter = async () => {
  try {
    const data = await fetch("https://iran-locations-api.ir/api/v1/fa/states", {
      method: "GET",
    });
    if (data.status === 200) {
      return await data.json();
    }
  } catch (error) {}
};

export const createPropertyAction = async (
  formData: typeof propertySchema,
  path: string
) => {
  const user = await getAuthuser();

  try {
    const property = await db.property.create({
      data: {
        ...formData,
        profileId: user.id,
        image: path,
      },
    });

    return { success: true, message: "آگهی شما با موفقیت ثبت شد" };
  } catch (error) {
    return {
      success: false,
      message: "مشکلی به وجود آمد لصفا دوباره تلاش کنید",
    };
  } finally {
    redirect("/");
  }
};

export const fetchProperties = async ({
  search = "",
  category,
}: {
  search?: string;
  category?: string;
}) => {
  try {
    const properties = await db.property.findMany({
      where: {
        category,
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { tagline: { contains: search, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        tagline: true,
        country: true,
        image: true,
        price: true,
      },
    });

    return properties;
  } catch (error) {
    return null;
  }
};

export const fetchFavoriteId = async ({
  propertyId,
}: {
  propertyId: string;
}) => {
  try {
    const user = await getAuthuser();
    const favoriteid = await db.favorites.findFirst({
      where: {
        propertyId: propertyId,
        profileId: user.id,
      },
      select: {
        id: true,
      },
    });
    return favoriteid?.id;
  } catch (error) {
    return null;
  }
};

export const toggleFavoriteAction = async (prevState: {
  propertyId: string;
  favoriteId: string | null;
}) => {
  const user = await getAuthuser();
  const { propertyId, favoriteId } = prevState;
  try {
    if (favoriteId) {
      await db.favorites.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorites.create({
        data: {
          propertyId,
          profileId: user.id,
        },
      });
    }
    revalidatePath("/");
    return { message: favoriteId ? "Removed from Faves" : "Added to Faves" };
  } catch (error) {
    return null;
  }
};

export const fetchFavorites = async () => {
  const user = await getAuthuser();
  const favorites = await db.favorites.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      property: {
        select: {
          id: true,
          name: true,
          tagline: true,
          country: true,
          price: true,
          image: true,
        },
      },
    },
  });

  return favorites.map((favorite) => favorite.property);
};
