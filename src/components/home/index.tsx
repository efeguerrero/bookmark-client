import { Link } from "@tanstack/react-router";
import * as Icon from "@/components/ui/icons";
import { Separator } from "../ui/separator";

export default function Home() {
  return (
    <div className="grid min-h-dvh place-items-center pb-16">
      <main className="mx-auto max-w-lg space-y-8 px-4 sm:px-0">
        <div className="flex animate-fade-in-blur items-center space-x-2 [animation-delay:calc(1*var(--animation-delay-step))] sm:space-x-4">
          <Icon.logo className="size-12 sm:size-14" />
          <h1 className="text-4xl font-bold sm:text-6xl">Bookmarks</h1>
        </div>

        <div className="space-y-4 text-muted-foreground">
          <p className="animate-fade-in-blur [animation-delay:calc(2*var(--animation-delay-step))]">
            Welcome to Bookmarks, a personal space for saving, organizing, and
            retrieving web links.
          </p>
          <p className="animate-fade-in-blur [animation-delay:calc(3*var(--animation-delay-step))]">
            This app was built for my own use, but anyone is welcome to use it
            for free. Don't expect support, bug fixes, or any other obligations,
            as this is a personal app and will remain so.
          </p>
        </div>
        <Separator className="w-full animate-fade-in-blur [animation-delay:calc(4*var(--animation-delay-step))]" />

        <div className="flex animate-fade-in-blur items-center justify-between [animation-delay:calc(5*var(--animation-delay-step))]">
          <div className="space-x-8 sm:space-x-10">
            <Link
              to="/login/$"
              className="transition-colors hover:text-primary"
            >
              Login
            </Link>
            <Link
              to="/register/$"
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
