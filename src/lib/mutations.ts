import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/queryClient";
import {
  bookmarkGroupQueries,
  bookmarkQueries,
} from "@/lib/queries/queryOptions";
import { z } from "zod";
import { newBookmarkGroup, bookmarkGroup } from "./schemas";
import { getSessionToken } from "@/lib/sessionToken.ts";
import { BookmarkGroup, Bookmark } from "./types";

// API URL
const url = import.meta.env.VITE_API_URL;

export const useNewBookmarkGroup = () => {
  type Inputs = z.infer<typeof newBookmarkGroup>;

  return useMutation({
    mutationFn: async (data: Inputs): Promise<BookmarkGroup> => {
      const res = await fetch(`${url}/bookmark-group`, {
        headers: {
          Authorization: `Bearer ${await getSessionToken()}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      return response;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        bookmarkGroupQueries.all().queryKey,
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
      const res = await fetch(`${url}/bookmark-group/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${await getSessionToken()}`,
        },
      });

      const response = await res.json();

      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      return response;
    },
    onSuccess: async (_, id) => {
      // We first remove deleted bookmarks to avoid removed cards flashing on update
      queryClient.setQueryData(bookmarkQueries.all().queryKey, (oldData) => {
        if (oldData) {
          const newData = oldData.filter((item) => item.groupId !== id);

          newData.sort((a, b) => {
            const nameA = a.title.toLowerCase();
            const nameB = b.title.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return +1;
            return 0;
          });

          return newData;
        }
        return;
      });

      queryClient.setQueryData(
        bookmarkGroupQueries.all().queryKey,
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
      const res = await fetch(`${url}/bookmark-group/${data.id}`, {
        method: "PATCH",
        body: JSON.stringify({ name: data.name, slug: data.slug }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getSessionToken()}`,
        },
      });
      const response = await res.json();

      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      return response;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
        bookmarkGroupQueries.all().queryKey,
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

export const useNewBookmark = () => {
  type InputType = Pick<Bookmark, "url" | "groupId">;
  return useMutation({
    mutationKey: ["newBookmark"],
    mutationFn: async (input: InputType): Promise<Bookmark> => {
      const res = await fetch(`${url}/bookmark`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await getSessionToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      const response = await res.json();

      return response;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(bookmarkQueries.all().queryKey, (oldData) => {
        if (oldData) {
          const newData: Bookmark[] = [...oldData, data];

          newData.sort((a, b) => {
            const nameA = a.title.toLowerCase();
            const nameB = b.title.toLowerCase();

            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
          });

          return newData;
        }
        return [data];
      });
    },
  });
};

export const useDeleteBookmark = () => {
  type Id = Bookmark["id"];
  type Return = Pick<Bookmark, "id" | "title">;

  return useMutation({
    mutationFn: async (id: Id): Promise<Return> => {
      const res = await fetch(`${url}/bookmark/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${await getSessionToken()}`,
        },
      });

      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      const response = await res.json();

      // console.log("deleted from server", response);

      return response;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(bookmarkQueries.all().queryKey, (oldData) => {
        if (oldData) {
          const newData = oldData.filter((item) => item.id !== data.id);
          return newData;
        }

        return [];
      });
    },
  });
};

export const useUpdateBookmark = () => {
  interface Data {
    bookmark: Bookmark;
    newGroupId: Bookmark["groupId"];
  }
  return useMutation({
    mutationFn: async (data: Data): Promise<Bookmark> => {
      const { bookmark, newGroupId } = data;
      const res = await fetch(`${url}/bookmark/${bookmark.id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${await getSessionToken()}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ newGroupId }),
      });

      if (!res.ok) {
        throw new Error(`${res.status}`);
      }

      const response = await res.json();
      // console.log(response);

      return response;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(bookmarkQueries.all().queryKey, (oldData) => {
        if (oldData) {
          const newData = oldData.map((item) => {
            if (data.id === item.id) {
              return {
                ...item,
                groupId: data.groupId,
              };
            }
            return item;
          });

          return newData;
        }

        return [data];
      });
    },
  });
};
