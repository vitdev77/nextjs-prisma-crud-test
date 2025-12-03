export const brands = [
  { name: "Midea", brandImg: "midea.png" }, // 1
  { name: "General Electronics", brandImg: "general-electronics.webp" }, // 2
  { name: "DEXP", brandImg: "dexp.png" }, // 3
  { name: "Körting", brandImg: "koerting.svg" }, // 4
  { name: "Schaub Lorenz", brandImg: "schaub-lorenz.png" }, // 5
];

export const series = [
  { name: "BCD345", brandId: 1 }, // 1
  { name: "BCD385", brandId: 1 }, // 2
  { name: "BCD405", brandId: 1 }, // 3
  { name: "BCD445", brandId: 1 }, // 4
  { name: "BCD335", brandId: 1 }, // 5
  { name: "BCD375", brandId: 1 }, // 6
];

export const productColors = [
  { name: "White" }, // 1
  { name: "Black" }, // 2
  { name: "Beige" }, // 3
  { name: "Inox" }, // 4
  { name: "Basalt Gray" }, // 5
];

// TEMP data users
export const temp_users = [
  { name: "Alice", email: "alice@prisma.io", id: 1 },
  { name: "Bob", email: "bob@prisma.io", id: 2 },
  { name: "John", email: "john@prisma.io", id: 3 },
];

// TEMP data posts
export const temp_posts = [
  {
    title: "Join the Prisma Discord",
    content: "https://pris.ly/discord",
    published: true,
    authorId: 1,
  },
  {
    title: "Prisma on YouTube",
    content: "https://pris.ly/youtube",
    authorId: 1,
  },
  {
    title: "Follow Prisma on Twitter",
    content: "https://www.twitter.com/prisma",
    published: true,
    authorId: 2,
  },
  {
    title: "Prisma CRUD",
    content: "https://www.prisma.io/docs/orm/prisma-client/queries/crud",
    published: true,
    authorId: 3,
  },
  {
    title: "Design Your Perfect shadcn/ui Theme",
    content: "https://tweakcn.com/",
    authorId: 3,
  },
];
