import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/queryClient";
import { bookmarkGroupsQueryOptions } from "@/lib/queries/queryOptions";
import { z } from "zod";
import { newBookmarkGroup } from "./schemas";
import { getSessionToken } from "@/lib/sessionToken.ts";
import { BookmarkGroup } from "./types";

export const useNewBookmarkGroup = () => {
  type Inputs = z.infer<typeof newBookmarkGroup>;

  return useMutation({
    mutationFn: async (data: Inputs): Promise<BookmarkGroup> => {
      const res = await fetch("http://localhost:8080/bookmark-group", {
        headers: {
          Authorization: `Bearer ${await getSessionToken()}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (!res.ok) {
        throw res.status;
      }

      return response;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        bookmarkGroupsQueryOptions.queryKey,
        (oldData) => {
          if (oldData) {
            return [...oldData, data];
          }
          return [data];
        },
      );
    },
  });
};
