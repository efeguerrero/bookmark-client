import React from "react";
import { Input } from "@/components/ui/input";
import { customUrlSchema } from "@/lib/schemas";
import { useNewBookmark } from "@/lib/mutations";
import { useParams } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { bookmarkGroupQueries } from "@/lib/queries/queryOptions";
import { toast } from "sonner";

interface Props {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const BookmarkInput = ({ inputValue, setInputValue }: Props) => {
  const [formError, setFormError] = React.useState(false);
  const newBookmark = useNewBookmark();

  const groupSlug = useParams({ strict: false }).groupSlug || null;
  const { data: activeBookmarkGroup } = useSuspenseQuery(
    bookmarkGroupQueries.findBySlug(groupSlug),
  );

  // console.log(inputValue);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = customUrlSchema.safeParse(inputValue);

    if (result.error) {
      setFormError(true);
    }

    if (!result.error) {
      setFormError(false);
      const values = {
        url: inputValue,
        groupId: activeBookmarkGroup?.id || null,
      };

      newBookmark.mutate(values, {
        onError: (error: Error) => {
          if (error.message === "409") {
            toast.error("Bookmark already exists.");
          }

          if (error.message === "400") {
            toast.error(
              "We were unable to process the information from this website.",
            );
          }

          if (error.message !== "409" && error.message !== "400") {
            toast.error("There was an error! Please try again later.");
          }
        },
        onSettled: () => {
          setInputValue("");
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="url"
        onChange={(e) => setInputValue(e.currentTarget.value)}
        value={inputValue}
        type="text"
        enterKeyHint="search"
        placeholder="Search for a bookmark or create a new one."
        disabled={newBookmark.isPending}
        className="h-10 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.33%-0.75rem)]"
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
