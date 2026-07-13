import axios from "@/lib/axios";
import type { LanguageFormData } from "../types/language.type";

export async function createLanguage(data: LanguageFormData): Promise<void> {
  await axios.post("/admin/languages", data);
}
