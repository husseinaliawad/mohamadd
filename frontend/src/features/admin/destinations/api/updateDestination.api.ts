import axios from "@/lib/axios";

export async function updateDestination(id: number, data: any): Promise<void> {
  const formData = new FormData();
  formData.append("city_id", data.city_id.toString());
  formData.append("category_id", data.category_id.toString());
  formData.append("name", data.name);
  
  if (data.description) formData.append("description", data.description);
  if (data.phone) formData.append("phone", data.phone);
  if (data.address) formData.append("address", data.address);
  if (data.cost) formData.append("cost", data.cost.toString());
  if (data.expected_duration_minutes) formData.append("expected_duration_minutes", data.expected_duration_minutes.toString());
  if (data.activity_level) formData.append("activity_level", data.activity_level);
  if (data.is_outdoor !== undefined) formData.append("is_outdoor", data.is_outdoor.toString());
  if (data.best_seasons && data.best_seasons.length > 0) {
    data.best_seasons.forEach((season: string) => formData.append("best_seasons[]", season));
  }
  if (data.recommended_times && data.recommended_times.length > 0) {
    data.recommended_times.forEach((time: string) => formData.append("recommended_times[]", time));
  }
  if (data.opening_hours) {
    const hoursArray = typeof data.opening_hours === 'string' 
      ? data.opening_hours.split(',').map(h => h.trim()).filter(h => h)
      : data.opening_hours;
    if (hoursArray.length > 0) {
      hoursArray.forEach((hour: string) => formData.append("opening_hours[]", hour));
    }
  }
  if (data.average_rating) formData.append("average_rating", data.average_rating.toString());
  if (data.reviews_count) formData.append("reviews_count", data.reviews_count.toString());
  if (data.latitude) formData.append("latitude", data.latitude.toString());
  if (data.longitude) formData.append("longitude", data.longitude.toString());
  
  if (data.images && data.images.length > 0) {
    data.images.forEach((image: File) => {
      formData.append("images[]", image);
    });
  }
  
  if (data.interests && data.interests.length > 0) {
    data.interests.forEach((interestId: number) => {
      formData.append("interests[]", interestId.toString());
    });
  }
  
  // Handle existing images (for edit mode)
  if (data.existing_images && data.existing_images.length > 0) {
    data.existing_images.forEach((image: string) => {
      formData.append("existing_images[]", image);
    });
  }
  
  // Handle images to delete
  if (data.images_to_delete && data.images_to_delete.length > 0) {
    data.images_to_delete.forEach((imageId: number) => {
      formData.append("images_to_delete[]", imageId.toString());
    });
  }
  
  await axios.put(`/admin/places/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
