import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-radial to-primary-100/50 from-secondary-100/30 text-center px-6">
      <h1 className="text-7xl font-bold text-secondary-600 mb-4">404</h1>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">الصفحة غير موجودة</h2>

      <p className="text-secondary-800 mb-6 max-w-md leading-relaxed">يبدو أنك وصلت إلى رابط غير صحيح أو أن الصفحة قد تمت إزالتها.</p>

      <Link to="/" className="px-6 py-3 rounded-lg text-white font-medium gradient-primary">
        العودة إلى الرئيسية
      </Link>
    </div>
  );
};

export default NotFoundPage;