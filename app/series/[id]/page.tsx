import { Metadata } from "next";
import { getSeriesById } from "@/actions/series.actions";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";
import { ViewSeriesComponent } from "@/components/view-series-component";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "View single series",
};

export default async function SeriesPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const { id } = params;

  const singleSeries = await getSeriesById({ seriesId: id });

  if (!singleSeries) {
    notFound();
  }

  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center gap-6">
      <ReturnButton
        btnVariant={"link"}
        href={"/series"}
        label="All Series Page"
      />
      <Card>
        <CardContent>
          <ViewSeriesComponent singleSeries={singleSeries} />
        </CardContent>
      </Card>
    </div>
  );
}
