import { createFileRoute } from "@tanstack/react-router";
import Disclaimer from "@/components/app/disclaimer/disclaimer";

export const Route = createFileRoute("/app/_layout/disclaimer")({
  component: Disclaimer,
});
