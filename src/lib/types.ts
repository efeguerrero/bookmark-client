import { z } from "zod";
import { bookmarkGroup, bookmarkSchema } from "./schemas";

export type BookmarkGroup = z.infer<typeof bookmarkGroup>;
export type Bookmark = z.infer<typeof bookmarkSchema>;
