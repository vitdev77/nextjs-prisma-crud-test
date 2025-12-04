import { SeriesWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";
import { EditSeriesForm } from "@/components/forms";

interface Props {
  singleSeries: SeriesWithRelations;
  _onSubmit?: VoidFunction;
  className?: string;
}

export function EditSeriesComponent({
  singleSeries,
  _onSubmit,
  className,
}: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <EditSeriesForm singleSeries={singleSeries} _onSubmit={_onSubmit} />
    </div>
  );
}
