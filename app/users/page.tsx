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
import { ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import {
  CreateUserForm,
  DeleteUserForm,
  EditUserForm,
} from "@/components/forms";
import { getUsers } from "@/actions/user.actions";

export default async function Users() {
  const users = await getUsers();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="flex items-center justify-between gap-6 min-w-4xl mx-auto">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-4xl font-bold">Users</h1>
          <CreateUserForm />
        </div>
        <Button variant={"link"} asChild>
          <Link href="/posts">
            <ArrowLeft /> Posts page
          </Link>
        </Button>
      </div>

      <div className="min-w-4xl mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground"
                >
                  no users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {String(user.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row items-center gap-2">
                      <Button size={"icon-sm"} variant={"ghost"} asChild>
                        <Link href={`/users/${user.id}`}>
                          <Eye />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <EditUserForm id={String(user.id)} />
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
