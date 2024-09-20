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

const urlRegex =
  // eslint-disable-next-line no-useless-escape
  /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

export const customUrlSchema = z.string().refine((val) => urlRegex.test(val), {
  message: "Invalid URL format",
});
