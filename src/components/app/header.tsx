import React from "react";
import { HelpCircle, LogOut, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-react";
import { getRouteApi } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { bookmarkGroupsQueryOptions } from "@/lib/queries/queryOptions";

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [slug, setSlug] = React.useState("");
  const bookmarkGroups = useQuery(bookmarkGroupsQueryOptions);

  const route = getRouteApi("/app/");

  const { user } = route.useRouteContext();
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
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {slug
                ? bookmarkGroups.data.find((bookmark) => bookmark.slug === slug)
                    ?.name
                : "Select a Group..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {bookmarkGroups.data.map((bookmark) => (
                    <CommandItem
                      className="hover:cursor-pointer"
                      key={bookmark.id}
                      value={bookmark.slug}
                      onSelect={(currentValue) => {
                        setSlug(currentValue === slug ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          slug === bookmark.slug ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {bookmark.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
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
