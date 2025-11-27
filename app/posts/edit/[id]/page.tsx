import { getPostById } from "@/actions/post.actions";
import { EditPostComponent } from "@/components/edit-post-component";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditPostPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const { id } = params;

  const post = await getPostById({ postId: id });

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center">
      <EditPostComponent />
    </div>
  );
}
