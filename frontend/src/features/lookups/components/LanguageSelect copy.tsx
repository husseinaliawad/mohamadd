import { useLanguages } from "../hooks/useLanguages";
import type { Language } from "../types/Language";

interface Props {
  value: string | number;
  onChange: (value: string) => void;
  label?: string;
}

export function 

LanguageSelect({
  value,
  onChange,
  label = "كافة اللغات",
}: Props) {
  const { data, isLoading, error } = useLanguages();

  if (isLoading) {
    return <p className="text-gray-500">جاري تحميل اللغات...</p>;
  }

  if (error) {
    return <p className="text-red-500">حدث خطأ أثناء تحميل اللغات</p>;
  }

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border p-2 rounded-lg w-full"
    >
      <option value="" >{label}</option>

      {data?.map((lang: Language) => (
        <option key={lang.id} value={lang.id}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}
