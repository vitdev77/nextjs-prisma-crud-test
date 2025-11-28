import { PostWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";

interface Props {
  post: PostWithRelations;
  className?: string;
}

export function EditPostComponent({ post, className }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      EditPostComponent: #{post.id}
    </div>
  );
}
