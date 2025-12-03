import { BrandWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";
import { SeriesByBrandList } from "@/components/lists/series-by-brand-list";

interface Props {
  brand: BrandWithRelations;
  className?: string;
}

export function ViewBrandComponent({ brand, className }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <h2 className="text-2xl font-bold">{brand.name}</h2>
      <SeriesByBrandList brandId={String(brand.id)} />
    </div>
  );
}
