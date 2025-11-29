import { notFound } from "next/navigation";
import { getUserById } from "@/actions/user.actions";
import { EditUserModal } from "@/components/modals/edit-user-modal";

export default async function EditUserModalPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const user = await getUserById({ userId: id });

  if (!user) return notFound();

  return <EditUserModal user={user} />;
}
