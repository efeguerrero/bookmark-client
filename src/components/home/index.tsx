import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import * as Icon from "@/components/ui/icons";
import { Separator } from "../ui/separator";

const logos = [
  "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.92 19.278v-7.272H8.363v-3.039h2.717V6.515c0-2.696 1.644-4.163 4.05-4.163 1.15 0 2.14.086 2.428.124v2.821h-1.666c-1.31 0-1.563.623-1.563 1.536v2.011h3.126l-.408 3.039h-2.718v7.273h-3.269z", // Facebook
  "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z", // Twitter
  "M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018c0-3.878 3.132-7.018 7-7.018c1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062c-2.31 0-4.187 1.956-4.187 4.273c0 2.315 1.877 4.277 4.187 4.277c2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474c0 4.01-2.677 6.86-6.72 6.86z", // Google
  "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.016 18.5h-2.472v-3.084c0-.918-.018-2.101-1.28-2.101-1.283 0-1.478.998-1.478 2.03v3.155H9.314V9.5h2.372v1.086h.033c.33-.624 1.135-1.283 2.335-1.283 2.496 0 2.96 1.643 2.96 3.78v5.417z", // LinkedIn
];

export default function Home() {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

        <div className="space-x-10">
          <Link to="/login" className="transition-colors hover:text-primary">
            Login
          </Link>
          <Link to="/register" className="transition-colors hover:text-primary">
            Register
          </Link>
        </div>
      </main>
    </div>
  );
}
