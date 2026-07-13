import { useMutation } from "@tanstack/react-query";
import { updateGuideProfileApi } from "../api/updateGuideProfile.api";
import toast from "react-hot-toast";

export const useUpdateGuideProfile = () =>
  useMutation({
    mutationFn: updateGuideProfileApi,
    onSuccess: () => toast.success('تم تعديل الملف الشخصي بنجاح')
  });
