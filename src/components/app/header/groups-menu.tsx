import { Check, ChevronsUpDown, CirclePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "@tanstack/react-router";

import { useQuery } from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { bookmarkGroupsQueryOptions } from "@/lib/queries/queryOptions";

export default function GroupsMenu() {
  const { data: bookmarkGroups } = useQuery(bookmarkGroupsQueryOptions);

  const { groupSlug } = useParams({ from: "/app/_layout/$groupSlug" });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" className="w-[200px] justify-between">
          {groupSlug
            ? bookmarkGroups?.find((bookmark) => bookmark.slug === groupSlug)
                ?.name
            : "Select a Group..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {bookmarkGroups?.map((bookmark) => (
          <DropdownMenuItem
            key={bookmark.id}
            asChild
            className="hover:cursor-pointer"
          >
            <Link to="/app/$groupSlug" params={{ groupSlug: bookmark.slug }}>
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  groupSlug === bookmark.slug ? "opacity-100" : "opacity-0",
                )}
              />
              {bookmark.name}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="hover:cursor-pointer">
          <CirclePlus className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <span>New Group</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
