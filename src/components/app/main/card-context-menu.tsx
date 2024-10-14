import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Bookmark } from "@/lib/types";

import { useSuspenseQuery } from "@tanstack/react-query";
import { bookmarkGroupQueries } from "@/lib/queries/queryOptions";
import { useUpdateBookmark } from "@/lib/mutations";

import { Trash, ClipboardCopy, FilePenLine } from "lucide-react";
import { DotFilledIcon } from "@radix-ui/react-icons";

import { toast } from "sonner";
import { DialogTrigger } from "@radix-ui/react-dialog";

interface Props {
  children: React.ReactNode;
  handleDelete: (id: Bookmark["id"]) => void;
  bookmark: Bookmark;
}

const CardContextMenu = ({ children, handleDelete, bookmark }: Props) => {
  const [showChangeGroup, setShowChangeGroup] = React.useState(false);
  const { data: bookmarkGroups } = useSuspenseQuery(bookmarkGroupQueries.all());
  const update = useUpdateBookmark();

  const handleChangeGroup = (newGroupId: Bookmark["groupId"]) => {
    if (newGroupId !== bookmark.groupId) {
      update.mutate(
        { bookmark, newGroupId },
        {
          onError: (error) => {
            if (error.message === "404") {
              toast.error("Bookmark or assigend goup don't exist.");
            } else {
              toast.error("Unable to update bookmark");
            }
          },
          onSettled: () => {
            setShowChangeGroup(false);
          },
        },
      );
    } else {
      // We always close the dialog even if there is no mutation
      setShowChangeGroup(false);
    }
  };

  const copyToClipboard = async (url: Bookmark["url"]) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Copied to clipboard.");
    } catch {
      toast.error("Unable to copy to clipboard.");
    }
  };

  return (
    <Dialog open={showChangeGroup} onOpenChange={setShowChangeGroup}>
      <ContextMenu>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onSelect={() => copyToClipboard(bookmark.url)}>
            <ClipboardCopy className="mr-2 size-4" />
            Copy
          </ContextMenuItem>
          <DialogTrigger className="xs:hidden">
            <ContextMenuItem>
              <FilePenLine className="mr-2 size-4" />
              Change Group
            </ContextMenuItem>
          </DialogTrigger>
          <ContextMenuSub>
            <ContextMenuSubTrigger className="hidden xs:flex">
              <FilePenLine className="mr-2 size-4" />
              Change Group
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="relative mx-1 max-w-[250px]">
              {bookmarkGroups.map((group) => (
                <ContextMenuItem
                  onSelect={() => handleChangeGroup(group.id)}
                  key={group.id}
                  className="px-6"
                >
                  {bookmark.groupId === group.id && (
                    <DotFilledIcon className="absolute left-1 size-4" />
                  )}
                  <span className="truncate">{group.name}</span>
                </ContextMenuItem>
              ))}
              {bookmarkGroups.length > 0 && <ContextMenuSeparator />}
              <ContextMenuItem
                className="px-6"
                onSelect={() => handleChangeGroup(null)}
              >
                {bookmark.groupId === null && (
                  <DotFilledIcon className="absolute left-1 size-4" />
                )}
                No Group
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={() => handleDelete(bookmark.id)}>
            <Trash className="mr-2 size-4" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      {/* Change Group Dialog */}
      <DialogContent aria-describedby={undefined} className="max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select a new group</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[300px] w-full pr-4">
          <div className="space-y-1">
            <Button
              variant="ghost"
              onClick={() => handleChangeGroup(null)}
              className="w-full justify-between rounded-none hover:bg-transparent hover:text-muted-foreground focus-visible:ring-0"
            >
              <span
                className={cn(
                  "truncate",
                  bookmark.groupId === null && "text-primary",
                )}
              >
                No Group
              </span>
            </Button>
            {bookmarkGroups.length > 0 && (
              <div className="h-px bg-border" aria-hidden="true" />
            )}
            {bookmarkGroups.map((group, index) => (
              <React.Fragment key={group.id}>
                <Button
                  disabled={update.isPending}
                  variant="ghost"
                  onClick={() => handleChangeGroup(group.id)}
                  className="w-full justify-between rounded-none hover:bg-transparent hover:text-foreground focus-visible:ring-0"
                >
                  <span
                    className={cn(
                      "truncate",
                      bookmark.groupId === group.id && "text-primary",
                    )}
                  >
                    {group.name}
                  </span>
                </Button>
                {index < bookmarkGroups.length - 1 && (
                  <div className="h-px bg-border" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CardContextMenu;
