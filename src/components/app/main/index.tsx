// import React from "react";
import BookmarkInput from "./bookmark-input";
import { X } from "lucide-react";
import * as Card from "./bookmark-card";
import { bookmarkQueryOptions } from "@/lib/queries/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function BookmarkManager() {
  const { data: bookmarks } = useSuspenseQuery(bookmarkQueryOptions);

  const deleteBookmark = () => {
    console.log("pressed");
  };

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
                <Card.Action onClick={() => deleteBookmark()}>
                  <X className="h-4 w-4" />
                </Card.Action>
              </Card.Content>
            </Card.Body>
          </Card.Root>
        ))}
      </div>
    </div>
  );
}
