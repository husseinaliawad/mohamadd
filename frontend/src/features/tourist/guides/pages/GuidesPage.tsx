import { useState } from "react";
import { useGuides } from "../hooks/useGuides";
import { FiltersBar } from "../components/FilterBar";
import { GuideList } from "../components/GuideList";
import type { Filters } from "../types/booking.types";

export function GuidesPage() {
  const [filters, setFilters] = useState<Filters>({
    cities: [],
    languages: [],
    sort: "",
  });

  const { data, isLoading } = useGuides(filters);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-2xl text-primary-500">جاري تحميل المرشدين...</p>
      </div>
    );
  }

  return (
    <div className="py-20 md:px-[20%]">
      <h1 className="text-lg md:text-2xl font-bold text-primary-500 md:text-center mb-6 px-3">
        المرشدين
      </h1>

      <FiltersBar filters={filters} setFilters={setFilters} />

      <GuideList data={data ?? []} />
    </div>
  );
}
