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

async function page() {
  const bookings = await fetchUserBookings();
  console.log(bookings);

  if (!bookings?.length) {
    return <h1> موردی وجود ندارد</h1>;
  }

  return (
    <Table>
      <TableHeader className="">
        <TableRow className="flex items-center justify-between">
          <TableHead>تصویر</TableHead>
          <TableHead>اسم</TableHead>
          <TableHead>شهر</TableHead>
          <TableHead>تاریخ ورود</TableHead>
          <TableHead>تاریخ خروج</TableHead>
          <TableHead>شب</TableHead>
          <TableHead>هزینه کل</TableHead>
          <TableHead>حذف</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow className="flex items-center justify-between">
            <TableCell className="p-0">
              <Image
                src={booking.property.image}
                alt=""
                width={100}
                height={100}
                className="w-12 h-12 rounded-md"
              />
            </TableCell>
            <TableCell className="p-0">
              {booking.property.name.substring(0, 20)}
            </TableCell>
            <TableCell className="p-0">{booking.property.country}</TableCell>
            <TableCell className="p-0">{booking.checkIn}</TableCell>
            <TableCell className="p-0">{booking.checkOut}</TableCell>
            <TableCell className="p-0">
              {convertToFarsi(booking.totalNights)}
            </TableCell>
            <TableCell className="p-0">
              {convertToFarsi(booking.orderTotal)}
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
