import { Link } from "react-router-dom";

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-radial to-primary-100/50 from-secondary-100/30 text-center px-6">
      <h1 className="text-7xl font-bold text-secondary-600 mb-4">403</h1>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        ليس لديك صلاحية الوصول
      </h2>

      <p className="text-secondary-800 mb-6 max-w-md leading-relaxed">
        لا يمكنك الوصول إلى هذه الصفحة. قد تحتاج إلى تسجيل الدخول أو امتلاك
        صلاحيات مختلفة.
      </p>

      <Link
        to="/"
        className="px-6 py-3 rounded-lg text-white font-medium gradient-primary" >
        العودة إلى الرئيسية
      </Link>
    </div>
  );
};

export default ForbiddenPage;
