"use client";

import * as React from "react";
import { PostWithRelations } from "@/@types/prisma";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CreatePostComponent } from "@/components/create-post-component";

interface Props {
  className?: string;
}

export const CreatePostModal: React.FC<Props> = ({ className }) => {
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
          <DialogTitle>Create New Post</DialogTitle>
        </VisuallyHidden>

        <CreatePostComponent />
        {/* <PostForm post={post} _onSubmit={onCloseModal} /> */}
      </DialogContent>
    </Dialog>
  );
};
