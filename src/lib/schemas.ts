import { z } from "zod";

export const bookmarkGroup = z.object({
  id: z.string(),
  slug: z
    .string()
    .min(1, "Slug cannot be empty")
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      "Slug can only contain letters, numbers, hyphens, and underscores",
    ),
  name: z.string().min(1, "Name cannot be empty"),
});

export const newBookmarkGroup = bookmarkGroup.omit({ id: true });
