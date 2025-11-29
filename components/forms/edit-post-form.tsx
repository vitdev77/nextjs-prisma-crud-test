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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoadingButton } from "@/components/loading-button";
import { toast } from "sonner";
import { editPost } from "@/actions/post.actions";
import { PostWithRelations } from "@/@types/prisma";

const editPostSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  // author: z.string().min(1, { message: "Author is required" }),
  id: z.string().min(1, { message: "Post ID is required" }),
});

type EditPostValues = z.infer<typeof editPostSchema>;

interface Props {
  post: PostWithRelations;
  _onSubmit?: VoidFunction;
}

export function EditPostForm({ post, _onSubmit }: Props) {
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<EditPostValues>({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      title: post.title,
      content: post.content || "",
      // author: post.author.name || undefined,
      id: String(post.id),
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const res = await editPost(data);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Post successfully updated");
      _onSubmit?.();
    }
  });

  const loading = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h2 className="text-lg md:text-xl leading-none font-semibold">
          Edit post
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

          {/* <FormField
            control={form.control}
            name="author"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input disabled={true} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          /> */}

          {/* <FormField
            control={form.control}
            name="postId"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>PostID</FormLabel>
                  <FormControl>
                    <Input disabled={true} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          /> */}

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
