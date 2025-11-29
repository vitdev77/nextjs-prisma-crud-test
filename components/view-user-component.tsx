import { UserWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";
import { PostsByUserList } from "@/components/lists/posts-by-user-list";
import { UserPostsProvider } from "@/components/providers";

interface Props {
  user: UserWithRelations;
  className?: string;
}

export function ViewUserComponent({ user, className }: Props) {
  return (
    <div className={cn("space-y-2", className)}>
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="text-muted-foreground">by {user.email}</p>
      <PostsByUserList userId={String(user.id)} />
      <UserPostsProvider
        userId={String(user.id)}
        className="text-xs text-muted-foreground text-center bg-muted p-2 rounded"
      >
        UserPostsProvider Test
      </UserPostsProvider>
    </div>
  );
}
