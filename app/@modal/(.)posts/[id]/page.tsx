import { notFound } from "next/navigation";
import { getPostById } from "@/actions/post.actions";
import { ViewPostModal } from "@/components/modals/view-post-modal";

export default async function ViewPostModalPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const post = await getPostById({ postId: id });

  if (!post) return notFound();

  return <ViewPostModal post={post} />;
}
