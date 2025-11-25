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
import prisma from "@/lib/prisma";
import { Check, Eye, Pen, Plus, Trash2, X } from "lucide-react";
import Link from "next/link";

export default async function Posts() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6 text-[#333333]">
      <div>
        <div className="flex items-center justify-between gap-6">
          <h1 className="text-4xl font-bold">Posts</h1>
          <Button asChild>
            <Link href={"/posts/new"}>
              <Plus /> Create new
            </Link>
          </Button>
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
                <TableCell colSpan={6}>no posts found</TableCell>
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
                      <Button size={"icon-sm"}>
                        <Pen />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button size={"icon-sm"} variant={"destructive"}>
                        <Trash2 />
                        <span className="sr-only">Delete</span>
                      </Button>
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
