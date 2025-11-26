"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all users
export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: "desc",
      },
    });

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    // You can handle the error in various ways:
    // - Return an empty array or a specific error object
    // - Throw a custom error
    // - Log the error to a monitoring service
    throw new Error("Failed to retrieve users from the database.");
  } finally {
    await prisma.$disconnect();
  }
}

// Create new user
interface CreateUserProps {
  name: string;
  email: string;
}

export async function createUser({ name, email }: CreateUserProps) {
  try {
    await prisma.user.create({
      data: {
        name,
        email,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "SERVER ERROR",
    };
  }

  revalidatePath("/users");
}

// Delete single user
export async function deleteUser({ userId }: { userId: string }) {
  try {
    await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "SERVER ERROR",
    };
  }

  revalidatePath("/users");
}
