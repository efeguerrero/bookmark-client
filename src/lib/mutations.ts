import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/queryClient";
import { bookmarkGroupsQueryOptions } from "@/lib/queries/queryOptions";
import { z } from "zod";
import { newBookmarkGroup, bookmarkGroup } from "./schemas";
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
            const newData = [...oldData, data];

            newData.sort((a, b) => {
              const nameA = a.name.toLowerCase();
              const nameB = b.name.toLowerCase();

              if (nameA < nameB) return -1;
              if (nameA > nameB) return 1;
              return 0;
            });

            return newData;
          }
          return [data];
        },
      );
    },
  });
};

export const useDeleteBookmarkGroup = () => {
  type Input = z.infer<typeof bookmarkGroup.shape.id>;
  return useMutation({
    mutationFn: async (id: Input): Promise<void> => {
      const res = await fetch(`http://localhost:8080/bookmark-group/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${await getSessionToken()}`,
        },
      });

      const response = await res.json();

      if (!res.ok) {
        throw res.status;
      }

      return response;
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(
        bookmarkGroupsQueryOptions.queryKey,
        (oldData) => {
          if (oldData) {
            const newData = oldData.filter((item) => item.id !== id);
            return newData;
          }
          return;
        },
      );
    },
  });
};

export const useUpdateBookmarkGroup = () => {
  return useMutation({
    mutationFn: async (data: BookmarkGroup): Promise<BookmarkGroup> => {
      const res = await fetch(
        `http://localhost:8080/bookmark-group/${data.id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ name: data.name, slug: data.slug }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getSessionToken()}`,
          },
        },
      );
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
            const newData = oldData.map((item) => {
              if (item.id === data.id) {
                return data;
              }
              return item;
            });

            newData.sort((a, b) => {
              const nameA = a.name.toLowerCase();
              const nameB = b.name.toLowerCase();
              if (nameA < nameB) return -1;
              if (nameA > nameB) return +1;
              return 0;
            });

            return newData;
          }

          return;
        },
      );
    },
  });
};
