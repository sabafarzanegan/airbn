"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createProfileSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createProfileAction } from "@/lib/actions/formAction";
import { useToast } from "@/hooks/use-toast";

import { ReloadIcon } from "@radix-ui/react-icons";

function page() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof createProfileSchema>>({
    resolver: zodResolver(createProfileSchema),
    defaultValues: {
      username: "",
      lastName: "",
      firstName: "",
    },
  });
  async function onSubmit(values: z.infer<typeof createProfileSchema>) {
    // console.log(values);

    const result = await createProfileAction(values);
    if (result.success) {
      toast({ description: result.message });
    } else {
      toast({ description: result.message });
    }
  }
  return (
    <Card className="p-10 bg-transparent mt-5">
      <Form {...form}>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام</FormLabel>
                <FormControl>
                  <Input id="firstName" placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام خانوادگی</FormLabel>
                <FormControl>
                  <Input id="lastName" placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>نام کاربری</FormLabel>
                <FormControl>
                  <Input id="username" placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="mt-8 px-3">
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-x-4">
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                صبر کنید
              </span>
            ) : (
              "ساختن"
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
}

export default page;
