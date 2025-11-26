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
import { Check, Eye, Pen, X } from "lucide-react";
import Link from "next/link";
import { CreatePostForm, DeletePostForm, EditPostForm } from "./_components";
import { getPosts } from "@/actions/post.actions";

export default async function Posts() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6 text-[#333333]">
      <div>
        <div className="flex items-center justify-between gap-6">
          <h1 className="text-4xl font-bold">Posts</h1>
          <CreatePostForm />
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Post ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
                      <Button size={"icon-sm"} variant={"outline"} asChild>
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
