import axios from "@/lib/axios";
import type { Language } from "../types/language.type";

export async function getLanguages(): Promise<Language[]> {
  const res = await axios.get("/admin/languages");
  return res.data.data;
}
