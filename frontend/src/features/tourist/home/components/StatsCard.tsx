interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="bg-white shadow rounded-xl p-2 flex flex-col items-center text-center border border-emerald-100">
      <div className="text-2xl">{icon}</div>
      <h3 className="text-emerald-700 font-semibold mt-2">{title}</h3>
      <p className="text-xl font-bold text-emerald-900 mt-1">{value}</p>
    </div>
  );
}
