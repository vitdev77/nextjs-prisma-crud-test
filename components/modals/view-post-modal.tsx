"use client";

import * as React from "react";
import { PostWithRelations } from "@/@types/prisma";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ViewPostComponent } from "@/components/view-post-component";

interface Props {
  post: PostWithRelations;
  className?: string;
}

export const ViewPostModal: React.FC<Props> = ({ post, className }) => {
  const router = useRouter();

  const onCloseModal = () => {
    router.back();
  };
  return (
    <Dialog open={Boolean(post)} onOpenChange={onCloseModal}>
      <DialogContent
        aria-describedby={undefined}
        className={cn("sm:max-w-[425px]", className)}
      >
        <VisuallyHidden>
          <DialogTitle>{post.title}</DialogTitle>
        </VisuallyHidden>

        <ViewPostComponent post={post} />
      </DialogContent>
    </Dialog>
  );
};
