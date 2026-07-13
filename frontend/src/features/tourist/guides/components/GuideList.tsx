import { GuideCard } from "../components/GuideCard";
import type { Guide } from "../types/booking.types";

export function GuideList({ data }: { data: Guide[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {data?.map((guide) => (
        <GuideCard key={guide.guide_id} {...guide} />
      ))}
    </div>
  );
}
  