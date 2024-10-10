import React from "react";
import BookmarkInput from "./bookmark-input";
import {
  bookmarkQueries,
  bookmarkGroupQueries,
} from "@/lib/queries/queryOptions";
import { useSuspenseQuery, useMutationState } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import BookmarkCard from "./bookmark-card";
import BookmarkCardSkeleton from "./bookmark-card-skeleton";

export default function BookmarkManager() {
  const [inputValue, setInputValue] = React.useState("");
  const groupSlug = useParams({ strict: false }).groupSlug || null;
  const { data: activeBookmarkGroup } = useSuspenseQuery(
    bookmarkGroupQueries.findBySlug(groupSlug),
  );

  const newBookmarkMutation = useMutationState({
    filters: { mutationKey: ["newBookmark"], status: "pending" },
  });

  const { data: bookmarks } = useSuspenseQuery(
    bookmarkQueries.filteredByGroup(activeBookmarkGroup?.id),
  );

  const filteredBookmarks = bookmarks.filter((item) => {
    const title = item.title.toLowerCase();
    const description = item.description?.toLowerCase() || "";
    const url = item.url.toLowerCase();

    return (
      title.includes(inputValue.toLowerCase()) ||
      description.includes(inputValue.toLowerCase()) ||
      url.includes(inputValue.toLowerCase())
    );
  });

  // console.log(filteredBookmarks);

  if (filteredBookmarks.length === 0 && !newBookmarkMutation.length) {
    return (
      <div className="mx-auto my-10 max-w-7xl space-y-6 p-4">
        <div className="mb-12 lg:mb-16">
          <BookmarkInput
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <h3 className="text-sm text-muted-foreground">No bookmarks found.</h3>
        </div>
      </div>
    );
  }

  if (newBookmarkMutation.length) {
    return (
      <div className="mx-auto my-10 max-w-7xl space-y-6 p-4">
        <div className="mb-12 lg:mb-16">
          <BookmarkInput
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <BookmarkCardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto my-10 max-w-7xl space-y-6 p-4">
      <div className="mb-12 lg:mb-16">
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
