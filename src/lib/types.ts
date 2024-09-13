import { z } from "zod";
import { bookmarkGroup } from "./schemas";

export type BookmarkGroup = z.infer<typeof bookmarkGroup>;
