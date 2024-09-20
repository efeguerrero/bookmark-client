// import React from "react";
import BookmarkInput from "./bookmark-input";
import { X } from "lucide-react";
import * as Card from "./bookmark-card";

interface Bookmark {
  id: number;
  url: string;
  title: string;
  description: string;
  favicon: string;
  createdAt: string;
}

const bookmarks = [
  {
    id: 1,
    url: "https://franguererro.dev",
    title: "Francisco Guerrero",
    description: "Personal website",
    favicon: "/placeholder.svg?height=16&width=16",
    createdAt: "Sep 20",
  },
  {
    id: 2,
    url: "https://tailwindcss.com",
    title: "Tailwind CSS - Rapidly build modern websites...",
    description: "A utility-first CSS framework packed with classes...",
    favicon: "/placeholder.svg?height=16&width=16",
    createdAt: "Sep 03",
  },
];

export default function BookmarkManager() {
  const deleteBookmark = () => {
    console.log("pressed");
  };

  return (
    <div className="space-y-6 p-4">
      <div className="max-w-md">
        <BookmarkInput />
      </div>
      <div className="flex flex-wrap gap-4">
        {bookmarks.map((bookmark: Bookmark) => (
          <Card.Root key={bookmark.id}>
            <Card.Body>
              <Card.Icon imageURL={bookmark.favicon} />
              <Card.Content>
                <Card.Title>{bookmark.title}</Card.Title>
                <Card.Description>{bookmark.description}</Card.Description>
                <Card.Footer>
                  <Card.Link href={bookmark.url}>{bookmark.url}</Card.Link>
                  <Card.Date>{bookmark.createdAt}</Card.Date>
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
