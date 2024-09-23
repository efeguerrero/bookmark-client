import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, X, Trash2 } from "lucide-react";
import { ReactNode } from "@tanstack/react-router";
import { useDeleteBookmark } from "@/lib/mutations";

export const Root = ({ children }: { children: ReactNode }) => {
  return (
    <Card className="relative w-full overflow-hidden rounded-lg sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.75rem)] xl:w-[calc(25%-0.75rem)]">
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
  return <h3 className="mb-1 truncate text-lg font-semibold">{children}</h3>;
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

export const Link = ({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="max-w-[calc(100%-4rem)] truncate text-sm text-primary hover:underline"
    >
      {children}
    </a>
  );
};

export const Date = ({ children }: { children: ReactNode }) => {
  return <span className="text-xs text-muted-foreground">{children}</span>;
};

type ActionProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "className"
> & {
  bookmarkId: string;
};

export const Delete = ({ bookmarkId, ...props }: ActionProps) => {
  const [showDelete, setShowDelete] = React.useState(false);
  const deleteBookmark = useDeleteBookmark();

  const handleDelete = (bookmarkId: string) => {
    if (showDelete) {
      deleteBookmark.mutate(bookmarkId, {
        onError: () => {
          console.log("error deleting bookmark");
        },
      });
    }

    setShowDelete(true);

    setTimeout(() => {
      if (deleteBookmark.isIdle || deleteBookmark.isError) {
        setShowDelete(false);
      }
    }, 3000);
  };

  return (
    <Button
      variant="ghost"
      disabled={deleteBookmark.isPending}
      onClick={() => handleDelete(bookmarkId)}
      size="icon"
      className="absolute right-2 top-2 h-8 w-8"
      aria-label="Delete bookmark"
      {...props}
    >
      {showDelete ? (
        <Trash2 className="h-4 w-4 text-destructive" />
      ) : (
        <X className="h-4 w-4" />
      )}
    </Button>
  );
};
