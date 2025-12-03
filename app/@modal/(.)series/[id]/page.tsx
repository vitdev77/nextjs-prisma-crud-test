import { notFound } from "next/navigation";
import { getSeriesById } from "@/actions/series.actions";
import { ViewSeriesModal } from "@/components/modals/view-series-modal";

export default async function ViewSeriesModalPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const singleSeries = await getSeriesById({ seriesId: id });

  if (!singleSeries) return notFound();

  return <ViewSeriesModal singleSeries={singleSeries} />;
}
