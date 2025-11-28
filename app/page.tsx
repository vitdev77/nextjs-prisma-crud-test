import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Superblog</h1>
      <div className="flex flex-wrap gap-2">
        <Button asChild>
          <Link href={"/posts"}>Posts</Link>
        </Button>
        {/* <Button variant={"outline"} asChild>
          <Link href={"/posts/new"}>New Post</Link>
        </Button> */}
        <Button asChild>
          <Link href={"/users"}>Users</Link>
        </Button>
      </div>
    </div>
  );
}
