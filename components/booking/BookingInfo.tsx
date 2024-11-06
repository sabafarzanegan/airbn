"use client";

import { convertToFarsi } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

type propstype = {
  checkIn: string | undefined;
  checkOut: string | undefined;
  orderTotal: number | undefined;
  totalNights: number | undefined;
};
function BookingInfo({
  checkIn,
  checkOut,
  orderTotal,
  totalNights,
}: propstype) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>شما این مکان را با مشخصات زیر رزرو کردید</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-lg">تاریخ ورود</span>
          <span className="font-semibold ">{checkIn}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg">تاریخ خروج</span>
          <span className="font-semibold ">{checkOut}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg">تعداد شب</span>
          <span className="font-semibold ">
            {convertToFarsi(totalNights)} شب
          </span>
        </div>
        <Separator />
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg">هزینه کل</span>
          <span className="font-semibold ">
            {convertToFarsi(orderTotal)}
            <span className="px-1">تومان</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default BookingInfo;
