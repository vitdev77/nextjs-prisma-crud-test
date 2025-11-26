"use server";

import prisma from "@/lib/prisma";

// Get all users
export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: "asc",
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
