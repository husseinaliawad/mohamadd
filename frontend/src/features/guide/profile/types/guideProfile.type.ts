export interface guideProfileType {
  name: string;
  status: string;
  gender: "M" | "F";
  phone: string;
  DOB: string;
  daily_price: number;
  bio: string;
  languages: number[];
  cities: number[];
  avatar?: FileList;
}