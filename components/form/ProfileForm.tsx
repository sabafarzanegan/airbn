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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

import { ReloadIcon } from "@radix-ui/react-icons";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { updateProfileAction } from "@/lib/actions/formAction";
type ProfileProps = {
  firstName: string | undefined;
  lastName: string | undefined;
  username: string | undefined;
};
function ProfileForm({ firstName, lastName, username }: ProfileProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof createProfileSchema>>({
    resolver: zodResolver(createProfileSchema),
    defaultValues: {
      username: username,
      lastName: lastName,
      firstName: firstName,
    },
  });
  async function onSubmit(values: z.infer<typeof createProfileSchema>) {
    const result = await updateProfileAction(values);

    if (result.success) {
      toast({ description: result.message });
    } else {
      toast({ description: result.message });
    }
  }
  return (
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
            "ذخیره تغییرات"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default ProfileForm;
