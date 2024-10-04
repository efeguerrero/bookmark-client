import { HelpCircle, LogOut } from "lucide-react";
import { getRouteApi } from "@tanstack/react-router";
import { useAuth } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

const UserInfo = () => {
  const route = getRouteApi("/app/_layout");
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
        <DropdownMenuItem asChild className="hover:cursor-pointer">
          <Link to="/app/disclaimer">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Disclaimer</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span onClick={handleSignOut}>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserInfo;
