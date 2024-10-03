import React from "react";
import {
  Check,
  ChevronsUpDown,
  CirclePlus,
  CircleX,
  FilePenLine,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "@tanstack/react-router";
import { useSuspenseQuery, useMutationState } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { bookmarkGroupQueries } from "@/lib/queries/queryOptions";
import NewGroupDialog from "@/components/app/header/new-group-dialog";
import DeleteGroupDialog from "@/components/app/header/delete-group-dialog";
import EditGroupDialog from "@/components/app/header/update-group-dialog";

export default function GroupsMenu({ className }: { className?: string }) {
  const [showNewGroupDialog, setShowNewGroupDialog] = React.useState(false);
  const [showDeleteGroupDialog, setShowDeleteGroupDialog] =
    React.useState(false);
  const [showEditGroupDialog, setShowEditGroupDialog] = React.useState(false);
  const { data: bookmarkGroups } = useSuspenseQuery(bookmarkGroupQueries.all());
  const params = useParams({ strict: false });
  const groupSlug = params.groupSlug || null;

  const newBookmarkMutation = useMutationState({
    filters: { mutationKey: ["newBookmark"], status: "pending" },
  });

  return (
    <React.Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger
          disabled={newBookmarkMutation.length ? true : false}
          asChild
        >
          <Button
            variant="outline"
            className={cn("justify-between", className)}
          >
            <span className="truncate">
              {groupSlug
                ? bookmarkGroups.find((bookmark) => bookmark.slug === groupSlug)
                    ?.name
                : "All Groups"}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
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
          {bookmarkGroups.length ? (
            bookmarkGroups.map((bookmark) => (
              <DropdownMenuItem
                key={bookmark.id}
                asChild
                className="hover:cursor-pointer"
              >
                <Link
                  to="/app/$groupSlug"
                  params={{ groupSlug: bookmark.slug }}
                  className="truncate"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 shrink-0",
                      groupSlug === bookmark.slug ? "opacity-100" : "opacity-0",
                    )}
                  />
                  <span className="truncate">{bookmark.name}</span>
                </Link>
              </DropdownMenuItem>
            ))
          ) : (
            <p className="my-6 text-center text-xs text-muted-foreground">
              No custom groups created
            </p>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowNewGroupDialog(true)}
            className="hover:cursor-pointer"
          >
            <CirclePlus className="mr-2 h-4 w-4 shrink-0 opacity-100" />
            <span className="">New Group</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onSelect={() => setShowEditGroupDialog(true)}
            disabled={!groupSlug}
          >
            <FilePenLine className="mr-2 h-4 w-4 shrink-0 opacity-100" />
            <span className="">Edit Group</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => setShowDeleteGroupDialog(true)}
            className="hover:cursor-pointer"
            disabled={!groupSlug}
          >
            <CircleX className="mr-2 h-4 w-4 shrink-0 opacity-100" />
            <span className="">Delete Group</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <NewGroupDialog
        showNewGroupDialog={showNewGroupDialog}
        setShowNewGroupDialog={setShowNewGroupDialog}
      />
      <DeleteGroupDialog
        showDeleteGroupDialog={showDeleteGroupDialog}
        setShowDeleteGroupDialog={setShowDeleteGroupDialog}
      />
      <EditGroupDialog
        showEditGroupDialog={showEditGroupDialog}
        setShowEditGroupDialog={setShowEditGroupDialog}
      />
    </React.Fragment>
  );
}
