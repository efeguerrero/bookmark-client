import * as Card from "./bookmark-card-elements";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookmarkCardSkeleton() {
  return (
    <Card.Root>
      <Card.Body>
        <Skeleton className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-muted" />
        <Card.Content>
          <Skeleton className="mb-2 h-6 w-full rounded-sm bg-muted" />
          <Skeleton className="mb-4 h-12 w-full rounded-sm bg-muted" />
          <Card.Footer>
            <Skeleton className="h-4 w-full rounded-sm bg-muted" />
          </Card.Footer>
        </Card.Content>
      </Card.Body>
    </Card.Root>
  );
}
