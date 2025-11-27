import { notFound } from "next/navigation";
import { ViewPostModal } from "@/components/modals/view-post-modal";
import { getPostById } from "@/actions/post.actions";

export default async function PostModalPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const post = await getPostById({ postId: id });

  if (!post) return notFound();

  return <ViewPostModal post={post} />;
}
