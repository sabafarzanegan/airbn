import Formaction from "@/components/rentals/Fornaction";
import { Button } from "@/components/ui/button";
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
import Image from "next/image";
import Link from "next/link";

async function page() {
  const rentals = await fetchRentals();

  if (!rentals.length) {
    return (
      <div className="flex flex-col gap-y-2 items-center justify-center">
        <h1 className=" font-semibold text-xl">شما آگهی منتشر نکردید</h1>
        <p>
          برای ساختن آگهی خود{" "}
          <Link href="/rentals/create">
            <Button variant="link">کلیک</Button>
          </Link>
          کنید
        </p>
      </div>
    );
  }

  return (
    <Table dir="rtl">
      <TableHeader className="w-full">
        <TableRow>
          <TableHead className="px-0 text-right">تصویر</TableHead>
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
              <Image
                src={rental.image}
                alt={rental.name}
                width={100}
                height={100}
                className="w-20 rounded-md"
              />
            </TableCell>
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
              {convertToFarsi(rental.orderTotalSum || 0)}
              <span className="px-2">تومان</span>
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
