import React from "react";
import { Check, ChevronsUpDown, CirclePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { bookmarkGroupsQueryOptions } from "@/lib/queries/queryOptions";
import NewGroupDialog from "./new-group-dialog";

export default function GroupsMenu() {
  const [showNewGroupDialog, setShowNewGroupDialog] = React.useState(false);
  const { data: bookmarkGroups } = useSuspenseQuery(bookmarkGroupsQueryOptions);
  const params = useParams({ strict: false });
  const groupSlug = params.groupSlug || null;

  return (
    <React.Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-[200px] justify-between">
            {groupSlug
              ? bookmarkGroups.find((bookmark) => bookmark.slug === groupSlug)
                  ?.name
              : "All Groups"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="hover:cursor-pointer" asChild>
            <Link to="/app">
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  groupSlug ? "opacity-0" : "opacity-100",
                )}
              />
              All Groups
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {bookmarkGroups.map((bookmark) => (
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
          <DropdownMenuItem
            onSelect={() => setShowNewGroupDialog(true)}
            className="hover:cursor-pointer"
          >
            <CirclePlus className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <span>New Group</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <NewGroupDialog
        showNewGroupDialog={showNewGroupDialog}
        setShowNewGroupDialog={setShowNewGroupDialog}
      />
    </React.Fragment>
  );
}
