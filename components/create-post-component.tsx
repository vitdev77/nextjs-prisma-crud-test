import { PostWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";
import { CreatePostForm } from "@/components/forms";

interface Props {
  className?: string;
  _onSubmit?: VoidFunction;
}

export function CreatePostComponent({ className, _onSubmit }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <CreatePostForm _onSubmit={_onSubmit} />
    </div>
  );
}
