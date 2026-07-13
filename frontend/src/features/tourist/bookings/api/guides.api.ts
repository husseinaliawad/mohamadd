import api from "@/lib/axios";


export const getGuides = async (params?: any) => {
  const res = await api.get("/tourist/guides" , {params});
  return res.data.data;
};

export const getGuideById = async (guidId: number) => {
  const res = await api.get(`/tourist/guides/${guidId}`);
  console.log(res.data.data);
  return res.data.data;
};
