import { notFound } from "next/navigation";
import { getPostById } from "@/actions/post.actions";
import { EditPostModal } from "@/components/modals/edit-post-modal";

export default async function EditPostModalPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const post = await getPostById({ postId: id });

  if (!post) return notFound();

  return <EditPostModal post={post} />;
}
