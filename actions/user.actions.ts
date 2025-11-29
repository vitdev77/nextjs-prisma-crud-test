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
    throw new Error("Failed to retrieve users from the database.");
  }
}

// Get single user
export async function getUserById({ userId }: { userId: string }) {
  try {
    const singleUser = await prisma.user.findFirst({
      where: {
        id: Number(userId),
      },
    });

    return singleUser;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to retrieve single user from the database.");
  }
}

// Create new user
export async function createUser({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
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
      error: "[USER_CREATE]: SERVER ERROR",
    };
  }

  revalidatePath("/users");
}

// Edit single user
export async function editUser({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email: string;
}) {
  try {
    await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        email,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "[USER_EDIT]: SERVER ERROR",
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
      error: "[USER_DELETE]: SERVER ERROR",
    };
  }

  revalidatePath("/users");
}
