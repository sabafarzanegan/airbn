"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { LucideMinus, LucidePlus } from "lucide-react";

import { useFormContext } from "react-hook-form";
type props = {
  detail: string;
  name: string;
};
function ConterInput({ detail, name }: props) {
  const { setValue, getValues } = useFormContext();
  const [count, setCount] = useState(getValues(name) || 0);
  const decreaseCount = () => {
    setCount((prev: number) => {
      const newCount = prev - 1;
      setValue(name, newCount);
      return newCount;
    });
  };
  const increaseCount = () => {
    setCount((prev: number) => {
      const newCount = prev + 1;
      setValue(name, newCount);
      return newCount;
    });
  };
  useEffect(() => {
    setValue(name, count);
  }, [name, count, setValue]);
  return (
    <Card>
      <Input type="hidden" name={detail} value={count} />
      <CardHeader className="flex flex-col gap-y-5">
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex flex-col">
            <h2 className="font-medium capitalize">{detail}</h2>
            <p className="text-muted-foreground text-sm">
              مشخص کنید تعداد {detail}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={decreaseCount}>
              <LucideMinus className="w-5 h-5 text-primary" />
            </Button>
            <span className="text-xl font-bold w-5 text-center">{count}</span>
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={increaseCount}>
              <LucidePlus className="w-5 h-5 text-primary" />
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default ConterInput;
