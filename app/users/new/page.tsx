import { CreateUserComponent } from "@/components/create-user-component";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";

export default function NewUserPage() {
  return (
    <div className="bg-muted min-h-screen flex flex-col gap-6 items-center justify-center">
      <ReturnButton
        btnVariant={"link"}
        href={"/users"}
        label="All Users Page"
      />
      <Card>
        <CardContent>
          <CreateUserComponent />
        </CardContent>
      </Card>
    </div>
  );
}
