import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSuggestedPlaces } from "../hooks/useSuggestedPlaces";
import SuggestedPlaceTable from "../components/SuggestedPlaceTable";
import SuggestedPlaceDetails from "../components/SuggestedPlaceDetails";
import type { SuggestedPlace } from "../types/suggestedPlace.type";

export default function SuggestedPlacesPage() {
  const navigate = useNavigate();
  const { suggestedPlaces, isLoading, updateSuggestionStatus, isUpdating } = useSuggestedPlaces();
  const [selectedPlace, setSelectedPlace] = useState<SuggestedPlace | null>(null);

  const handleApprove = (id: number, adminNotes?: string) => {
    if (window.confirm("هل أنت متأكد من قبول هذا الاقتراح؟ سيتم نقلك إلى صفحة إضافة الوجهة السياحية.")) {
      updateSuggestionStatus({ id, data: { status: "approved", admin_notes: adminNotes } });
      // Navigate to destination creation page with suggestion data
      const suggestion = suggestedPlaces.find(p => p.id === id);
      if (suggestion) {
        navigate(`/admin/destinations/create`, { state: { fromSuggestion: suggestion } });
      }
    }
  };

  const handleReject = (id: number, adminNotes?: string) => {
    updateSuggestionStatus({ id, data: { status: "rejected", admin_notes: adminNotes } });
  };

  const handleView = (place: SuggestedPlace) => {
    setSelectedPlace(place);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">جاري التحميل...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">إدارة اقتراحات الأماكن</h1>

      <SuggestedPlaceTable
        suggestedPlaces={suggestedPlaces}
        onApprove={handleApprove}
        onReject={handleReject}
        onView={handleView}
        isUpdating={isUpdating}
      />

      {selectedPlace && (
        <SuggestedPlaceDetails
          place={selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </div>
  );
}
