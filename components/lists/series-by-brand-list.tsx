"use client";

import * as React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { getSeriesByBrandId } from "@/actions/brand.actions";

export function SeriesByBrandList({ brandId }: { brandId: string }) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [series, setSeries] = React.useState<{ id: number; name: string }[]>(
    [],
  );

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before fetching data
      setError(null); // Clear any previous errors
      try {
        const response = await getSeriesByBrandId({ brandId });
        setSeries(response);
      } catch (err) {
        console.log(err);
        setError(error);
      } finally {
        setLoading(false); // Set loading to false after data fetching completes (success or error)
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once on component mount
  return (
    <div className="w-full">
      {loading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Table>
          {series.length === 0 ? null : (
            <TableCaption>A list of brand&apos;s series.</TableCaption>
          )}
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {series.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="text-center text-muted-foreground"
                >
                  no series found
                </TableCell>
              </TableRow>
            ) : (
              series.map((seriesItem) => (
                <TableRow key={seriesItem.id}>
                  <TableCell>{seriesItem.id}</TableCell>
                  <TableCell className="font-medium">
                    <Link
                      href={`/series/edit/${seriesItem.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {seriesItem.name}
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {error && (
        <div role="alert" className="text-destructive text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
