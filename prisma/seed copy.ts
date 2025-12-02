import { PrismaClient, Prisma } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

// const userData: Prisma.UserCreateInput[] = [
//   {
//     name: "Alice",
//     email: "alice@prisma.io",
//     posts: {
//       create: [
//         {
//           title: "Join the Prisma Discord",
//           content: "https://pris.ly/discord",
//           published: true,
//         },
//         {
//           title: "Prisma on YouTube",
//           content: "https://pris.ly/youtube",
//         },
//       ],
//     },
//   },
//   {
//     name: "Bob",
//     email: "bob@prisma.io",
//     posts: {
//       create: [
//         {
//           title: "Follow Prisma on Twitter",
//           content: "https://www.twitter.com/prisma",
//           published: true,
//         },
//       ],
//     },
//   },
//   {
//     name: "John",
//     email: "john@prisma.io",
//     posts: {
//       create: [
//         {
//           title: "Prisma CRUD",
//           content: "https://www.prisma.io/docs/orm/prisma-client/queries/crud",
//           published: true,
//         },
//         {
//           title: "Design Your Perfect shadcn/ui Theme",
//           content: "https://tweakcn.com/",
//         },
//       ],
//     },
//   },
// ];

const brandData: Prisma.BrandCreateInput[] = [
  {
    name: "Midea",
    imageUrl: "/brands/midea.png",
    series: {
      create: [
        {
          name: "BCD345",
        },
        {
          name: "BCD385",
        },
        {
          name: "BCD405",
        },
        {
          name: "BCD445",
        },
        {
          name: "BCD335",
        },
        {
          name: "BCD375",
        },
      ],
    },
  },
  {
    name: "General Electronics",
    imageUrl: "/brands/general-electronics.webp",
  },
  {
    name: "DEXP",
    imageUrl: "/brands/dexp.png",
  },
  {
    name: "Körting",
    imageUrl: "/brands/koerting.svg",
  },
  {
    name: "Schaub Lorenz",
    imageUrl: "/brands/schaub-lorenz.png",
  },
];

export async function main() {
  // for (const u of userData) {
  //   await prisma.user.create({ data: u });
  // }
  for (const b of brandData) {
    await prisma.brand.create({ data: b });
  }
}

main();
