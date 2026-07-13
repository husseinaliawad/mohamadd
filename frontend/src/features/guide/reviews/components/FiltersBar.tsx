type FiltersBarProps = {
  selectedStars: number | "all";
  onChangeStars: (value: number | "all") => void;
  sortOrder: "newest" | "oldest";
  onChangeSortOrder: (value: "newest" | "oldest") => void;
};

const FiltersBar = ({
  selectedStars,
  onChangeStars,
  sortOrder,
  onChangeSortOrder,
}: FiltersBarProps) => {
  return (
    <div className="filters-bar">
      <div>
        <label>فلترة حسب النجوم:</label>
        <select
          value={selectedStars}
          onChange={(e) =>
            onChangeStars(
              e.target.value === "all" ? "all" : Number(e.target.value)
            )
          }
        >
          <option value="all">الكل</option>
          <option value="5">5 نجوم</option>
          <option value="4">4 نجوم</option>
          <option value="3">3 نجوم</option>
          <option value="2">2 نجوم</option>
          <option value="1">1 نجمة</option>
        </select>
      </div>

      <div>
        <label>ترتيب حسب:</label>
        <select
          value={sortOrder}
          onChange={(e) =>
            onChangeSortOrder(e.target.value as "newest" | "oldest")
          }
        >
          <option value="newest">الأحدث</option>
          <option value="oldest">الأقدم</option>
        </select>
      </div>
    </div>
  );
};

export default FiltersBar;
