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
        onError: (error) => {
          if (error.message === "409") {
            toast.error("Bookmark already exists.");
          }

          if (error.message === "400") {
            toast.error("Invalid URL or we couldn't scan this website");
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
        placeholder="Search for a bookmark or create a new one."
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
