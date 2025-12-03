import { Post, User, Brand, Series, Product } from "@/generated/prisma/client";

export type PostWithRelations = Post & {
  author: User;
};

export type UserWithRelations = User;

export type BrandWithRelations = Brand;

export type SeriesWithRelations = Series & {
  brand: Brand;
};

export type ProductWithRelations = Product & {
  series: Series & {
    brand: Brand;
  };
};
