import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Super DB</h1>
      <div className="flex flex-wrap gap-2">
        <Button asChild>
          <Link href={"/posts"}>Posts</Link>
        </Button>
        <Button asChild>
          <Link href={"/users"}>Users</Link>
        </Button>
        <Button asChild>
          <Link href={"/brands"}>Brands</Link>
        </Button>
        <Button asChild>
          <Link href={"/series"}>Series</Link>
        </Button>
      </div>
    </div>
  );
}
