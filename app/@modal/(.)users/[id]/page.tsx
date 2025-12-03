import { notFound } from "next/navigation";
import { getUserById } from "@/actions/user.actions";
import { ViewUserModal } from "@/components/modals/view-user-modal";

export default async function ViewUserModalPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const user = await getUserById({ userId: id });

  if (!user) return notFound();

  return <ViewUserModal user={user} />;
}
