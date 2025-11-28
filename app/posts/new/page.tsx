import { CreatePostComponent } from "@/components/create-post-component";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";

export default function NewPostPage() {
  return (
    <div className="bg-muted min-h-screen flex flex-col gap-6 items-center justify-center">
      <ReturnButton
        btnVariant={"link"}
        href={"/posts"}
        label="Back to Posts Page"
      />
      <Card>
        <CardContent>
          <CreatePostComponent />
        </CardContent>
      </Card>
    </div>
  );
}
