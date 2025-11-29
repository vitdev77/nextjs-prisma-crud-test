import { getUserById } from "@/actions/user.actions";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";
import { ViewUserComponent } from "@/components/view-user-component";
import { notFound } from "next/navigation";

export default async function UserPage(props: {
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
      <Card className="min-w-xs">
        <CardContent>
          <ViewUserComponent user={user} />
        </CardContent>
      </Card>
    </div>
  );
}
