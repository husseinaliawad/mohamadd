interface StatsCardProps {
  title: string;
  value: number | string;
  icon: string;
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <div className="bg-white shadow rounded-xl p-5 border border-purple-200 flex items-center gap-4">
      
      <div className="text-4xl">{icon}</div>

      <div>
        <h3 className="text-primary-900 font-semibold text-lg">{title}</h3>
        <p className="text-2xl font-bold text-primary-700 mt-1">{value}</p>
      </div>

    </div>
  );
}
