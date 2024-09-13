import React from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";

const Main = () => {
  const [newUrl, setNewUrl] = React.useState("");
  const [bookmarks, setBookmarks] = React.useState([
    {
      title: "Example Bookmark",
      description: "This is an example bookmark",
      image: "/placeholder.svg?height=40&width=40",
    },
  ]);

  const addBookmark = () => {
    if (newUrl) {
      setBookmarks([
        ...bookmarks,
        {
          title: "New Bookmark",
          description: newUrl,
          image: "/placeholder.svg?height=40&width=40",
        },
      ]);
      setNewUrl("");
    }
  };

  return (
    <main className="container mx-auto p-4">
      <div className="mb-4 flex space-x-2">
        <Input
          type="text"
          placeholder="Paste URL here"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={addBookmark}>Add Bookmark</Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {bookmarks.map((bookmark, index) => (
          <Card key={index}>
            <CardContent className="flex items-center p-4">
              <img src={bookmark.image} alt="" className="mr-4 h-10 w-10" />
              <div>
                <h3 className="font-semibold">{bookmark.title}</h3>
                <p className="truncate text-sm text-muted-foreground">
                  {bookmark.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default Main;
