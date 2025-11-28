import { PostWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";
import { EditPostForm } from "@/components/forms";

interface Props {
  post: PostWithRelations;
  _onSubmit?: VoidFunction;
  className?: string;
}

export function EditPostComponent({ post, _onSubmit, className }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <EditPostForm post={post} _onSubmit={_onSubmit} />
    </div>
  );
}
