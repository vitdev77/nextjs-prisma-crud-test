import { cn } from "@/lib/utils";
import { CreateUserForm } from "@/components/forms";

interface Props {
  className?: string;
  _onSubmit?: VoidFunction;
}

export function CreateUserComponent({ className, _onSubmit }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <CreateUserForm _onSubmit={_onSubmit} />
    </div>
  );
}
