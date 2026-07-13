import api from "@/lib/axios";
import type { guideProfileType } from "../types/guideProfile.type";

export const updateGuideProfileApi = async (
  data: guideProfileType
) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("status", data.status);
  formData.append("gender", data.gender);
  formData.append("phone", data.phone);
  formData.append("DOB", data.DOB);
  formData.append("daily_price", String(data.daily_price));
  formData.append("bio", data.bio);

  data.languages.forEach((id) => {
    formData.append("languages[]", String(id));
  });

  data.cities.forEach((id) => {
    formData.append("cities[]", String(id));
  });

  if (data.avatar) {
    formData.append("avatar", data.avatar[0]);
  }

  return api.post("/guide/profile", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};