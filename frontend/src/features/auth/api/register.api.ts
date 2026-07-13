import axios from "@/lib/axios";

export const  registerUser = async (data :any) => {
  const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "avatar") {
        if (value instanceof FileList && value.length > 0) {
          formData.append("avatar", value[0]);
        }
        return;
      }
      
      if (key === "languages" && Array.isArray(value)) {
        value.forEach((id) => formData.append("languages[]", String(id)));
        return;
      }
      
      formData.append(key, value as any);
    });

  const response = await axios.post('/register', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
