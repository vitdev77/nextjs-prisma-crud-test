import { ArrowLeft, Check, Eye, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import {
  CreatePostForm,
  DeletePostForm,
  EditPostForm,
} from "@/components/forms";
import { getPosts } from "@/actions/post.actions";

export default async function Posts() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="flex items-center justify-between gap-6 min-w-4xl mx-auto">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-4xl font-bold">Posts</h1>
          <CreatePostForm />
          <Button asChild>
            <Link href={"/posts/new"}>
              <Plus /> New post
            </Link>
          </Button>
        </div>
        <Button variant={"link"} asChild>
          <Link href="/users">
            <ArrowLeft /> Users page
          </Link>
        </Button>
      </div>

      <div className="min-w-4xl mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Post ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Published</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground"
                >
                  no posts found
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.content}</TableCell>
                  <TableCell>{post.author.name}</TableCell>
                  <TableCell>
                    {post.published === true ? (
                      <Check className="stroke-green-600 size-5" />
                    ) : (
                      <X className="stroke-destructive size-5" />
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row items-center gap-2">
                      <Button size={"icon-sm"} variant={"ghost"} asChild>
                        <Link href={`/posts/${post.id}`}>
                          <Eye />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <EditPostForm id={String(post.id)} />
                      <DeletePostForm id={String(post.id)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
