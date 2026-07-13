type Props = {
  label: string;
  name: string;
  register: any;
  errors: any;
  type?: string;
  children?: React.ReactNode; 
  col?: number;
  options?: object;
  value?: string; // إشارة القيمة لخيارات الراديو
  inputProps?: Record<string, any>;
};

export default function FormField({ label, name, register, errors, type = "text", children, col = 1, options = {}, value, inputProps = {} }: Props) {
  const inputClassName = "w-full rounded-lg border border-primary-200 bg-white px-3 py-2 text-right text-gray-700 shadow-sm outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100";
  const radioClassName = "w-4 h-4 accent-primary-600 cursor-pointer";

  // تصميم مخصص لحالة الـ Radio
  if (type === "radio") {
    return (
      <div className="flex items-center gap-2 cursor-pointer">
        <input 
          type="radio" 
          value={value} 
          className={radioClassName} 
          {...register(name, options)} 
          {...inputProps} 
        />
        <label className="text-sm font-medium text-primary-700 cursor-pointer">{label}</label>
      </div>
    );
  }

  // الحالات الافتراضية لباقي الحقول
  return (
    <div className={`space-y-1 md:col-span-${col}`}>
      <label className="block text-sm font-medium text-primary-700">{label}</label>

      {children ? (
        <select className={inputClassName} {...register(name, options)}>
          {children}
        </select>
      ) : type === "textarea" ? (
        <textarea className={inputClassName} rows={3} dir="rtl" {...register(name, options)} />
      ) : (
        <input type={type} className={inputClassName} {...register(name, options)} {...inputProps} />
      )}

      {errors[name] && <p className="text-sm text-red-500">{errors[name]?.message}</p>}
    </div>
  );
}
