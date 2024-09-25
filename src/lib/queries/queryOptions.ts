import { queryOptions } from "@tanstack/react-query";
import { getSessionToken } from "@/lib/sessionToken.ts";
import { Bookmark, BookmarkGroup } from "@/lib/types.ts";

export const bookmarkGroupQueries = {
  all: () =>
    queryOptions({
      queryKey: ["bookmarkGroups"],
      retry: 2,
      retryDelay: 1000,
      queryFn: async (): Promise<BookmarkGroup[]> => {
        const response = await fetch("http://localhost:8080/bookmark-group", {
          headers: {
            Authorization: `Bearer ${await getSessionToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching bookmark Groups");
        }

        return await response.json();
      },
    }),
  findBySlug: (slug: BookmarkGroup["slug"] | null) =>
    queryOptions({
      // Since we are only doing a select operation here we do not need to use a different QueryKey! The basis will ailways be the bookmarkGroups Query that is cached, all we are doing is filtering the original query
      ...bookmarkGroupQueries.all(),
      select: (data) => data.find((item) => item.slug === slug),
    }),
};

export const bookmarkQueries = {
  all: () =>
    queryOptions({
      queryKey: ["bookmarks"],
      retry: 2,
      retryDelay: 1000,
      queryFn: async (): Promise<Bookmark[]> => {
        const res = await fetch("http://localhost:8080/bookmark", {
          headers: { Authorization: `Bearer ${await getSessionToken()}` },
        });
        const response = await res.json();
        // console.log("bookmark Fetch", response);

        if (!res.ok) {
          throw new Error("There was an error retrieving bookmarks");
        }

        return response;
      },
    }),
  filteredByGroup: (groupId: Bookmark["groupId"]) =>
    queryOptions({
      ...bookmarkQueries.all(),
      select: (data) => data.filter((item) => item.groupId === groupId),
    }),
};
