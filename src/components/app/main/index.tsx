import BookmarkInput from "./bookmark-input";
import * as Card from "./bookmark-card";
import { bookmarkQueryOptions } from "@/lib/queries/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function BookmarkManager() {
  // This should happen first at the loader.
  const { data: bookmarks } = useSuspenseQuery(bookmarkQueryOptions);

  return (
    <div className="space-y-6 p-4">
      <div className="max-w-md">
        <BookmarkInput />
      </div>
      <div className="flex flex-wrap gap-4">
        {bookmarks.map((bookmark) => (
          <Card.Root key={bookmark.id}>
            <Card.Body>
              <Card.Icon imageURL={bookmark.favicon_url} />
              <Card.Content>
                <Card.Title>{bookmark.title}</Card.Title>
                <Card.Description>{bookmark.description}</Card.Description>
                <Card.Footer>
                  <Card.Link href={bookmark.url}>{bookmark.url}</Card.Link>
                  {/* <Card.Date>{bookmark.created_at}</Card.Date> */}
                </Card.Footer>
                <Card.Delete bookmarkId={bookmark.id} />
              </Card.Content>
            </Card.Body>
          </Card.Root>
        ))}
      </div>
    </div>
  );
}
