import { PostWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";

interface Props {
  post: PostWithRelations;
  className?: string;
}

export function ViewPostComponent({ post, className }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="text-muted-foreground">by {post.author.name}</p>
      <div className="p-4 border border-dashed rounded-lg">{post.content}</div>
      {/* <pre className="whitespace-pre font-mono text-xs text-muted-foreground bg-muted p-4 rounded-lg w-full">
        {JSON.stringify(post, null, 2)}
      </pre> */}
    </div>
  );
}
