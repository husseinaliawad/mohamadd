import api from "@/lib/axios";
import type { UpdateGuideProfileForm } from "../schemas/updateGuideProfileSchema";

export const updateGuideProfileApi = async (data: UpdateGuideProfileForm) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (key === "avatar" && value instanceof FileList && value.length > 0) {
      formData.append("avatar", value[0]);
    } else if (Array.isArray(value)) {
      value.forEach((v) => formData.append(`${key}[]`, String(v)));
    } else {
      formData.append(key, String(value));
    }
  });

  const res = await api.post("/guide/profile/update", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};
