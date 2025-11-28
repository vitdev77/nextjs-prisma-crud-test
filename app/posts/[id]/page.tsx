import { getPostById } from "@/actions/post.actions";
import { Button } from "@/components/ui/button";
import { ViewPostComponent } from "@/components/view-post-component";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostPage(props: {
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
      <ViewPostComponent post={post} />

      <Button variant={"link"} asChild>
        <Link href={"/posts"}>
          <ArrowLeft /> Back to Posts
        </Link>
      </Button>
    </div>
  );
}
