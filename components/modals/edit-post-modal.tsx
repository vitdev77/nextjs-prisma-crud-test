"use client";

import * as React from "react";
import { PostWithRelations } from "@/@types/prisma";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { EditPostComponent } from "@/components/edit-post-component";

interface Props {
  // post: PostWithRelations;
  className?: string;
}

export const EditPostModal: React.FC<Props> = ({ className }) => {
  const router = useRouter();

  const onCloseModal = () => {
    router.back();
  };
  return (
    <Dialog open={true} onOpenChange={onCloseModal}>
      <DialogContent
        aria-describedby={undefined}
        className={cn("sm:max-w-[425px]", className)}
      >
        <VisuallyHidden>
          <DialogTitle>Edit Post Modal</DialogTitle>
        </VisuallyHidden>

        <EditPostComponent />
      </DialogContent>
    </Dialog>
  );
};
