import { cn } from "@/lib/utils";
import { CreatePostForm } from "@/components/forms";
// import { getUsers } from "@/actions/user.actions";

interface Props {
  className?: string;
  _onSubmit?: VoidFunction;
}

export function CreatePostComponent({ className, _onSubmit }: Props) {
  // const users = getUsers();

  return (
    <div className={cn("space-y-2", className)}>
      {/* <CreatePostForm _onSubmit={_onSubmit} users={users} /> */}
      <CreatePostForm _onSubmit={_onSubmit} />
    </div>
  );
}
