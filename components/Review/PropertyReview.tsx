"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { reviewSchema } from "@/lib/schema";
import { createReview } from "@/lib/actions/formAction";

function PropertyReview({ propertyId }: { propertyId: string }) {
  const [isShowReview, setIsShowReview] = useState(false);
  const Rating = Array.from({ length: 5 }, (_, i) => {
    const value = i + 1;
    return value.toString();
  }).reverse();
  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      propertyId: propertyId,
      comment: "",
      rating: 5,
    },
  });

  function onSubmit(values: z.infer<typeof reviewSchema>) {
    console.log(values);
    createReview(values);
  }

  return (
    <>
      <Button
        onClick={() => {
          setIsShowReview((prev) => !prev);
        }}>
        نظر دهید
      </Button>
      {isShowReview && (
        <Card>
          <CardHeader>
            <CardTitle>نظر بدید و امتیازخودراثبت کنید</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4">
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>امتیاز</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value.toString()}
                          onValueChange={field.onChange}
                          name="rating"
                          defaultValue="5">
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {Rating.map((num) => (
                                <SelectItem value={num} key={num}>
                                  {num}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>امتیاز</FormLabel>
                      <FormControl>
                        <Textarea rows={5} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">ارسال</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default PropertyReview;
