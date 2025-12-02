"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all brands
export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({});

    return brands;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw new Error("Failed to retrieve brands from the database.");
  }
}

// Delete single brand
export async function deleteBrand({ brandId }: { brandId: string }) {
  try {
    await prisma.brand.delete({
      where: {
        id: parseInt(brandId),
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "[BRAND_DELETE]: SERVER ERROR",
    };
  }

  revalidatePath("/brands");
}
