import { ViewPostModal } from "@/components/modals/view-post-modal";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function PostModalPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const post = await prisma.post.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      author: true,
    },
  });

  if (!post) return notFound();

  return <ViewPostModal post={post} />;
}
