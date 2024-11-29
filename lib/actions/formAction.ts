"use server";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { createProfileType, FIleImage, propertyType } from "../Type";
import db from "../db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { formatDate } from "date-fns";

export const createProfileAction = async (formData: createProfileType) => {
  try {
    const user = await currentUser();

    const existingUser = await checkUserInDb();
    if (existingUser === user?.emailAddresses[0].emailAddress) {
      return;
    } else {
      if (user) {
        const newUser = await db.profile.create({
          data: {
            clerkId: user.id,
            email: user?.emailAddresses[0].emailAddress,
            profileImage: user?.imageUrl,
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
          },
        });
      }

      await clerkClient.users.updateUserMetadata(user?.id as string, {
        privateMetadata: { hasProfile: true },
      });
    }

    return { success: true, message: "حساب کاربری با موفقیت ساخته شد" };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "مشکلی به وجود آمد",
    };
  } finally {
    redirect("/");
  }
};

export const checkUserInDb = async () => {
  const user = await currentUser();

  if (user) {
    const founduser = await db.profile.findFirst({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
      select: {
        email: true,
      },
    });

    return founduser;
  }
};

export const fetchImageUser = async () => {
  try {
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
  } catch (error) {
    return null;
  }
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
  console.log(formData);

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
    revalidatePath(
      `/profile?firstName=${formData.firstName}&lastName=${formData.lastName}&username=${formData.username}`
    );
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
  console.log(data);

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
  formData: propertyType,
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
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(properties);
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
  favoriteId: string | null | undefined;
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
      const newFavorit = await db.favorites.create({
        data: {
          propertyId,
          profileId: user.id,
        },
      });
    }
  } catch (error) {
  } finally {
    revalidatePath("/");
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

export const fetchPropertyDetail = async (id: string) => {
  try {
    const detail = await db.property.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
        bookings: {
          select: {
            checkIn: true,
            checkOut: true,
          },
        },
      },
    });
    return detail;
  } catch (error) {}
};

export const createReview = async (formData: {
  propertyId: string;
  rating: number;
  comment: string;
}) => {
  console.log(formData);
  try {
    const user = await getAuthuser();
    const newReview = await db.review.create({
      data: {
        profileId: user.id,
        propertyId: formData.propertyId,
        rating: formData.rating,
        comment: formData.comment,
      },
    });
    console.log(newReview);

    revalidatePath(`/property/${formData.propertyId}`);
    return { success: true, message: "نظر شما ثبت شد" };
  } catch (error) {
    console.log(error);

    return { success: false, message: "مشکلی به وجودآمد دوباره تلاش کنید " };
  }
};

export const fetchReviewByProperty = async (propertyId: string) => {
  try {
    const Allreview = await db.review.findMany({
      where: {
        propertyId: propertyId,
      },
      select: {
        rating: true,
        id: true,
        comment: true,
        profile: {
          select: {
            profileImage: true,
            lastName: true,
          },
        },
      },
    });
    return Allreview;
  } catch (error) {
    console.log(error);
  }
};

export const fetchReviewByuser = async () => {
  const user = await getAuthuser();
  try {
    const reviews = await db.review.findMany({
      where: {
        profileId: user.id,
      },
      select: {
        id: true,
        rating: true,
        comment: true,
        property: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return reviews;
  } catch (error) {
    console.log(error);
  }
};

export const deletReview = async (id: string) => {
  const user = await getAuthuser();
  try {
    const deletedReview = await db.review.delete({
      where: {
        profileId: user.id,
        id: id,
      },
    });
    console.log(deletReview);
    revalidatePath("/reviews");
    return { success: true, message: "نظر شما حدف شد" };
  } catch (error) {
    console.log(error);
  }
};

export async function fetchPropertyRating(propertyId: string) {
  try {
    const result = await db.review.groupBy({
      by: ["propertyId"],
      _avg: {
        rating: true,
      },
      _count: {
        rating: true,
      },
      where: {
        propertyId,
      },
    });
    return {
      rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
      count: result[0]?._count.rating ?? 0,
    };
  } catch (error) {
    return { rating: 0, count: 0 };
  }
}

export const createBookingAction = async ({
  propertyId,
  checkIn,
  checkOut,
  orderTotal,
  totalNights,
}: {
  propertyId: string;
  checkIn: string;
  checkOut: string;
  orderTotal: number;
  totalNights: number;
}) => {
  console.log(propertyId, checkIn, checkOut, orderTotal, totalNights);
  try {
    const user = await getAuthuser();
    const newBookings = await db.booking.create({
      data: {
        checkIn,
        checkOut,
        propertyId,
        orderTotal,
        totalNights,
        profileId: user.id,
      },
    });
    window.location.reload();

    revalidatePath(`/properties/${propertyId}`);
  } catch (error) {
    console.log(error);
  } finally {
    redirect("/bookings");
  }
};

export const fetchBookingByPropertIdUser = async (propertyId: string) => {
  const user = await getAuthuser();
  try {
    const specialBooking = await db.booking.findFirst({
      where: {
        propertyId: propertyId,
        profileId: user.id,
      },
      select: {
        checkIn: true,
        checkOut: true,
        orderTotal: true,
        totalNights: true,
      },
    });
    console.log(specialBooking);
    return specialBooking;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserBookings = async () => {
  try {
    const user = await getAuthuser();
    const allBookings = await db.booking.findMany({
      where: {
        profileId: user.id,
      },
      include: {
        property: {
          select: {
            id: true,
            name: true,
            country: true,
            image: true,
          },
        },
      },
    });
    console.log(allBookings);
    return allBookings;
  } catch (error) {}
};

export const deleteBookingAction = async ({
  bookingId,
}: {
  bookingId: string;
}) => {
  try {
    const user = await getAuthuser();
    const deletedBooking = await db.booking.delete({
      where: {
        id: bookingId,
        profileId: user.id,
      },
    });
    console.log(deletedBooking);
    revalidatePath("/bookings");
    return { success: true, message: "رزرو شما باموفقیت لغو شد" };
  } catch (error) {
    console.log(error);
  }
};

export const fetchRentals = async () => {
  const user = await getAuthuser();
  const rentals = await db.property.findMany({
    where: {
      profileId: user.id,
    },
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
    },
  });

  const rentalsWithBookingSums = await Promise.all(
    rentals.map(async (rental) => {
      const totalNightsSum = await db.booking.aggregate({
        where: {
          propertyId: rental.id,
        },
        _sum: {
          totalNights: true,
        },
      });

      const orderTotalSum = await db.booking.aggregate({
        where: {
          propertyId: rental.id,
        },
        _sum: {
          orderTotal: true,
        },
      });

      return {
        ...rental,
        totalNightsSum: totalNightsSum._sum.totalNights,
        orderTotalSum: orderTotalSum._sum.orderTotal,
      };
    })
  );

  return rentalsWithBookingSums;
};

export const deletRental = async ({ propertyId }: { propertyId: string }) => {
  console.log(propertyId);
  try {
    const user = await getAuthuser();
    const deletedPropery = await db.property.delete({
      where: {
        id: propertyId,
        profileId: user.id,
      },
    });
    revalidatePath("/rentals");
  } catch (error) {}
};

export const fetchReservations = async () => {
  const user = await getAuthuser();

  const reservations = await db.booking.findMany({
    where: {
      property: {
        profileId: user.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      property: {
        select: {
          id: true,
          name: true,
          price: true,
          image: true,
          country: true,
        },
      },
      profile: true,
    },
  });
  return reservations;
};

export const getAdminUser = async () => {
  const user = await getAuthuser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
  return user;
};

export const fetchStats = async () => {
  await getAdminUser();

  const usersCount = await db.profile.count();
  const propertiesCount = await db.property.count();
  const bookingsCount = await db.booking.count({
    where: {
      paymentStatus: false,
    },
  });

  return {
    usersCount,
    propertiesCount,
    bookingsCount,
  };
};

export const fetchChartsData = async () => {
  await getAdminUser();
  const date = new Date();
  date.setMonth(date.getMonth() - 6);
  const sixMonthsAgo = date;

  const bookings = await db.booking.findMany({
    where: {
      createdAt: {
        gte: sixMonthsAgo,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  const bookingsPerMonth = bookings.reduce((total, current) => {
    const date = formatDate(current.createdAt, true);
    const existingEntry = total.find((entry) => entry.date === date);
    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      total.push({ date, count: 1 });
    }
    return total;
  }, [] as Array<{ date: string; count: number }>);
  return bookingsPerMonth;
};

export const fetchRentalDetails = async (propertyId: string) => {
  const user = await getAuthuser();

  return db.property.findUnique({
    where: {
      id: propertyId,
      profileId: user.id,
    },
  });
};

export const updatePropertyAction = async ({
  formatDate,
  id,
}: {
  formatDate: propertyType;
  id: string;
}) => {
  const user = await getAuthuser();
  console.log(formatDate);
  try {
    const updatedProperty = await db.property.update({
      where: {
        profileId: user.id,
        id: id,
      },
      data: {
        ...formatDate,
      },
    });
    console.log(updatedProperty);

    revalidatePath(`/rentals/${id}/edit`);
    return { success: true, message: "آگهی با موفقیت تغییر کرد" };
  } catch (error) {
    console.log(error);
  }
};

export const uploadImage = async (data: string, id: string | undefined) => {
  const user = await getAuthuser();
  try {
    await db.property.update({
      where: {
        id: id,
        profileId: user.id,
      },
      data: {
        image: data,
      },
    });
    revalidatePath(`/rentals/${id}/edit`);
    return { success: true, message: "تصویر شما با موفقیت تغییر کرد" };
  } catch (error) {
    console.log(error);
  }
};

export const findExistingReview = async (
  userId: string,
  propertyId: string
) => {
  return db.review.findFirst({
    where: {
      profileId: userId,
      propertyId: propertyId,
    },
  });
};
