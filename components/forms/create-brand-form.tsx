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
import { createBrand } from "@/actions/brand.actions";

const newBrandSchema = z.object({
  name: z.string().min(1, { message: "Brand name is required" }),
  brandImg: z.string().optional(),
});

type NewBrandValues = z.infer<typeof newBrandSchema>;

export function CreateBrandForm({ _onSubmit }: { _onSubmit?: VoidFunction }) {
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<NewBrandValues>({
    resolver: zodResolver(newBrandSchema),
    defaultValues: {
      name: "",
      brandImg: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await createBrand(data);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("New brand successfully created");
      _onSubmit?.();
      form.reset();
    }
  });

  const loading = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-lg md:text-xl leading-none font-semibold">
          Add new brand
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
                <FormLabel>Brand Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Brand Name"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brandImg"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Brand Image</FormLabel>
                <FormControl>
                  {/* TODO: https://dev.to/oliwier965/nextjs-image-upload-with-zod-validation-38cf */}
                  <Input
                    type="file"
                    disabled={loading}
                    {...fieldProps}
                    accept="image/png, image/jpeg, image/jpg, image/svg"
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
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
