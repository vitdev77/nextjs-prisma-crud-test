"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Get all brands
export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    return brands;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw new Error("Failed to retrieve brands from the database.");
  }
}

// Get single brand
export async function getBrandById({ brandId }: { brandId: string }) {
  try {
    const singleBrand = await prisma.brand.findFirst({
      where: {
        id: Number(brandId),
      },
    });

    return singleBrand;
  } catch (error) {
    console.error("Error fetching brand:", error);
    throw new Error("Failed to retrieve single brand from the database.");
  }
}

// Get series list by Brand ID
export async function getSeriesByBrandId({ brandId }: { brandId: string }) {
  try {
    const seriesByBrandId = await prisma.series.findMany({
      where: {
        brandId: Number(brandId),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return seriesByBrandId;
  } catch (error) {
    console.error("Error fetching series by brand:", error);
    throw new Error("Failed to retrieve series by brand from the database.");
  }
}

// Create new brand
export async function createBrand({
  name,
  brandImg,
}: {
  name: string;
  brandImg?: string;
}) {
  try {
    await prisma.brand.create({
      data: {
        name,
        brandImg,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "[BRAND_CREATE]: SERVER ERROR",
    };
  }

  revalidatePath("/brands");
}

// Edit single brand
export async function editBrand({ id, name }: { id: string; name: string }) {
  try {
    await prisma.brand.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "[BRAND_EDIT]: SERVER ERROR",
    };
  }

  revalidatePath("/brands");
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
