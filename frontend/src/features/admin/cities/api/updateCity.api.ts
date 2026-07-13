import axios from "@/lib/axios";

export async function updateCity(id: number, data: any): Promise<void> {
  const formData = new FormData();
  formData.append("name", data.name);
  if (data.description) formData.append("description", data.description);
  if (data.image instanceof File) {
    formData.append("image", data.image);
  } else if (data.image instanceof FileList && data.image.length > 0) {
    formData.append("image", data.image[0]);
  }
  
  await axios.put(`/admin/cities/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
