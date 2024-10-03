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
import { Bookmark } from "@/lib/types";

import { useSuspenseQuery } from "@tanstack/react-query";
import { bookmarkGroupQueries } from "@/lib/queries/queryOptions";
import { useUpdateBookmark } from "@/lib/mutations";

import { Trash, ClipboardCopy, FilePenLine } from "lucide-react";
import { DotFilledIcon } from "@radix-ui/react-icons";

import { toast } from "sonner";

interface Props {
  children: React.ReactNode;
  handleDelete: (id: Bookmark["id"]) => void;
  bookmark: Bookmark;
}

const CardContextMenu = ({ children, handleDelete, bookmark }: Props) => {
  const { data: bookmarkGroups } = useSuspenseQuery(bookmarkGroupQueries.all());
  const update = useUpdateBookmark();

  const handleChangeGroup = (newGroupId: Bookmark["groupId"]) => {
    if (newGroupId !== bookmark.groupId) {
      // console.log("updating group");

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
        },
      );
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
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onSelect={() => copyToClipboard(bookmark.url)}>
          <ClipboardCopy className="mr-2 size-4" />
          Copy
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
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
            <ContextMenuSeparator />
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
  );
};

export default CardContextMenu;
