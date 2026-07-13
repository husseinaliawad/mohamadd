import { Route, MapPin, Users, Globe } from "lucide-react";
import type { ElementType } from "react";

interface FeatureItem {
  title: string;
  desc: string;
  icon: ElementType;
}

const features: FeatureItem[] = [
  { 
    title: "تخطيط رحلة ذكي", 
    desc: "إنشاء برنامج يومي تلقائي حسب الوقت والمسافة والميزانية والاهتمامات.",
    icon: Route
  },
  { 
    title: "خريطة تفاعلية", 
    desc: "استكشف الأماكن السياحية على خريطة دقيقة.- اختر المكان الذي تريد وخذ معلومات كاملة عنه",
    icon: MapPin
  },
  { 
    title: "مرشدين محليين", 
    desc: "ابحث واحجز مرشد سياحي موثوق - وفق اللغة التي تريدها .",
    icon: Users
  },
  { 
    title: "اكتشاف أماكن", 
    desc: "أكتشف أجمل الأماكن على مستوى العالم والموجودة في سوريا بلد الحضارة والجمال .",
    icon: Globe
  },
];

const Features = () => {
  return (
    <section className="max-w-[90%] md:max-w-4xl mx-auto">
      <h2
        className="heading-primary"
        data-aos="fade-up"
      >
        مميزات المنصة
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={i}
              className="max-w-80 mx-auto px-8 py-10 bg-white/80 shadow-sm shadow-secondary-700 rounded-lg text-center hover:shadow-md hover:bg-secondary-50 transition flex flex-col justify-between h-full"
              data-aos="zoom-in-up"
              data-aos-delay={i * 150}
            >
              <div>
                <h4 className="text-xl font-semibold mb-4 text-secondary-500">
                  {f.title}
                </h4>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {f.desc}
                </p>
              </div>

              <div className="flex justify-center mt-4">
                <Icon className="w-12 h-12 text-primary-600" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
