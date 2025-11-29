"use client";

import * as React from "react";
import { getPostsByUserId } from "@/actions/post.actions";

export function UserPostsProvider({
  userId,
  className,
  children,
}: Readonly<{
  userId: string;
  className?: string;
  children: React.ReactNode;
}>) {
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

  return <div className={className}>{children}</div>;
}
