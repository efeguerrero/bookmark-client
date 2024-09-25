import BookmarkInput from "./bookmark-input";
import {
  bookmarkQueries,
  bookmarkGroupQueries,
} from "@/lib/queries/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import BookmarkCard from "./bookmark-card";

export default function BookmarkManager() {
  const groupSlug = useParams({ strict: false }).groupSlug || null;
  const { data: activeBookmarkGroup } = useSuspenseQuery(
    bookmarkGroupQueries.findBySlug(groupSlug),
  );

  const { data: bookmarks } = useSuspenseQuery(
    activeBookmarkGroup
      ? bookmarkQueries.filteredByGroup(activeBookmarkGroup.id)
      : bookmarkQueries.all(),
  );

  console.log(bookmarks);

  return (
    <div className="space-y-6 p-4">
      <div className="max-w-md">
        <BookmarkInput />
      </div>
      <div className="flex flex-wrap gap-4">
        {bookmarks.map((bookmark) => (
          <BookmarkCard key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    </div>
  );
}
