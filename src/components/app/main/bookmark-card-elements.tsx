import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { ReactNode } from "@tanstack/react-router";

type CardRoot = React.HTMLAttributes<HTMLDivElement> & { children: ReactNode };

export const Root = ({ children, className, ...props }: CardRoot) => {
  return (
    <Card
      {...props}
      className={cn(
        "relative w-full overflow-hidden rounded-lg sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.75rem)] xl:w-[calc(25%-0.75rem)]",
        className,
      )}
    >
      {children}
    </Card>
  );
};

export const Body = ({ children }: { children: ReactNode }) => {
  return (
    <CardContent className="flex items-start space-x-4 p-6">
      {children}
    </CardContent>
  );
};

export const Content = ({ children }: { children: ReactNode }) => {
  return <div className="min-w-0 flex-grow">{children}</div>;
};

export const Icon = ({ imageURL }: { imageURL: string | null }) => {
  return (
    <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
      {imageURL ? (
        <img
          src={imageURL}
          alt=""
          className="h-full w-full object-scale-down"
        />
      ) : (
        <Globe className="size-6" />
      )}
    </div>
  );
};

export const Title = ({ children }: { children: ReactNode }) => {
  return (
    <h3 className="mb-1 mr-2 truncate text-lg font-semibold">{children}</h3>
  );
};

export const Description = ({ children }: { children: ReactNode }) => {
  return (
    <p className="mb-2 line-clamp-2 text-xs text-muted-foreground">
      {children}
    </p>
  );
};

export const Footer = ({ children }: { children: ReactNode }) => {
  return <div className="flex items-center justify-between">{children}</div>;
};

type LinkProps = React.HTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
};

export const Link = ({ children, className, href, ...props }: LinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "max-w-[calc(100%-4rem)] truncate text-sm text-primary hover:underline",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
};

export const Date = ({ children }: { children: ReactNode }) => {
  return <span className="text-xs text-muted-foreground">{children}</span>;
};

// type DeleteProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
//   children: ReactNode;
// };

// export const Action = ({ children, className, ...props }: DeleteProps) => {
//   return (
//     <Button
//       variant="ghost"
//       size="icon"
//       className={cn("absolute right-2 top-2 h-8 w-8", className)}
//       aria-label="Delete bookmark"
//       {...props}
//     >
//       {children}
//     </Button>
//   );
// };
