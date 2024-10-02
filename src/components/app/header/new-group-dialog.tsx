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
import { useNewBookmarkGroup } from "@/lib/mutations";
import { toast } from "sonner";

import { useNavigate } from "@tanstack/react-router";

const NewGroupDialog = ({
  showNewGroupDialog,
  setShowNewGroupDialog,
}: {
  showNewGroupDialog: boolean;
  setShowNewGroupDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof newBookmarkGroup>>({
    resolver: zodResolver(newBookmarkGroup),
    shouldUnregister: true,
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const navigate = useNavigate();

  const createBookmarkGroup = useNewBookmarkGroup();

  React.useEffect(() => {
    const subscription = form.watch((values, { name }) => {
      if (name === "name") {
        form.setValue("slug", generateSlug(values.name || ""));
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  async function onSubmit(values: z.infer<typeof newBookmarkGroup>) {
    createBookmarkGroup.mutate(values, {
      onError: (error) => {
        if (error.message === "409") {
          toast.error("A bookmark group with this slug already exists.");
        } else {
          toast.error(
            "There was an error creating this group. Please try again later.",
          );
        }
      },
      onSuccess: (data) => {
        navigate({ to: "/app/$groupSlug", params: { groupSlug: data.slug } });
      },
      onSettled: () => {
        setShowNewGroupDialog(false);
      },
    });
  }

  return (
    <Dialog open={showNewGroupDialog} onOpenChange={setShowNewGroupDialog}>
      <DialogContent aria-describedby={undefined} className="max-w-md">
        <DialogTitle>New Bookmark Group</DialogTitle>
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
                      disabled={form.formState.isSubmitting}
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
                disabled={form.formState.isSubmitting}
                variant="outline"
                onClick={() => setShowNewGroupDialog(false)}
              >
                Cancel
              </Button>
              <Button disabled={form.formState.isSubmitting} type="submit">
                {form.formState.isSubmitting && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {form.formState.isSubmitting ? "Creating" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewGroupDialog;
