import { CitySelect } from "@/features/lookups/components/CitySelect";
import { LanguageSelect } from "@/features/lookups/components/LanguageSelect";
import type { Filters } from "../types/booking.types";

interface Props {
  filters: Filters;
  setFilters: (f: Filters) => void;
}

export function FiltersBar({ filters, setFilters }: Props) {
  return (
    <div className="bg-white/50 shadow-md p-4 rounded-xl mb-6">
      <h2 className="text-xl font-bold text-primary-500 mb-4 text-center">
        ابحث عن مرشد
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        
        <CitySelect
          value={filters.cities}
          onChange={(value) => setFilters({ ...filters, cities: value })}
        />

        <LanguageSelect
          value={filters.languages}
          onChange={(value) => setFilters({ ...filters, languages: value })}
        />

        <select
          name="sort"
          value={filters.sort}
          onChange={(e) =>
            setFilters({ ...filters, sort: e.target.value })
          }
          className="border border-gray-300 p-2 rounded-sm bg-white"
        >
          <option value="" hidden>الترتيب</option>
          <option value="price_asc">السعر: من الأقل للأعلى</option>
          <option value="price_desc">السعر: من الأعلى للأقل</option>
          <option value="rating_desc">الأعلى تقييماً</option>
        </select>

      </div>
    </div>
  );
}
