import { PostWithRelations } from "@/@types/prisma";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export function EditPostComponent({ className }: Props) {
  return <div className={cn("space-y-2", className)}>EditPostComponent</div>;
}
