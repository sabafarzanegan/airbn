import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useProperty } from "@/lib/store";
import { Separator } from "../ui/separator";
import { convertToFarsi } from "@/lib/utils";
import ConfirbookingmBtn from "./ConfirmBtn";

function Bookingcontainer() {
  const { range, price } = useProperty((state) => state);
  return (
    <Card>
      <CardHeader>
        <CardTitle>مشخصات کلی</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4">
          <p className="flex items-center justify-between">
            <span>زمان اقامت</span>
            <span className="flex items-center gap-x-2">
              {convertToFarsi(range)}
              <span>تومان</span>
            </span>
          </p>
          <p className="flex items-center justify-between">
            <span>قیمت شبی:</span>
            <span className="flex items-center gap-x-2">
              {" "}
              {convertToFarsi(price)}
              <span>تومان</span>
            </span>
          </p>
          <p className="flex items-center justify-between">
            <span>تمیزکاری</span>
            <span className="flex items-center gap-x-2">
              {convertToFarsi(100000)}
              <span>تومان</span>
            </span>
          </p>
        </div>
        <Separator />
        <div className="mt-4">
          <p className="flex items-center justify-between">
            <span
              className="font-semibold
            ">
              مبلغ کل
            </span>
            <span className="flex items-center gap-x-2 font-bold">
              {convertToFarsi(range * price + 100000)}
              <span>تومان</span>
            </span>
          </p>
        </div>
        <ConfirbookingmBtn />
      </CardContent>
    </Card>
  );
}

export default Bookingcontainer;
