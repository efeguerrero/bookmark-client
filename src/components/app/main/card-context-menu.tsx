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
      console.log("updating group");

      update.mutate(
        { bookmark, newGroupId },
        {
          onError: () => {
            console.log("error updating bookmark group");
          },
        },
      );
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <ClipboardCopy className="mr-2 size-4" />
          Copy
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <FilePenLine className="mr-2 size-4" />
            Change Group
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="relative mx-1">
            {bookmarkGroups.map((group) => (
              <ContextMenuItem
                onSelect={() => handleChangeGroup(group.id)}
                key={group.id}
                className="px-6"
              >
                {bookmark.groupId === group.id && (
                  <DotFilledIcon className="absolute left-1 size-4" />
                )}
                {group.name}
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
