import React from "react";
import { Input } from "@/components/ui/input";
import { customUrlSchema } from "@/lib/schemas";
import { normalizeUrl } from "@/lib/utils";

const BookmarkInput = () => {
  const [formError, setFormError] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const urlInput = form.url.value;
    const result = customUrlSchema.safeParse(urlInput);

    if (result.error) {
      console.log(urlInput, "this is not a valid url");
      setFormError(true);
    }

    if (!result.error) {
      form.reset();
      setFormError(false);
      const res = await fetch(normalizeUrl(urlInput), {
        mode: "no-cors",
      });
      const html = await res.text();
      console.log(html);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="url"
        type="text"
        placeholder="Insert a link to save it"
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
