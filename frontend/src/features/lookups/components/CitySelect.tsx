import Select from "react-select";
import { useCities } from "../hooks/useCities";

type props = {
  value: number[],
  onChange: (value: number[]) => void;
}

export function CitySelect({ value , onChange } : props) {
  const { data } = useCities();

  return (
    <Select
      isMulti
      options={data}
      value={data?.filter((c) => value.includes(c.id))}
      onChange={(selected ) => onChange(selected.map((s) => s.id))}
      placeholder="اختر المدن"
      getOptionValue={(city) => String(city.id)}
      getOptionLabel={(city) => city.name}
      className="text-right"
      styles={{
        control: (base) => ({ ...base, direction: "rtl" }),
        menu: (base) => ({ ...base, direction: "rtl" }),
      }}
    />
  );
}
