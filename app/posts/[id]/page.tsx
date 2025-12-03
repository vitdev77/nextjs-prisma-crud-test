import { Metadata } from "next";
import { getPostById } from "@/actions/post.actions";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";
import { ViewPostComponent } from "@/components/view-post-component";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "View single post",
};

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
    <div className="bg-muted min-h-screen flex flex-col gap-6 items-center justify-center">
      <ReturnButton
        btnVariant={"link"}
        href={"/posts"}
        label="All Posts Page"
      />
      <Card>
        <CardContent>
          <ViewPostComponent post={post} />
        </CardContent>
      </Card>
    </div>
  );
}
