import DeleteBooking from "@/components/booking/DeleteBooking";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchUserBookings } from "@/lib/actions/formAction";
import { convertToFarsi } from "@/lib/utils";

import Image from "next/image";
import Link from "next/link";

async function page() {
  const bookings = await fetchUserBookings();

  if (!bookings?.length) {
    return (
      <h1 className="text-center font-semibold text-xl ">
        شما مکانی را رزرو نکردید.
      </h1>
    );
  }

  return (
    <Table dir="rtl">
      <TableHeader className="w-full">
        <TableRow>
          <TableHead className="px-0 text-right">تصویر</TableHead>
          <TableHead className="px-0 text-right">اسم</TableHead>
          <TableHead className="px-0 text-right">شهر</TableHead>
          <TableHead className="px-0 text-right">تاریخ ورود</TableHead>
          <TableHead className="px-0 text-right">تاریخ خروج</TableHead>
          <TableHead className="px-0 text-right">شب</TableHead>
          <TableHead className="px-0 text-right">هزینه کل</TableHead>
          <TableHead className="px-0 text-right">حذف</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow>
            <TableCell>
              <Link href={`/properties/${booking.propertyId}`}>
                <Image
                  src={booking.property.image}
                  alt=""
                  width={100}
                  height={100}
                  className="w-12 h-12 rounded-md"
                />
              </Link>
            </TableCell>
            <TableCell>{booking.property.name.substring(0, 20)}</TableCell>
            <TableCell>{booking.property.country}</TableCell>
            <TableCell>{booking.checkIn}</TableCell>
            <TableCell>{booking.checkOut}</TableCell>
            <TableCell>{convertToFarsi(booking.totalNights)}</TableCell>
            <TableCell>
              {convertToFarsi(booking.orderTotal)}
              <span className="px-1">تومان</span>
            </TableCell>
            <TableCell>
              <DeleteBooking bookingId={booking.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default page;
