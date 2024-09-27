import React from "react";
import BookmarkInput from "./bookmark-input";
import {
  bookmarkQueries,
  bookmarkGroupQueries,
} from "@/lib/queries/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import BookmarkCard from "./bookmark-card";

export default function BookmarkManager() {
  const [inputValue, setInputValue] = React.useState("");
  const groupSlug = useParams({ strict: false }).groupSlug || null;
  const { data: activeBookmarkGroup } = useSuspenseQuery(
    bookmarkGroupQueries.findBySlug(groupSlug),
  );

  const { data: bookmarks } = useSuspenseQuery(
    bookmarkQueries.filteredByGroup(activeBookmarkGroup?.id),
  );

  const filteredBookmarks = bookmarks.filter((item) => {
    const title = item.title.toLowerCase();
    const description = item.description?.toLowerCase() || "";
    const url = item.url.toLowerCase();

    return (
      title.includes(inputValue) ||
      description.includes(inputValue) ||
      url.includes(inputValue)
    );
  });

  return (
    <div className="space-y-6 p-4">
      <div className="max-w-md">
        <BookmarkInput inputValue={inputValue} setInputValue={setInputValue} />
      </div>
      <div className="flex flex-wrap gap-4">
        {filteredBookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    </div>
  );
}
