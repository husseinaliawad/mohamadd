import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";
import FormField from "@/components/FormField";


export default function LoginForm() {
  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormData) => mutate(data );

  return (
    <div className="min-h-screen flex flex-col md:flex-row md:bg-linear-0 from-primary-200/40 via-secondary-100 to-primary-200/40 ">
      {/* RIGHT SIDE — FULL WIDTH FORM */}
      <div className="order-2 md:order-1 flex-1 flex items-center justify-center p-10 pt-4 bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg space-y-6">
          <h2 className="heading-primary font-bold text-secondary-800/85 text-center ">تسجيل الدخول</h2>

          <FormField label="البريد الإلكتروني" name="email" register={register} errors={errors} type="email" />
          <FormField label="كلمة المرور" name="password" register={register} errors={errors} type="password" />

          <button type="submit" disabled={isPending} className="w-full py-1 md:py-3 rounded-lg gradient-primary text-white font-semibold">
            {isPending ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>

          {/* Create account */}
          <div className="text-center mt-6 text-gray-700">
            ليس لديك حساب؟
            <Link to="/register" className="text-secondary-600 font-semibold hover:underline ml-1 mr-2">
              إنشاء حساب جديد
            </Link>
          </div>
        </form>
      </div>
      {/* LEFT SIDE — BIG LOGO */}
      <div className="order-1 md:order-2 flex flex-col justify-center items-center  text-center md:text-right md:w-1/2 mb-0">
        <Link to="/">
          <img
            src="/logo.png"
            alt="NextTrip Logo"
            className="w-40 md:w-60 lg:w-[250px] mt-4" // شعار كبير جدًا
          />
        </Link>

        <p className="text-gray-700 mt-2 text-sm md:text-base max-w-sm">
          سجّل دخولك وواصل رحلتك الذكية داخل سوريا. <br />
          كل رحلاتك، تفضيلاتك، ومرشديك في مكان واحد
        </p>
      </div>
    </div>
  );
}
