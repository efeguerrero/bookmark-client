import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const NewGroupDialog = ({
  showNewGroupDialog,
  setShowNewGroupDialog,
}: {
  showNewGroupDialog: boolean;
  setShowNewGroupDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <Dialog open={showNewGroupDialog} onOpenChange={setShowNewGroupDialog}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
);

export default NewGroupDialog;
