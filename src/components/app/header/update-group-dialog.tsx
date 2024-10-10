import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { newBookmarkGroup } from "@/lib/schemas";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { generateSlug } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as Icons from "@/components/ui/icons";
import { useUpdateBookmarkGroup } from "@/lib/mutations";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useParams, useNavigate } from "@tanstack/react-router";
import { bookmarkGroupQueries } from "@/lib/queries/queryOptions";

const EditGroupDialog = ({
  showEditGroupDialog,
  setShowEditGroupDialog,
}: {
  showEditGroupDialog: boolean;
  setShowEditGroupDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const updateBookmarkGroup = useUpdateBookmarkGroup();
  const navigate = useNavigate();

  const groupSlug = useParams({ strict: false }).groupSlug || null;
  const { data: activeBookmarkGroup } = useSuspenseQuery(
    bookmarkGroupQueries.findBySlug(groupSlug),
  );

  const form = useForm<z.infer<typeof newBookmarkGroup>>({
    resolver: zodResolver(newBookmarkGroup),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  React.useEffect(() => {
    if (showEditGroupDialog) {
      form.reset({
        name: activeBookmarkGroup?.name,
        slug: activeBookmarkGroup?.slug,
      });
    }

    if (!showEditGroupDialog) {
      form.reset({
        name: "",
        slug: "",
      });
    }
  }, [showEditGroupDialog, form, activeBookmarkGroup]);

  React.useEffect(() => {
    const subscription = form.watch((values, { name }) => {
      if (name === "name") {
        form.setValue("slug", generateSlug(values.name || ""));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  async function onSubmit(values: z.infer<typeof newBookmarkGroup>) {
    if (activeBookmarkGroup) {
      updateBookmarkGroup.mutate(
        { ...values, id: activeBookmarkGroup.id },
        {
          onError: (error) => {
            if (error.message === "404") {
              toast.error("Group was not found.");
            } else {
              toast.error(
                "There was an error updating this bookmark group. Please try again later.",
              );
            }
          },
          onSuccess: (data) => {
            navigate({
              to: "/app/$groupSlug",
              params: { groupSlug: data.slug },
            });
            toast.success("Bookmark group updated!");
          },
          onSettled: () => {
            setShowEditGroupDialog(false);
          },
        },
      );
    }
  }

  return (
    <Dialog open={showEditGroupDialog} onOpenChange={setShowEditGroupDialog}>
      <DialogContent aria-describedby={undefined} className="max-w-md">
        <DialogTitle>Update Bookmark Group</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={updateBookmarkGroup.isPending}
                      placeholder="Design"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input disabled={true} placeholder="design" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-x-6">
              <Button
                type="reset"
                disabled={updateBookmarkGroup.isPending}
                variant="outline"
                onClick={() => setShowEditGroupDialog(false)}
              >
                Cancel
              </Button>
              <Button disabled={updateBookmarkGroup.isPending} type="submit">
                {updateBookmarkGroup.isPending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {updateBookmarkGroup.isPending ? "Updating" : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditGroupDialog;
