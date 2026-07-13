import { useLocation, useNavigate } from "react-router-dom";
import { useDestinations } from "../hooks/useDestinations";
import DestinationForm from "../components/DestinationForm";
import type { SuggestedPlace } from "../../suggested-places/types/suggestedPlace.type";
import type { DestinationFormData } from "../types/destination.type";

export default function CreateDestinationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { createDestination, isCreating } = useDestinations();
  
  const fromSuggestion = location.state?.fromSuggestion as SuggestedPlace | undefined;

  const getInitialValues = (): Partial<DestinationFormData> => {
    if (fromSuggestion) {
      return {
        city_id: fromSuggestion.city_id || 0,
        name: fromSuggestion.name,
        description: fromSuggestion.description,
        latitude: fromSuggestion.latitude,
        longitude: fromSuggestion.longitude,
        category_id: 0, // This needs to be selected by admin
      };
    }
    return {};
  };

  const handleSubmit = (data: DestinationFormData) => {
    createDestination(data, {
      onSuccess: () => {
        navigate("/admin/destinations");
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          {fromSuggestion ? "إضافة وجهة سياحية من الاقتراح" : "إضافة وجهة سياحية جديدة"}
        </h1>
        <button
          onClick={() => navigate("/admin/destinations")}
          className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          إلغاء
        </button>
      </div>

      {fromSuggestion && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>معلومات من الاقتراح:</strong> يتم ملء بعض الحقول تلقائياً من بيانات الاقتراح. يرجى إكمال المعلومات المتبقية.
          </p>
        </div>
      )}

      <div className="bg-white shadow rounded-xl p-6 border border-purple-200">
        <DestinationForm
          onSubmit={handleSubmit}
          defaultValues={getInitialValues()}
          isSubmitting={isCreating}
        />
      </div>
    </div>
  );
}
