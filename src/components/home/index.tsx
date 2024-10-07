import { Link } from "@tanstack/react-router";
import * as Icon from "@/components/ui/icons";
import { Separator } from "../ui/separator";

export default function Home() {
  return (
    <div className="grid min-h-dvh place-items-center pb-16">
      <main className="mx-auto max-w-lg space-y-8">
        <div className="flex items-center space-x-4">
          <Icon.logo className="size-14" />
          <h1 className="text-6xl font-bold">Bookmarks</h1>
        </div>

        <div className="space-y-4 text-muted-foreground">
          <p>
            Welcome to Bookmarks, a personal space for saving, organizing, and
            retrieving web links.
          </p>
          <p>
            This app was built for my own use, but anyone is welcome to use it
            for free. Don't expect support, bug fixes, or any other obligations,
            as this is a personal app and will remain so.
          </p>
        </div>
        <Separator className="w-full" />

        <div className="flex items-center justify-between">
          <div className="space-x-10">
            <Link to="/login" className="transition-colors hover:text-primary">
              Login
            </Link>
            <Link
              to="/register"
              className="transition-colors hover:text-primary"
            >
              Register
            </Link>
          </div>
          <a
            target="_blank"
            href="https://franguerrero.dev/"
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            {`{fg}`}
          </a>
        </div>
      </main>
    </div>
  );
}