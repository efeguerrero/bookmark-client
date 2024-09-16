import {
  HelpCircle,
  LogOut,
  Check,
  ChevronsUpDown,
  CirclePlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import { getRouteApi, Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { bookmarkGroupsQueryOptions } from "@/lib/queries/queryOptions";

export default function Header() {
  const { data: bookmarkGroups } = useQuery(bookmarkGroupsQueryOptions);

  const route = getRouteApi("/app/_layout");
  const { user } = route.useRouteContext();
  const { groupSlug } = useParams({ from: "/app/_layout/$groupSlug" });

  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error during sign out:", error); //
    }
  };

  return (
    <header className="flex items-center justify-between border-b p-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-semibold">Bookmarker</h1>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className="w-[200px] justify-between">
              {groupSlug
                ? bookmarkGroups?.find(
                    (bookmark) => bookmark.slug === groupSlug,
                  )?.name
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
                <Link
                  to="/app/$groupSlug"
                  params={{ groupSlug: bookmark.slug }}
                >
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
            <DropdownMenuItem className="flex items-center hover:cursor-pointer">
              <CirclePlus className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <span>New Group</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-medium">{user?.fullName}</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 overflow-hidden rounded-full p-0"
            >
              <img src={user?.imageUrl} alt="User Avatar" className="w-full" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="hover:cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span onClick={handleSignOut}>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
