"use client";

import * as React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { getPostsByUserId } from "@/actions/post.actions";

export function PostsByUserList({ userId }: { userId: string }) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [posts, setPosts] = React.useState<
    { id: number; title: string; content: string | null }[]
  >([]);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      setError(null); // Clear any previous errors
      try {
        const response = await getPostsByUserId({ userId });
        setPosts(response);
      } catch (err) {
        console.log(err);
        setError(error);
      } finally {
        setLoading(false); // Set loading to false after data fetching completes (success or error)
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on component mount
  return (
    <div className="w-full">
      {loading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Table>
          {posts.length === 0 ? null : (
            <TableCaption>A list of user&apos;s posts.</TableCaption>
          )}
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center text-muted-foreground"
                >
                  no posts found
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell className="font-medium">
                    <Link
                      href={`/posts/edit/${post.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>{post.content}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {error && (
        <div role="alert" className="text-destructive text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
