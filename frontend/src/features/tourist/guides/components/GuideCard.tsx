import { useNavigate } from "react-router-dom";
import type { Guide } from "../types/booking.types";
import RatingStars from "@/components/RatingStars";


export function GuideCard(guide: Guide) {
  const navigator = useNavigate();
  return (
    <div className="flex flex-col text-center max-w-100 border border-primary-600/30 rounded-xl p-4 shadow-lg hover:shadow-md transition bg-white/60 mx-auto">
      <div className="text-center w-full">
        <img
          src={guide.avatar}
          alt={guide.name}
          className="w-16 h-16 rounded-full object-cover mx-auto"
        />
      </div>


      <div className="flex-1 flex  flex-col justify-between mt-4">
        <h3 className="text-lg font-semibold">{guide.name}</h3>

        <p className="text-sm text-primary-600 font-bold">
          <span className=" text-gray-500 font-normal">المدن:</span>  {guide.cities}
        </p>

        <p className="text-sm text-primary-600 font-bold ">
          <span className=" text-gray-500 font-normal">اللغات:</span>  {guide.languages}
        </p>

        <p className="text-sm text-primary-600 font-bold">
          <span className=" text-gray-500 font-normal">عدد الحجوزات:</span>  {guide.bookings_count}
        </p>
        <p className="text-sm text-primary-600 font-bold">
          <span className=" text-gray-500 font-normal">عدد المراجعات:</span>  {guide.reviews_count}
        </p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="font-bold text-primary">
          {guide.daily_price} ل.س / يوم
        </span>
        <span className="flex gap-x-2 text-gray-400">
          {guide.rating?.toFixed(2)}
          <RatingStars rating={guide.rating} />
        </span>
      </div>

      <button
        className="mt-4 w-full bg-secondary-500 text-white py-1 rounded-lg"
        onClick={() => {
          navigator(`/tourist/guides/${guide.guide_id}`);
        }}
      >
        عرض التفاصيل
      </button>
    </div>
  );
}
