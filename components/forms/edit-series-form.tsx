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
import { editSeries } from "@/actions/series.actions";
import { getBrands } from "@/actions/brand.actions";
import { SeriesWithRelations } from "@/@types/prisma";

const editSeriesSchema = z.object({
  name: z.string().min(1, { message: "Series name is required" }),
  brandId: z.string().nonempty("Please select brand"),
  id: z.string().min(1, { message: "Series ID is required" }),
});

type EditSeriesValues = z.infer<typeof editSeriesSchema>;

interface Props {
  singleSeries: SeriesWithRelations;
  _onSubmit?: VoidFunction;
}

export function EditSeriesForm({ singleSeries, _onSubmit }: Props) {
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

  const form = useForm<EditSeriesValues>({
    resolver: zodResolver(editSeriesSchema),
    defaultValues: {
      name: singleSeries.name,
      brandId: String(singleSeries.brandId),
      id: String(singleSeries.id),
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await editSeries(data);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Series successfully updated");
      _onSubmit?.();
    }
  });

  const loading = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-lg leading-none font-semibold md:text-xl">
          Edit series
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
