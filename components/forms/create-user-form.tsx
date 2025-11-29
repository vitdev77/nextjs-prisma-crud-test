"use client";

import * as React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoadingButton } from "@/components/loading-button";
import { toast } from "sonner";
import { createUser, getUsers } from "@/actions/user.actions";

const newUserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email("Invalid email address provided"),
});

type NewUserValues = z.infer<typeof newUserSchema>;

export function CreateUserForm({ _onSubmit }: { _onSubmit?: VoidFunction }) {
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<NewUserValues>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await createUser(data);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("New user successfully created");
      _onSubmit?.();
      form.reset();
    }
  });

  const loading = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-lg md:text-xl leading-none font-semibold">
          Add new user
        </h2>
        <p className="text-xs md:text-sm text-muted-foreground">
          Fill all form fields. Click button below when you&apos;re done.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email here..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div role="alert" className="text-destructive text-sm">
              {error}
            </div>
          )}

          <LoadingButton type="submit" className="w-full" loading={loading}>
            Submit
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
