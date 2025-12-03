import { SeriesWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";
import { ProductsBySeriesList } from "@/components/lists/products-by-series-list";

interface Props {
  singleSeries: SeriesWithRelations;
  className?: string;
}

export function ViewSeriesComponent({ singleSeries, className }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <h2 className="text-2xl font-bold">{singleSeries.name}</h2>
      <p className="text-muted-foreground">from {singleSeries.brand.name}</p>
      <ProductsBySeriesList seriesId={String(singleSeries.id)} />
    </div>
  );
}
