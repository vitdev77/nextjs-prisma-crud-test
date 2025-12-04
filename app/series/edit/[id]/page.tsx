import { Metadata } from "next";
import { getSeriesById } from "@/actions/series.actions";
import { EditSeriesComponent } from "@/components/edit-series-component";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit single series",
};

export default async function EditSeriesPage(props: {
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
          <EditSeriesComponent singleSeries={singleSeries} />
        </CardContent>
      </Card>
    </div>
  );
}
