"use client";

import * as React from "react";
import { SeriesWithRelations } from "@/@types/prisma";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ViewSeriesComponent } from "@/components/view-series-component";

interface Props {
  singleSeries: SeriesWithRelations;
  className?: string;
}

export const ViewSeriesModal: React.FC<Props> = ({
  singleSeries,
  className,
}) => {
  const router = useRouter();

  const onCloseModal = () => {
    router.back();
  };
  return (
    <Dialog open={Boolean(singleSeries)} onOpenChange={onCloseModal}>
      <DialogContent
        aria-describedby={undefined}
        className={cn("sm:max-w-[425px]", className)}
      >
        <VisuallyHidden>
          <DialogTitle>{singleSeries.name} - View</DialogTitle>
        </VisuallyHidden>

        <ViewSeriesComponent singleSeries={singleSeries} />
      </DialogContent>
    </Dialog>
  );
};
