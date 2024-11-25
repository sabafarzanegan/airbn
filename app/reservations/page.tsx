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
import Image from "next/image";

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
          <TableHead className="px-0 text-right">تصویر</TableHead>
          <TableHead className="px-0 text-right">اسم</TableHead>
          <TableHead className="px-0 text-right">شهر</TableHead>
          <TableHead className="px-0 text-right">تاریخ ورود</TableHead>
          <TableHead className="px-0 text-right">تاریخ خروج</TableHead>
          <TableHead className="px-0 text-right">شب</TableHead>
          <TableHead className="px-0 text-right">هزینه کل</TableHead>
          <TableHead className="px-0 text-right">رزرو شده با نام</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservations.map((reservation) => (
          <TableRow>
            <TableCell>
              <Image
                src={reservation.property.image}
                alt={reservation.property.name}
                width={100}
                height={100}
                className="w-20 rounded-md"
              />
            </TableCell>
            <TableCell>{reservation.property.name.substring(0, 20)}</TableCell>
            <TableCell>{reservation.property.country}</TableCell>
            <TableCell>{reservation.checkIn}</TableCell>
            <TableCell>{reservation.checkOut}</TableCell>
            <TableCell>{convertToFarsi(reservation.totalNights)}</TableCell>
            <TableCell>{convertToFarsi(reservation.orderTotal)}</TableCell>
            <TableCell>
              <p>{reservation.profile.lastName}</p>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default page;
