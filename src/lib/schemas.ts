import { z } from "zod";

// UUID Schema and Validation
export const uuidSchema = z
  .string()
  .uuid({ message: "Invalid ID format" })
  .min(1, { message: "ID cannot be empty" });

// Bookmark Groups
export const bookmarkGroup = z.object({
  id: uuidSchema,
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

// URLs Schema
const urlRegex =
  // eslint-disable-next-line no-useless-escape
  /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

export const customUrlSchema = z.string().refine((val) => urlRegex.test(val), {
  message: "Invalid URL format",
});

// Bookmarks
export const bookmarkSchema = z.object({
  id: uuidSchema,
  title: z.string().min(1, { message: "Bookmark title cannot be empty" }),
  description: z.string().nullable(),
  favicon_url: z.string().nullable(),
  url: customUrlSchema,
  group_id: uuidSchema.nullable(),
  created_at: z.string().date(),
});
