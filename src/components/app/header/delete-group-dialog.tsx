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

interface Props {
  showDeleteGroupDialog: boolean;
  setShowDeleteGroupDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteGroupDialog = ({
  showDeleteGroupDialog,
  setShowDeleteGroupDialog,
}: Props) => {
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
          <AlertDialogDescription>
            Deleting {`Bookmark Group`} will delete all bookmarks associated
            with it.
            <p>
              <strong>You will not be able to recover this data</strong>
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive">Delete</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteGroupDialog;
