"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { propertySchema } from "@/lib/schema";
import { Input } from "../ui/input";
import SelectCategory from "./SelectCategory";
import { Textarea } from "../ui/textarea";
import { cityType } from "@/lib/Type";
import SelectedContry from "./SelectedContries";
import ConterInput from "./ConterInput";
import { Button } from "../ui/button";
import { createPropertyAction } from "@/lib/actions/formAction";
import { useState } from "react";
import { UploadImameInSupabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import { Label } from "../ui/label";

function PropertyForm({ city }: { city: cityType[] }) {
  const [image, setImage] = useState({
    file: {
      name: "",
      lastModified: 0,
      lastModifiedDate: "",
      webkitRelativePath: "",
      size: 0,
      type: "",
    },
  });

  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: "",
      tagline: "",
      price: 0,
      category: "",
      description: "",
      country: "",
      guests: 0,
      bedrooms: 0,
      beds: 0,
      baths: 0,
      amenities: "",
    },
  });
  async function onSubmit(values: z.infer<typeof propertySchema>) {
    try {
      if (!image.file.name) {
        toast({
          description: "حتما عکسی انتخاب کنید",
        });
        return;
      }
      const path = await UploadImameInSupabase(image.file);

      const data = await createPropertyAction(values, path);
      console.log(data.success);

      if (data.success) {
        toast({ description: "آگهی شما با موفقیت ثبت شد" });
      } else {
        toast({ description: data.message });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عنوان</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tagline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>برچسب</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>قیمت</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>دسته بندی</FormLabel>
                <FormControl>
                  <SelectCategory {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>انتخاب شهر</FormLabel>
                <FormControl>
                  <SelectedContry city={city} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel>توضیحات</FormLabel>
              <FormControl>
                <Textarea className=" min-h-[200px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormControl>
                <ConterInput detail="مهمان" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bedrooms"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormControl>
                <ConterInput detail="اتاق" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="beds"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormControl>
                <ConterInput detail="تخت" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="baths"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormControl>
                <ConterInput detail="حمام" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amenities"
          render={({ field }) => (
            <FormItem className="mt-6 hidden">
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-y-6">
          <Label className="font-bold text-xl" htmlFor="image">
            تصویر خود را وارد کنید
          </Label>
          <Input
            id="image"
            name="image"
            onChange={(e) => {
              const file = e.target.files[0];

              setImage({ file });
            }}
            type="file"
          />
        </div>

        <Button
          disabled={form.formState.isSubmitting}
          className="w-full"
          type="submit">
          {form.formState.isSubmitting ? "...در حال ارسال" : "ارسال"}
        </Button>
      </form>
    </Form>
  );
}

export default PropertyForm;
