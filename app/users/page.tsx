import { Metadata } from "next";
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
import { Eye, Home, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import { DeleteUserForm } from "@/components/forms";
import { getUsers } from "@/actions/user.actions";
import { ReturnButton } from "@/components/return-button";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Users",
};

export default async function Users() {
  const users = await getUsers();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <div className="mx-auto flex min-w-4xl items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-4xl font-bold">Users</h1>
          <Button asChild>
            <Link href={"/users/new"}>
              <Plus /> New user
            </Link>
          </Button>
        </div>
        <div className="flex h-5 items-center gap-2">
          <ReturnButton
            btnVariant="link"
            href="/posts"
            label="All Posts Page"
          />
          <Separator orientation="vertical" />
          <Button variant={"ghost"} size={"icon-sm"} asChild>
            <Link href={"/"}>
              <Home />
              <span className="sr-only">Back to Home</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="mx-auto min-w-4xl">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Posts Count</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-muted-foreground text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-muted-foreground text-center"
                >
                  no user found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-muted-foreground">soon</TableCell>
                  <TableCell className="text-muted-foreground">
                    {String(user.createdAt.toLocaleDateString())}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row items-center justify-end gap-2">
                      <Button size={"icon-sm"} variant={"ghost"} asChild>
                        <Link href={`/users/${user.id}`}>
                          <Eye />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <Button size={"icon-sm"} variant={"ghost"} asChild>
                        <Link href={`/users/edit/${user.id}`}>
                          <Pencil />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <DeleteUserForm id={String(user.id)} />
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
