// src/constants/about.ts

export const ABOUT_CONTENT = {
  title: "من نحن – NextTrip Syria",
  intro:
    "NextTrip Syria هو مشروع تقني مبتكر يهدف إلى إعادة تعريف تجربة السفر داخل سوريا عبر منصة رقمية متكاملة تجمع بين السائح، والمرشد السياحي، والأماكن السياحية في نظام واحد ذكي وسهل الاستخدام.",

  vision: {
    title: "رؤيتنا",
    text: "نسعى إلى بناء أكبر منصة رقمية للسياحة في سوريا، تُسهّل على الزائر اكتشاف الوجهات، حجز الرحلات، التواصل مع المرشدين المحليين، ومتابعة كل تفاصيل رحلته من مكان واحد."
  },

  mission: {
    title: "رسالتنا",
    text: "تقديم تجربة سفر سلسة تعتمد على السرعة، الدقة، والشفافية، مع تمكين المرشدين المحليين من عرض خدماتهم بطريقة احترافية."
  },

  features: [
    "حجوزات الرحلات: نظام متكامل لحجز الرحلات مع المرشدين المحليين.",
    "ملفات المرشدين: خبرات، لغات، أسعار، تقييمات، وصور.",
    "اقتراح الأماكن: السماح للمستخدمين باقتراح أماكن جديدة.",
    "استكشاف الوجهات: عرض شامل للمدن والمعالم السياحية.",
    "نظام تقييمات: تقييمات حقيقية من السياح.",
  ],

  whyUs: [
    "جودة المحتوى ودقة المعلومات.",
    "منصة احترافية للمرشدين.",
    "مساعدة السائح على اتخاذ قرارات أفضل."
  ],

  values: ["الشفافية", "الاحترافية", "الابتكار", "السرعة", "تجربة المستخدم أولاً"],

  goal:
    "أن نكون المنصة السياحية الأولى في سوريا، وأن نُسهِم في دعم السياحة الداخلية عبر التكنولوجيا الحديثة."
};

const AboutPage: React.FC = () => {
  return (
    <main className="w-full bg-gray-50/40 text-primary-700 pt-15">
      <section className="max-w-5xl mx-auto md:px-[20%] py-12">

        {/* العنوان + المقدمة */}
        <header className="mb-5 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            {ABOUT_CONTENT.title}
          </h1>
          <p className="text-gray-600 leading-relaxed mt-11 text-xl ">
            {ABOUT_CONTENT.intro}
          </p>
        </header>

        {/* الرؤية والرسالة */}
        <section className="mb-10 space-y-5">
          <div className="bg-white/30 rounded-full text-center shadow-xl p-4" >
            <h2 className="text-xl font-semibold mb-3">
              {ABOUT_CONTENT.vision.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {ABOUT_CONTENT.vision.text}
            </p>
          </div>

          <div className="bg-white/30 rounded-full text-center shadow-xl p-4" >
            <h2 className="text-xl font-semibold mb-3">
              {ABOUT_CONTENT.mission.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {ABOUT_CONTENT.mission.text}
            </p>
          </div>
        </section>

        {/* ماذا نقدم */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">ماذا نقدم</h2>
          <ul className="space-y-3 text-gray-700 leading-relaxed">
            {ABOUT_CONTENT.features.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        {/* لماذا نحن */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">لماذا NextTrip Syria</h2>
          <ul className="list-disc pr-5 space-y-2 text-gray-700 leading-relaxed">
            {ABOUT_CONTENT.whyUs.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>

        {/* القيم */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">قيمنا</h2>
          <div className="flex flex-wrap gap-3">
            {ABOUT_CONTENT.values.map((value) => (
              <span
                key={value}
                className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm text-sm font-medium text-gray-800"
              >
                {value}
              </span>
            ))}
          </div>
        </section>

        {/* الهدف */}
        <section className="mb-4">
          <h2 className="text-2xl font-semibold mb-3">هدفنا</h2>
          <p className="text-gray-700 leading-relaxed">
            {ABOUT_CONTENT.goal}
          </p>
        </section>
      </section>
    </main>
  );
};

export default AboutPage;
