import { queryOptions } from "@tanstack/react-query";
import { getSessionToken } from "@/lib/sessionToken.ts";

export const bookmarkGroupsQueryOptions = queryOptions({
  queryKey: ["bookmarkGroups"],
  queryFn: async () => {
    const response = await fetch("http://localhost:8080/bookmark-group", {
      headers: {
        Authorization: `Bearer ${await getSessionToken()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching bookmark Groups");
    }

    return response.json();
  },
});
