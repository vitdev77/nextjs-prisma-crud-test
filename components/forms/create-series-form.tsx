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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoadingButton } from "@/components/loading-button";
import { toast } from "sonner";
import { createSeries } from "@/actions/series.actions";
import { getBrands } from "@/actions/brand.actions";
// import { BrandsCombobox } from "@/components/brands-combobox";

const newSeriesSchema = z.object({
  name: z.string().min(1, { message: "Series name is required" }),
  brandId: z.string().nonempty("Please select brand"),
});

type NewSeriesValues = z.infer<typeof newSeriesSchema>;

export function CreateSeriesForm({ _onSubmit }: { _onSubmit?: VoidFunction }) {
  const [brands, setBrands] = React.useState<
    { id: number; name: string | null }[]
  >([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function getAllBrands() {
      const fetchBrandsData = await getBrands();
      setBrands(fetchBrandsData);
    }
    getAllBrands();
  }, []);

  const form = useForm<NewSeriesValues>({
    resolver: zodResolver(newSeriesSchema),
    defaultValues: {
      name: "",
      brandId: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await createSeries(data);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("New series successfully created");
      _onSubmit?.();
      form.reset();
    }
  });

  const loading = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-lg leading-none font-semibold md:text-xl">
          Add new series
        </h2>
        <p className="text-muted-foreground text-xs md:text-sm">
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
                <FormLabel>Series Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Series Name"
                    disabled={loading || brands.length === 0}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brandId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={loading}
                    {...field}
                  >
                    <FormControl>
                      <SelectTrigger
                        className="w-full"
                        disabled={loading || brands.length === 0}
                      >
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Brands</SelectLabel>
                        {brands.map((brand) => (
                          <SelectItem
                            className="flex justify-between gap-2"
                            key={brand.id}
                            value={String(brand.id)}
                          >
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* TODO: Need to work later */}
          {/* <BrandsCombobox isPending={brands.length === 0} /> */}

          {error && (
            <div role="alert" className="text-destructive text-sm">
              {error}
            </div>
          )}

          <LoadingButton
            type="submit"
            className="w-full"
            loading={loading}
            disabled={brands.length === 0}
          >
            Submit
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
