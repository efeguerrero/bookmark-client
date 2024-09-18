import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteBookmakrGroup } from "@/lib/mutations";
import { useSuspenseQuery } from "@tanstack/react-query";
import { bookmarkGroupsQueryOptions } from "@/lib/queries/queryOptions";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useToast } from "@/hooks/use-toast";

interface Props {
  showDeleteGroupDialog: boolean;
  setShowDeleteGroupDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteGroupDialog = ({
  showDeleteGroupDialog,
  setShowDeleteGroupDialog,
}: Props) => {
  const { data: bookmarkGroups } = useSuspenseQuery(bookmarkGroupsQueryOptions);
  const { groupSlug } = useParams({ strict: false });
  const activeBookmarkGroupID = bookmarkGroups.find(
    (item) => item.slug === groupSlug,
  )?.id;

  const { toast } = useToast();
  const navigate = useNavigate();
  const deleteBookmarkGroup = useDeleteBookmakrGroup();

  const handleDelete = () => {
    if (activeBookmarkGroupID) {
      deleteBookmarkGroup.mutate(activeBookmarkGroupID, {
        onError: () => {
          toast({
            description:
              "There was an error deleting this group. Please try again later.",
          });
        },
        onSuccess: () => {
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
                Deleting {`Bookmark Group`} will delete all bookmarks associated
                with it.
              </p>
              <p>
                <strong>You will not be able to recover this data</strong>
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={() => handleDelete()} variant="destructive">
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteGroupDialog;
