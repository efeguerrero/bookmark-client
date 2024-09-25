import React from "react";
import { cn } from "@/lib/utils";
import { useDeleteBookmark } from "@/lib/mutations";
import * as Card from "./bookmark-card-elements";
import { Bookmark } from "@/lib/types";
import { X, Trash2 } from "lucide-react";

export default function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  const [showDelete, setShowDelete] = React.useState(false);
  const deleteBookmark = useDeleteBookmark();

  const handleDelete = () => {
    if (showDelete) {
      console.log(bookmark.id);

      deleteBookmark.mutate(bookmark.id, {
        onError: () => {
          console.log("error deleting bookmark");
        },
      });
    }

    setShowDelete(true);

    setTimeout(() => {
      if (deleteBookmark.isIdle || deleteBookmark.isError) {
        setShowDelete(false);
      }
    }, 3000);
  };

  return (
    <Card.Root className={cn(deleteBookmark.isPending && "opacity-50")}>
      <Card.Body>
        <Card.Icon imageURL={bookmark.faviconURL} />
        <Card.Content>
          <Card.Title>{bookmark.title}</Card.Title>
          <Card.Description>{bookmark.description}</Card.Description>
          <Card.Footer>
            <Card.Link href={bookmark.url}>{bookmark.url}</Card.Link>
          </Card.Footer>
          <Card.Action
            disabled={deleteBookmark.isPending}
            onClick={() => handleDelete()}
          >
            {showDelete ? (
              <Trash2 className="h-4 w-4 text-destructive" />
            ) : (
              <X className="h-4 w-4" />
            )}
          </Card.Action>
        </Card.Content>
      </Card.Body>
    </Card.Root>
  );
}
