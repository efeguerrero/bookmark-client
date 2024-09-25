import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteBookmarkGroup } from "@/lib/mutations";
import { useSuspenseQuery } from "@tanstack/react-query";
import { bookmarkGroupQueries } from "@/lib/queries/queryOptions";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useToast } from "@/hooks/use-toast";
import * as Icons from "@/components/ui/icons";

interface Props {
  showDeleteGroupDialog: boolean;
  setShowDeleteGroupDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteGroupDialog = ({
  showDeleteGroupDialog,
  setShowDeleteGroupDialog,
}: Props) => {
  const groupSlug = useParams({ strict: false }).groupSlug || null;
  const { data: activeBookmarkGroup } = useSuspenseQuery(
    bookmarkGroupQueries.findBySlug(groupSlug),
  );

  const { toast } = useToast();
  const navigate = useNavigate();
  const deleteBookmarkGroup = useDeleteBookmarkGroup();

  const handleDelete = () => {
    if (activeBookmarkGroup) {
      deleteBookmarkGroup.mutate(activeBookmarkGroup.id, {
        onError: () => {
          toast({
            description:
              "There was an error deleting this group. Please try again later.",
          });
        },
        onSuccess: () => {
          console.log("navigating");

          navigate({ to: "/app", replace: true });
          toast({
            description: "Group deleted",
          });
        },
        onSettled: () => {
          setShowDeleteGroupDialog(false);
        },
      });
    } else {
      setShowDeleteGroupDialog(false);
    }
  };

  return (
    <AlertDialog
      open={showDeleteGroupDialog}
      onOpenChange={setShowDeleteGroupDialog}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this group?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              <p>
                Deleting {`"${activeBookmarkGroup?.name}"`} will delete all
                bookmarks associated with it.
              </p>
              <p>
                <strong>You will not be able to recover this data</strong>
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button disabled={deleteBookmarkGroup.isPending} variant="outline">
              Cancel
            </Button>
          </AlertDialogCancel>

          <Button
            disabled={deleteBookmarkGroup.isPending}
            onClick={() => handleDelete()}
            variant="destructive"
          >
            {deleteBookmarkGroup.isPending && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {deleteBookmarkGroup.isPending ? "Deleting" : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteGroupDialog;
