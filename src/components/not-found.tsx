import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import * as Icon from "@/components/ui/icons";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex flex-col items-center space-y-6">
        <Icon.logo className="size-14" />
        <h1 className="text-4xl font-bold sm:text-6xl">Not Found!</h1>
      </div>

      <div className="mb-8 max-w-sm space-y-4 text-muted-foreground">
        <p>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <Button variant="secondary" asChild>
        <Link replace={true} to="/" className="flex items-center space-x-2">
          <ArrowLeft className="size-4" />
          <span>Go Back Home</span>
        </Link>
      </Button>
    </div>
  );
}
