"use client";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useEffect, useState } from "react";
import "react-multi-date-picker/styles/layouts/mobile.css";
import InputIcon from "react-multi-date-picker/components/input_icon";
import "react-multi-date-picker/styles/colors/teal.css";
import { Calendar1Icon } from "lucide-react";
import { useProperty } from "@/lib/store";
import { calculateDateDifference } from "@/lib/utils";

export default function Bookingcalendar({
  propertyId,
  price,
}: {
  propertyId: string;
  price: number;
}) {
  const { bookings, range } = useProperty((state) => state);

  const [date, setDate] = useState([]);
  useEffect(() => {
    if (date.length === 2) {
      useProperty.setState({
        bookings: [{ checkIn: date[0], checkOut: date[1] }],
      });
      console.log(date);
      const range = calculateDateDifference(date);

      useProperty.setState({ range: range + 1 });
      useProperty.setState({
        price: price,
        propertyId: propertyId,
      });
    }
  }, [date, propertyId, price]);
  // useEffect(() => {
  //   console.log("Updated bookings:", bookings);
  //   console.log("Updated range:", range);
  // }, [bookings]);

  useEffect(() => {
    useProperty.setState({
      propertyId: propertyId,
      price: price,
      bookings: [{ checkIn: "", checkOut: "" }],
      range: 0,
    });
  }, [propertyId]);
  return (
    <>
      <div className="space-y-3 ">
        <h2 className="font-semibold flex items-center">
          <Calendar1Icon className="h-5 text-primary font-bold" />
          <span className="px-2">
            برای رزرو این مکان تاریخ سفر خود را انتخاب کنید
          </span>
        </h2>
        <DatePicker
          mapDays={({ date }) => {
            let props = {};
            let isWeekend = [0, 6].includes(date.weekDay.index);
            if (isWeekend) props.className = "highlight highlight-red";
            return props;
          }}
          render={<InputIcon />}
          value={date}
          onChange={(selectedDate) => {
            if (Array.isArray(selectedDate)) {
              setDate(selectedDate.map((d) => d.format("YYYY/MM/DD")));
            } else {
              setDate(selectedDate.format("YYYY/MM/DD"));
            }
          }}
          range
          calendar={persian}
          locale={persian_fa}
          format="YYYY/MM/DD"
          className="rmdp-mobile teal "
          dateSeparator=" تا "
          rangeHover
        />
      </div>
    </>
  );
}
