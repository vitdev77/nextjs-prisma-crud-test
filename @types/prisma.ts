import { Post, User } from "@/generated/prisma/client";

export type PostWithRelations = Post & {
  author: User;
};

export type UserWithRelations = User;
