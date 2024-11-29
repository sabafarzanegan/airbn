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
import SelectCategory from "../form/SelectCategory";
import { Textarea } from "../ui/textarea";
import { cityType, propertyType } from "@/lib/Type";
import SelectedContry from "../form/SelectedContries";
import ConterInput from "../form/ConterInput";
import { Button } from "../ui/button";
import { updatePropertyAction } from "@/lib/actions/formAction";
import { toast } from "@/hooks/use-toast";

function Editform({
  city,
  property,
  id,
}: {
  city: cityType[];
  property: propertyType;
  id: string | undefined;
}) {
  console.log(property);

  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: property.name,
      tagline: property.tagline,
      price: property.price,
      category: property.category,
      description: property.description,
      country: property.country,
      guests: property.guests,
      bedrooms: property.bedrooms,
      beds: property.beds,
      baths: property.baths,
      amenities: property.amenities,
    },
  });
  async function onSubmit(values: z.infer<typeof propertySchema>) {
    console.log(values);
    try {
      const res = await updatePropertyAction(values, id);
      if (res?.success) {
        toast({
          description: res.message,
        });
      }
    } catch (error) {}
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

        <Button
          disabled={form.formState.isSubmitting}
          className="w-full"
          type="submit">
          {form.formState.isSubmitting ? "در حال ارسال" : "تغییر"}
        </Button>
      </form>
    </Form>
  );
}

export default Editform;
