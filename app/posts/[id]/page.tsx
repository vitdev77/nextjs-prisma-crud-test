import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <article className="max-w-2xl space-y-4 font-sans">
        <h1 className="text-4xl text-center font-bold mb-8">{post.title}</h1>
        <p className="text-muted-foreground text-center">
          by {post.author.name}
        </p>
        <div className="prose prose-gray mt-8 text-center">
          {post.content || "No content available."}
        </div>
      </article>
      <Button className="mt-12" variant={"secondary"} asChild>
        <Link href={"/posts"}>
          <ArrowLeft /> Back to Posts
        </Link>
      </Button>
    </div>
  );
}
