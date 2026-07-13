import Select from "react-select";
import { useLanguages } from "../hooks/useLanguages";


type props = {
  value: Array<number>,
  onChange: (value: number[]) => void;
}

export function LanguageSelect({ value , onChange } : props) {
  const { data } = useLanguages();

  return (
    <Select
      isMulti
      options={data}
      value={data?.filter((c) => value.includes(c.id))}
      onChange={(selected ) => onChange(selected.map((s) => s.id))}
      placeholder="اختر اللغات"
      getOptionValue={(language) => String(language.id)}
      getOptionLabel={(language) => language.name}
      className="text-right"
      styles={{
        control: (base) => ({ ...base, direction: "rtl" }),
        menu: (base) => ({ ...base, direction: "rtl" }),
      }}
    />
  );
}
