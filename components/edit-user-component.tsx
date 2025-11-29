import { UserWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";
import { EditUserForm } from "@/components/forms";

interface Props {
  user: UserWithRelations;
  _onSubmit?: VoidFunction;
  className?: string;
}

export function EditUserComponent({ user, _onSubmit, className }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <EditUserForm user={user} _onSubmit={_onSubmit} />
    </div>
  );
}
