import { Metadata } from "next";
import { getPostById } from "@/actions/post.actions";
import { EditPostComponent } from "@/components/edit-post-component";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit single post",
};

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
    <div className="bg-muted min-h-screen flex flex-col gap-6 items-center justify-center">
      <ReturnButton
        btnVariant={"link"}
        href={"/posts"}
        label="All Posts Page"
      />
      <Card>
        <CardContent>
          <EditPostComponent post={post} />
        </CardContent>
      </Card>
    </div>
  );
}
