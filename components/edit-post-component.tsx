import { PostWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";

interface Props {
  post: PostWithRelations;
  className?: string;
}

export function EditPostComponent({ post, className }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="text-destructive text-lg font-medium">
        EditPostComponent: #{post.id}
      </div>
      <pre className="whitespace-pre font-mono text-xs text-muted-foreground bg-muted p-4 rounded-lg w-full">
        {JSON.stringify(post, null, 2)}
      </pre>
      {/* Edit Post Form Here */}
    </div>
  );
}
