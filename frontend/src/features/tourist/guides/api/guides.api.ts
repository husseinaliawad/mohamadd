import api from "@/lib/axios";


export const getGuides = async (params?: any) => {
  const response = await api.get("/public/guides" , {params});
  return response.data.data;
};

export const getGuideById = async (guidId: number) => {
  const response = await api.get(`/public/guides/${guidId}`);
  // console.log(response);
  return response.data.data;
};
