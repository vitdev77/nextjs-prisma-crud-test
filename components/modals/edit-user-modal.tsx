"use client";

import * as React from "react";
import { UserWithRelations } from "@/@types/prisma";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { EditUserComponent } from "@/components/edit-user-component";

interface Props {
  user: UserWithRelations;
  className?: string;
}

export const EditUserModal: React.FC<Props> = ({ user, className }) => {
  const router = useRouter();

  const onCloseModal = () => {
    router.back();
  };
  return (
    <Dialog open={Boolean(user)} onOpenChange={onCloseModal}>
      <DialogContent
        aria-describedby={undefined}
        className={cn("sm:max-w-[425px]", className)}
      >
        <VisuallyHidden>
          <DialogTitle>{user.name} - Edit</DialogTitle>
        </VisuallyHidden>

        <EditUserComponent user={user} _onSubmit={onCloseModal} />
      </DialogContent>
    </Dialog>
  );
};
