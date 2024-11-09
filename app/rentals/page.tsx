import Formaction from "@/components/rentals/Fornaction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchRentals } from "@/lib/actions/formAction";
import { convertToFarsi } from "@/lib/utils";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";

async function page() {
  const rentals = await fetchRentals();

  if (!rentals.length) {
    return <h1>شما آگهی منتشر نکردید</h1>;
  }

  return (
    <Table dir="rtl">
      <TableHeader className="w-full">
        <TableRow>
          <TableHead className="px-0 text-right">نام</TableHead>
          <TableHead className="px-0 text-right">قیمت هرشب</TableHead>
          <TableHead className="px-0 text-right">روزهای کرایه شده</TableHead>
          <TableHead className="px-0 text-right">مبلغ پرداخت شده</TableHead>
          <TableHead className="px-0 text-right">حذف</TableHead>
          <TableHead className="px-0 text-right">اصلاح</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rentals.map((rental) => (
          <TableRow>
            <TableCell className="py-4">
              <Link href={`/properties/${rental.id}`}>
                {rental.name.substring(0, 30)}
              </Link>
            </TableCell>
            <TableCell className="py-4">
              {convertToFarsi(rental.price)}تومان
            </TableCell>
            <TableCell className="py-4">
              {convertToFarsi(rental.totalNightsSum || 0)}
            </TableCell>
            <TableCell className="py-4">
              {convertToFarsi(rental.orderTotalSum || 0)}تومان
            </TableCell>
            <TableCell className="py-4">
              <Formaction propertyId={rental.id} />
            </TableCell>
            <TableCell className="py-4">
              <Link href={`/rentals/${rental.id}/edit`}>
                <Edit className="w-5 h-5" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default page;
