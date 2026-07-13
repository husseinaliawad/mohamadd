import axios from "@/lib/axios";
import type { LanguageFormData } from "../types/language.type";

export async function updateLanguage(id: number, data: LanguageFormData): Promise<void> {
  await axios.put(`/admin/languages/${id}`, data);
}
