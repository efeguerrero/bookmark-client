import { cn } from "@/lib/utils";
import { useDeleteBookmark } from "@/lib/mutations";
import * as Card from "./bookmark-card-elements";
import { Bookmark } from "@/lib/types";
import CardContextMenu from "./card-context-menu";
import { toast } from "sonner";

export default function BookmarkCard({ bookmark }: { bookmark: Bookmark }) {
  const deleteBookmark = useDeleteBookmark();

  const handleDelete = (id: Bookmark["id"]) => {
    console.log(id);

    deleteBookmark.mutate(id, {
      onError: (error) => {
        if (error.message === "404") {
          toast.error("Bookmark was not found.");
        } else {
          toast.error("Error deleting bookmark.");
        }
      },
      onSuccess: () => {
        toast.success("Bookmark Deleted");
      },
    });
  };

  return (
    <CardContextMenu handleDelete={handleDelete} bookmark={bookmark}>
      <Card.Link href={bookmark.url} className="contents">
        <Card.Root
          className={cn(
            "hover:bg-muted-foreground/[7%]",
            deleteBookmark.isPending && "opacity-50",
          )}
        >
          <Card.Body>
            <Card.Icon imageURL={bookmark.faviconURL} />
            <Card.Content>
              <Card.Title>{bookmark.title}</Card.Title>
              <Card.Description>{bookmark.description}</Card.Description>
              <Card.Footer>
                <Card.Url>{bookmark.url}</Card.Url>
              </Card.Footer>
            </Card.Content>
          </Card.Body>
        </Card.Root>
      </Card.Link>
    </CardContextMenu>
  );
}
