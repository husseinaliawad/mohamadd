import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Compass, LocateFixed, Route } from "lucide-react";
import { getCities } from "@/features/lookups/api/getCities.api";
import { getPublicCategories } from "@/features/lookups/api/getCategories.api";
import { getPublicInterests } from "@/features/lookups/api/getInterests.api";
import { createAiTrip, getAiTrips, getNearbyPlaces } from "../api/aiTrip.api";
import type { ActivityLevel, AiTrip, AiTripRequest, MlMetrics, NearbyRequest, NearbyResult, TripPace } from "../types/aiTrip.types";

const paceOptions: Array<{ value: TripPace; label: string }> = [
  { value: "slow", label: "هادئة" },
  { value: "medium", label: "متوسطة" },
  { value: "intensive", label: "مكثفة" },
];

const activityOptions: Array<{ value: ActivityLevel; label: string }> = [
  { value: "relax", label: "استرخاء" },
  { value: "sensible", label: "متوازن" },
  { value: "vigour", label: "نشاط عال" },
];

export default function AiTripPage() {
  const queryClient = useQueryClient();
  const [activeTrip, setActiveTrip] = useState<AiTrip | null>(null);
  const [nearby, setNearby] = useState<NearbyResult | null>(null);
  const [tripForm, setTripForm] = useState<AiTripRequest>({
    title: "رحلتي الذكية",
    day_count: 2,
    start_time: "09:00",
    trip_pace: "medium",
    preferred_activity_level: "sensible",
    city_ids: [],
    category_ids: [],
    interest_ids: [],
    is_outdoor: null,
  });
  const [nearbyForm, setNearbyForm] = useState<NearbyRequest>({
    latitude: 33.5138,
    longitude: 36.2765,
    radius_km: 15,
    category_id: 1,
    interest_ids: [],
    limit: 12,
    is_outdoor: null,
  });

  const citiesQuery = useQuery({ queryKey: ["public-cities"], queryFn: getCities });
  const categoriesQuery = useQuery({ queryKey: ["public-categories"], queryFn: getPublicCategories });
  const interestsQuery = useQuery({ queryKey: ["public-interests"], queryFn: getPublicInterests });
  const tripsQuery = useQuery({ queryKey: ["ai-trips"], queryFn: getAiTrips });

  const planMutation = useMutation({
    mutationFn: createAiTrip,
    onSuccess: (trip) => {
      setActiveTrip(trip);
      queryClient.invalidateQueries({ queryKey: ["ai-trips"] });
      toast.success("تم إنشاء خطة الرحلة بالذكاء");
    },
  });

  const nearbyMutation = useMutation({
    mutationFn: getNearbyPlaces,
    onSuccess: (result) => {
      setNearby(result);
      toast.success("تم جلب الأماكن القريبة");
    },
  });

  const categories = categoriesQuery.data ?? [];
  const interests = interestsQuery.data ?? [];
  const cities = citiesQuery.data ?? [];
  const selectedNearbyCategoryId = categories.some((category) => category.id === nearbyForm.category_id)
    ? nearbyForm.category_id
    : categories[0]?.id ?? nearbyForm.category_id;

  const toggle = (items: number[] = [], id: number) =>
    items.includes(id) ? items.filter((item) => item !== id) : [...items, id];

  const submitTrip = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    planMutation.mutate({
      ...tripForm,
      budget_max: tripForm.budget_max || undefined,
      start_date: tripForm.start_date || undefined,
    });
  };

  const submitNearby = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    nearbyMutation.mutate({
      ...nearbyForm,
      category_id: selectedNearbyCategoryId,
      budget: nearbyForm.budget || undefined,
    });
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("المتصفح لا يدعم تحديد الموقع");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setNearbyForm((form) => ({
          ...form,
          latitude: Number(position.coords.latitude.toFixed(6)),
          longitude: Number(position.coords.longitude.toFixed(6)),
        }));
      },
      () => toast.error("تعذر الحصول على الموقع الحالي")
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-12 px-4 md:px-8" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl md:text-3xl font-bold text-primary-700">الذكاء السياحي</h1>
          <p className="text-gray-600 mt-2">تخطيط رحلة ذكية واستكشاف أماكن قريبة عبر خدمة AI مربوطة بالباك.</p>
        </header>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <form onSubmit={submitTrip} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Route className="text-primary-600" />
              <h2 className="text-xl font-bold text-gray-800">Smart Trip Planner</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input label="اسم الرحلة" value={tripForm.title ?? ""} onChange={(value) => setTripForm({ ...tripForm, title: value })} />
              <Input label="عدد الأيام" type="number" value={tripForm.day_count} onChange={(value) => setTripForm({ ...tripForm, day_count: Number(value) })} />
              <Input label="الميزانية" type="number" value={tripForm.budget_max ?? ""} onChange={(value) => setTripForm({ ...tripForm, budget_max: value ? Number(value) : undefined })} />
              <Input label="تاريخ البداية" type="date" value={tripForm.start_date ?? ""} onChange={(value) => setTripForm({ ...tripForm, start_date: value })} />
              <Input label="وقت البداية" type="time" value={tripForm.start_time ?? "09:00"} onChange={(value) => setTripForm({ ...tripForm, start_time: value })} />
              <SelectOutdoor value={tripForm.is_outdoor} onChange={(value) => setTripForm({ ...tripForm, is_outdoor: value })} />
            </div>

            <Segmented label="سرعة الرحلة" options={paceOptions} value={tripForm.trip_pace ?? "medium"} onChange={(value) => setTripForm({ ...tripForm, trip_pace: value as TripPace })} />
            <Segmented label="مستوى النشاط" options={activityOptions} value={tripForm.preferred_activity_level ?? "sensible"} onChange={(value) => setTripForm({ ...tripForm, preferred_activity_level: value as ActivityLevel })} />

            <CheckGroup label="المدن" items={cities} selected={tripForm.city_ids ?? []} onToggle={(id) => setTripForm({ ...tripForm, city_ids: toggle(tripForm.city_ids, id) })} />
            <CheckGroup label="التصنيفات" items={categories} selected={tripForm.category_ids ?? []} onToggle={(id) => setTripForm({ ...tripForm, category_ids: toggle(tripForm.category_ids, id) })} />
            <CheckGroup label="الاهتمامات" items={interests} selected={tripForm.interest_ids ?? []} onToggle={(id) => setTripForm({ ...tripForm, interest_ids: toggle(tripForm.interest_ids, id) })} />

            <button disabled={planMutation.isPending} className="px-6 py-2 rounded-md gradient-primary text-white font-semibold disabled:opacity-60">
              {planMutation.isPending ? "جاري التخطيط..." : "إنشاء الخطة"}
            </button>
          </form>

          <form onSubmit={submitNearby} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Compass className="text-secondary-700" />
              <h2 className="text-xl font-bold text-gray-800">Nearby Places Explore</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input label="خط العرض" type="number" value={nearbyForm.latitude} onChange={(value) => setNearbyForm({ ...nearbyForm, latitude: Number(value) })} />
              <Input label="خط الطول" type="number" value={nearbyForm.longitude} onChange={(value) => setNearbyForm({ ...nearbyForm, longitude: Number(value) })} />
              <Input label="نطاق البحث كم" type="number" value={nearbyForm.radius_km} onChange={(value) => setNearbyForm({ ...nearbyForm, radius_km: Number(value) })} />
              <Input label="الميزانية" type="number" value={nearbyForm.budget ?? ""} onChange={(value) => setNearbyForm({ ...nearbyForm, budget: value ? Number(value) : undefined })} />
              <label className="space-y-1">
                <span className="text-sm font-medium text-gray-700">التصنيف</span>
                <select className="w-full border border-gray-300 rounded-md p-2 bg-white" value={selectedNearbyCategoryId} onChange={(event) => setNearbyForm({ ...nearbyForm, category_id: Number(event.target.value) })}>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </label>
              <Input label="عدد النتائج" type="number" value={nearbyForm.limit ?? 12} onChange={(value) => setNearbyForm({ ...nearbyForm, limit: Number(value) })} />
            </div>

            <CheckGroup label="الاهتمامات" items={interests} selected={nearbyForm.interest_ids ?? []} onToggle={(id) => setNearbyForm({ ...nearbyForm, interest_ids: toggle(nearbyForm.interest_ids, id) })} />

            <div className="flex flex-col md:flex-row gap-3">
              <button type="button" onClick={useCurrentLocation} className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-secondary-600 text-secondary-700">
                <LocateFixed size={18} />
                استخدام موقعي
              </button>
              <button disabled={nearbyMutation.isPending} className="px-6 py-2 rounded-md bg-secondary-600 text-white font-semibold disabled:opacity-60">
                {nearbyMutation.isPending ? "جاري البحث..." : "استكشف"}
              </button>
            </div>
          </form>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <TripPanel trip={activeTrip ?? tripsQuery.data?.[0] ?? null} />
          <NearbyPanel nearby={nearby} />
        </section>

        <section className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">الرحلات المحفوظة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(tripsQuery.data ?? []).map((trip) => (
              <button key={trip.id} onClick={() => setActiveTrip(trip)} className="text-right border border-gray-200 rounded-md p-4 hover:border-primary-400">
                <h3 className="font-bold text-primary-700">{trip.title}</h3>
                <p className="text-sm text-gray-600">{trip.day_count} أيام - {trip.total_estimated_cost ?? 0}</p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function Input({ label, type = "text", value, onChange }: { label: string; type?: string; value: string | number; onChange: (value: string) => void }) {
  return (
    <label className="space-y-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <input className="w-full border border-gray-300 rounded-md p-2" type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function SelectOutdoor({ value, onChange }: { value?: boolean | null; onChange: (value: boolean | null) => void }) {
  return (
    <label className="space-y-1">
      <span className="text-sm font-medium text-gray-700">أماكن خارجية</span>
      <select className="w-full border border-gray-300 rounded-md p-2 bg-white" value={value === null || value === undefined ? "" : String(value)} onChange={(event) => onChange(event.target.value === "" ? null : event.target.value === "true")}>
        <option value="">الكل</option>
        <option value="true">نعم</option>
        <option value="false">لا</option>
      </select>
    </label>
  );
}

function Segmented({ label, options, value, onChange }: { label: string; options: Array<{ value: string; label: string }>; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => (
          <button type="button" key={option.value} onClick={() => onChange(option.value)} className={`border rounded-md py-2 text-sm ${value === option.value ? "border-primary-600 bg-primary-50 text-primary-700 font-bold" : "border-gray-200 text-gray-700"}`}>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function CheckGroup({ label, items, selected, onToggle }: { label: string; items: Array<{ id: number; name: string }>; selected: number[]; onToggle: (id: number) => void }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <label key={item.id} className={`cursor-pointer border rounded-md px-3 py-1.5 text-sm ${selected.includes(item.id) ? "border-secondary-600 bg-secondary-50 text-secondary-800" : "border-gray-200 text-gray-700"}`}>
            <input type="checkbox" className="sr-only" checked={selected.includes(item.id)} onChange={() => onToggle(item.id)} />
            {item.name}
          </label>
        ))}
      </div>
    </div>
  );
}

function TripPanel({ trip }: { trip: AiTrip | null }) {
  if (!trip) return <Empty title="خطة الرحلة" text="أنشئ خطة بالذكاء لعرض البرنامج اليومي هنا." />;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800">{trip.title}</h2>
      <p className="text-sm text-gray-600 mb-4">{trip.day_count} أيام - تكلفة تقديرية {trip.total_estimated_cost ?? 0}</p>
      <MlMetricsPanel metrics={trip.ml_metrics} />
      <div className="space-y-5">
        {trip.days.map((day) => (
          <div key={day.day_number} className="border-r-4 border-primary-500 pr-4">
            <h3 className="font-bold text-primary-700 mb-3">اليوم {day.day_number}</h3>
            <div className="space-y-3">
              {day.places.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-gray-900">{item.place.name}</h4>
                      <p className="text-sm text-gray-600">{item.place.city?.name} - {item.place.category?.name}</p>
                    </div>
                    <span className="text-primary-700 font-semibold">{item.start_time.slice(0, 5)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">مدة {item.duration_minutes} دقيقة، الطريق {item.travel_minutes} دقيقة</p>
                  {item.note && <p className="text-sm text-gray-500 mt-1">{item.note}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NearbyPanel({ nearby }: { nearby: NearbyResult | null }) {
  if (!nearby) return <Empty title="الأماكن القريبة" text="نفذ بحث Nearby Places Explore لعرض النتائج هنا." />;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <h2 className="text-xl font-bold text-gray-800 mb-4">الأماكن القريبة ({nearby.count})</h2>
      <MlMetricsPanel metrics={nearby.ml_metrics} />
      <div className="space-y-3">
        {nearby.places.map((place) => (
          <div key={place.id} className="border border-gray-200 rounded-md p-3">
            <h3 className="font-bold text-gray-900">{place.name}</h3>
            <p className="text-sm text-gray-600">{place.city?.name} - {place.category?.name}</p>
            <p className="text-sm text-gray-500 mt-1">يبعد {place.distance_km ?? 0} كم - تكلفة {place.cost ?? 0}</p>
            {place.ml_score !== undefined && <p className="text-sm text-primary-700 mt-1">ML score: {place.ml_score}</p>}
            {place.reason && <p className="text-sm text-secondary-700 mt-1">{place.reason}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function MlMetricsPanel({ metrics }: { metrics?: MlMetrics | null }) {
  if (!metrics) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4 text-sm">
      <Metric label="Accuracy" value={metrics.accuracy} />
      <Metric label="Precision" value={metrics.precision} />
      <Metric label="Recall" value={metrics.recall} />
      <Metric label="F1" value={metrics.f1} />
      <p className="col-span-2 md:col-span-4 text-xs text-gray-500">
        Synthetic samples: {metrics.samples ?? 0}
      </p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value?: number | null }) {
  return (
    <div className="border border-gray-200 rounded-md px-3 py-2 bg-gray-50">
      <p className="text-gray-500">{label}</p>
      <p className="font-bold text-primary-700">{value === null || value === undefined ? "N/A" : `${Math.round(value * 100)}%`}</p>
    </div>
  );
}

function Empty({ title, text }: { title: string; text: string }) {
  return (
    <div className="bg-white border border-dashed border-gray-300 rounded-lg p-8 text-center">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
