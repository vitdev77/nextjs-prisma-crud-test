import { Metadata } from "next";
import { CreateBrandComponent } from "@/components/create-brand-component";
import { ReturnButton } from "@/components/return-button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Create new brand",
};

export default function NewBrandPage() {
  return (
    <div className="bg-muted min-h-screen flex flex-col gap-6 items-center justify-center">
      <ReturnButton
        btnVariant={"link"}
        href={"/brands"}
        label="All Brands Page"
      />
      <Card>
        <CardContent>
          <CreateBrandComponent />
        </CardContent>
      </Card>
    </div>
  );
}
