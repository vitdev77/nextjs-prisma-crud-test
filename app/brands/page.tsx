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
import { DeleteBrandForm } from "@/components/forms";
import { getBrands } from "@/actions/brand.actions";
import { ReturnButton } from "@/components/return-button";
import { Separator } from "@/components/ui/separator";

export default async function Brands() {
  const brands = await getBrands();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="flex items-center justify-between gap-6 min-w-4xl mx-auto">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-4xl font-bold">Brands</h1>
          <Button asChild>
            <Link href={"/brands/new"}>
              <Plus /> New brand
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2 h-5">
          <ReturnButton
            btnVariant="link"
            href="/series"
            label="All Series Page"
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

      <div className="min-w-4xl mx-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Brand ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Image Path</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead className="text-muted-foreground text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-muted-foreground"
                >
                  no brand found
                </TableCell>
              </TableRow>
            ) : (
              brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>{brand.id}</TableCell>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell>
                    {brand.brandImg === null ? (
                      <span className="text-muted-foreground/50">
                        no image added
                      </span>
                    ) : (
                      `/brands/${brand.brandImg}`
                    )}
                  </TableCell>
                  <TableCell>
                    {String(brand.createdAt.toLocaleDateString())}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row items-center justify-end gap-2">
                      <Button size={"icon-sm"} variant={"ghost"} asChild>
                        <Link href={`/brands/${brand.id}`}>
                          <Eye />
                          <span className="sr-only">View</span>
                        </Link>
                      </Button>
                      <Button size={"icon-sm"} variant={"ghost"} asChild>
                        <Link href={`/brands/edit/${brand.id}`}>
                          <Pencil />
                          <span className="sr-only">Edit</span>
                        </Link>
                      </Button>
                      <DeleteBrandForm id={String(brand.id)} />
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
