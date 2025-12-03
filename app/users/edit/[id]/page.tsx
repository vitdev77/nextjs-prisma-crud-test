import { Metadata } from "next";
import { getUserById } from "@/actions/user.actions";
import { EditUserComponent } from "@/components/edit-user-component";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit single user",
};

export default async function EditUserPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const { id } = params;

  const user = await getUserById({ userId: id });

  if (!user) {
    notFound();
  }

  return (
    <div className="bg-muted min-h-screen flex flex-col gap-6 items-center justify-center">
      <ReturnButton
        btnVariant={"link"}
        href={"/users"}
        label="All Users Page"
      />
      <Card>
        <CardContent>
          <EditUserComponent user={user} />
        </CardContent>
      </Card>
    </div>
  );
}
