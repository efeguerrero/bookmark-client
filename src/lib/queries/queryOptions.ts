import { queryOptions } from "@tanstack/react-query";
import { getSessionToken } from "@/lib/sessionToken.ts";
import { Bookmark, BookmarkGroup } from "@/lib/types.ts";

// API URL
const url = import.meta.env.VITE_API_URL;

export const bookmarkGroupQueries = {
  all: () =>
    queryOptions({
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: ["bookmarkGroups"],
      retry: 2,
      retryDelay: 1000,
      queryFn: async (): Promise<BookmarkGroup[]> => {
        const response = await fetch(`${url}/bookmark-group`, {
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
      // eslint-disable-next-line @tanstack/query/exhaustive-deps
      queryKey: ["bookmarks"],
      retry: 2,
      retryDelay: 1000,
      queryFn: async (): Promise<Bookmark[]> => {
        const res = await fetch(`${url}/bookmark`, {
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
  // This query could be avoided with just JS. Did it just to try out query Factories
  filteredByGroup: (groupId: Bookmark["groupId"] | undefined) =>
    queryOptions({
      ...bookmarkQueries.all(),
      select: (data) =>
        data.filter((item) => {
          if (groupId) {
            return item.groupId === groupId;
          }
          return true;
        }),
    }),
};
