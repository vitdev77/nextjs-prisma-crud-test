"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Get all posts
export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    // You can handle the error in various ways:
    // - Return an empty array or a specific error object
    // - Throw a custom error
    // - Log the error to a monitoring service
    throw new Error("Failed to retrieve posts from the database.");
  } finally {
    // Optional: Disconnect Prisma Client after the operation
    await prisma.$disconnect();
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
  } catch (err) {
    console.error("Error fetching post:", err);
    throw new Error("Failed to retrieve post from the database.");
  } finally {
    // Optional: Disconnect Prisma Client after the operation
    await prisma.$disconnect();
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
      error: "SERVER ERROR",
    };
  }

  revalidatePath("/posts");
  // redirect("/posts");
}

// Edit single post
export async function editPost({
  postId,
  title,
  content,
}: {
  postId: string;
  title: string;
  content: string;
}) {
  try {
    await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        title,
        content,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "SERVER ERROR",
    };
  }

  revalidatePath("/posts");
}

// Delete single post
export async function deletePost({ postId }: { postId: string }) {
  try {
    await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "SERVER ERROR",
    };
  }

  revalidatePath("/posts");
}
