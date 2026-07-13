export default function TripsChart() {
  return (
    <div className="bg-white shadow rounded-xl p-5 border border-primary-200">
      <h3 className="text-xl font-semibold text-primary-900 mb-4">
        إحصائيات الرحلات
      </h3>

      <div className="h-40 flex items-end gap-3">
        <div className="w-10 bg-secondary-400 h-24 rounded"></div>
        <div className="w-10 bg-secondary-500 h-32 rounded"></div>
        <div className="w-10 bg-secondary-600 h-20 rounded"></div>
        <div className="w-10 bg-secondary-700 h-36 rounded"></div>
        <div className="w-10 bg-secondary-400 h-24 rounded"></div>
        <div className="w-10 bg-secondary-500 h-32 rounded"></div>
        <div className="w-10 bg-secondary-600 h-20 rounded"></div>
        <div className="w-10 bg-secondary-700 h-36 rounded"></div>
      </div>
    </div>
  );
}
