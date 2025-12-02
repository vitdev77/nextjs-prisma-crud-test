"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all posts
export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Failed to retrieve posts from the database.");
  }
}

// Get single post
export async function getPostById({ postId }: { postId: string }) {
  try {
    const singlePost = await prisma.post.findFirst({
      where: {
        id: Number(postId),
      },
      include: {
        author: true,
      },
    });

    return singlePost;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error("Failed to retrieve single post from the database.");
  }
}

// Get posts list by User ID
export async function getPostsByUserId({ userId }: { userId: string }) {
  try {
    const postsByUserId = await prisma.post.findMany({
      where: {
        authorId: Number(userId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return postsByUserId;
  } catch (error) {
    console.error("Error fetching posts by user:", error);
    throw new Error("Failed to retrieve posts by user from the database.");
  }
}

// Create new post
export async function createPost({
  title,
  content,
  authorId,
}: {
  title: string;
  content: string;
  authorId: string;
}) {
  try {
    await prisma.post.create({
      data: {
        title,
        content,
        authorId: Number(authorId),
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "[POST_CREATE]: SERVER ERROR",
    };
  }

  revalidatePath("/posts");
}

// Edit single post
export async function editPost({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) {
  try {
    await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "[POST_EDIT]: SERVER ERROR",
    };
  }

  revalidatePath("/posts");
}

// Delete single post
export async function deletePost({ id }: { id: string }) {
  try {
    await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "[POST_DELETE]: SERVER ERROR",
    };
  }

  revalidatePath("/posts");
}
