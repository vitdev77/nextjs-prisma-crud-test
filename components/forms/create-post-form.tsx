"use client";

import * as React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoadingButton } from "@/components/loading-button";
import { toast } from "sonner";
import { createPost } from "@/actions/post.actions";

const newPostSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  authorId: z.string().nonempty("Please select an author"),
});

type NewPostValues = z.infer<typeof newPostSchema>;

export function CreatePostForm({
  _onSubmit,
  // users,
}: {
  _onSubmit?: VoidFunction;
  // users: Promise<{ id: number; email: string; name: string | null }[]>;
}) {
  const [error, setError] = React.useState<string | null>(null);

  // const allUsers = React.use(users);

  const form = useForm<NewPostValues>({
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      title: "",
      content: "",
      authorId: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await createPost(data);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("New post successfully created");
      _onSubmit?.();
      form.reset();
    }
  });

  const loading = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-lg md:text-xl leading-none font-semibold">
          Add new post
        </h2>
        <p className="text-xs md:text-sm text-muted-foreground">
          Fill all form fields. Click button below when you&apos;re done.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Content here..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="authorId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    // disabled={loading || allUsers.length === 0}
                    disabled={loading}
                    {...field}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an author" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Authors</SelectLabel>
                        {/* {allUsers.map((user) => (
                          <SelectItem key={user.id} value={String(user.id)}>
                            {user.name} #{user.email}
                          </SelectItem>
                        ))} */}
                        <SelectItem value="1">Alice</SelectItem>
                        <SelectItem value="2">Bob</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {error && (
            <div role="alert" className="text-destructive text-sm">
              {error}
            </div>
          )}

          <LoadingButton type="submit" className="w-full" loading={loading}>
            Submit
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
