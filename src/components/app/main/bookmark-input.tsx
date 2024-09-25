import React from "react";
import { Input } from "@/components/ui/input";
import { customUrlSchema } from "@/lib/schemas";
import { useNewBookmark } from "@/lib/mutations";
import { useParams } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { bookmarkGroupQueries } from "@/lib/queries/queryOptions";
import { useToast } from "@/hooks/use-toast";

const BookmarkInput = () => {
  const [formError, setFormError] = React.useState(false);
  const newBookmark = useNewBookmark();
  const { toast } = useToast();

  const groupSlug = useParams({ strict: false }).groupSlug || null;
  const { data: activeBookmarkGroup } = useSuspenseQuery(
    bookmarkGroupQueries.findBySlug(groupSlug),
  );

  console.log(activeBookmarkGroup);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const urlInput = form.url.value;
    const result = customUrlSchema.safeParse(urlInput);

    if (result.error) {
      setFormError(true);
    }

    if (!result.error) {
      setFormError(false);
      const values = {
        url: urlInput,
        groupId: activeBookmarkGroup?.id || null,
      };

      newBookmark.mutate(values, {
        onError: (error) => {
          if (error.message === "409") {
            toast({
              title: "There was an error!",
              description: "Bookmark already exists.",
              variant: "destructive",
            });
          }

          if (error.message === "400") {
            toast({
              title: "There was an error!",
              description: "Invalid URL or we couldn't scan this website",
              variant: "destructive",
            });
          }

          if (error.message !== "409" && error.message !== "400") {
            toast({
              title: "There was an error!",
              description: "Please try again later",
              variant: "destructive",
            });
          }
        },
        onSettled: () => {
          form.reset();
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="url"
        type="text"
        placeholder="Insert a link to save it"
        disabled={newBookmark.isPending}
        className="w-full rounded-lg"
      />
      {formError && (
        <p className="mt-1 text-xs text-destructive">
          Please enter a valid url.
        </p>
      )}
    </form>
  );
};

export default BookmarkInput;
