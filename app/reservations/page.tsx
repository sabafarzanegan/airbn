import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchReservations } from "@/lib/actions/formAction";
import { convertToFarsi } from "@/lib/utils";

import Link from "next/link";

async function page() {
  const reservations = await fetchReservations();
  console.log(reservations);

  if (!reservations.length) {
    return <h1>هیچ آگهی از شما رزرو نشده است</h1>;
  }

  return (
    <Table dir="rtl">
      <TableHeader className="w-full">
        <TableRow>
          <TableHead className="px-0 text-right">اسم</TableHead>
          <TableHead className="px-0 text-right">شهر</TableHead>
          <TableHead className="px-0 text-right">تاریخ ورود</TableHead>
          <TableHead className="px-0 text-right">تاریخ خروج</TableHead>
          <TableHead className="px-0 text-right">شب</TableHead>
          <TableHead className="px-0 text-right">هزینه کل</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.map((reservation) => (
          <TableRow>
            <TableCell>{reservation.property.name.substring(0, 20)}</TableCell>
            <TableCell>{reservation.property.country}</TableCell>
            <TableCell>{reservation.checkIn}</TableCell>
            <TableCell>{reservation.checkOut}</TableCell>
            <TableCell>{convertToFarsi(reservation.totalNights)}</TableCell>
            <TableCell>{convertToFarsi(reservation.orderTotal)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default page;
