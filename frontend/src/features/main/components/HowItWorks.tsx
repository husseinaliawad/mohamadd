const steps: string[] = [
  "اختر وجهتك",
  "احصل على خطة تلقائية",
  "استكشف الخريطة",
  "احجز مرشد سياحي",
];

const HowItWorks = () => {
  return (
    <section
      className="max-w-[90%] md:max-w-4xl mx-auto py-16 my-40 shadow-sm border-8 shadow-secondary-500  bg-secondary-50/30"
    >
      {/* Title Animation */}
      <h2
        data-aos="flip-up"
        data-aos-duration="1000"
        data-aos-delay="50"
        className="heading-primary"
      >
        كيف تعمل المنصة؟
      </h2>

      <div className="flex flex-col md:flex-row justify-center gap-20">
        {steps.map((s, i) => (
          <div
            key={i}
            data-aos="zoom-in-up"
            data-aos-delay={i * 200}
            data-aos-duration="700"
            className="text-center group"
          >
            {/* Number circle animation */}
            <div className="relative">
              <div className="text-4xl font-bold text-secondary-600 mb-2 transition-transform duration-300 group-hover:scale-110">
                {i + 1}
              </div>

              {/* small glow effect */}
              <div className="w-10 h-10 bg-secondary-400/20 rounded-full absolute -top-2 left-1/2 -translate-x-1/2 blur-md opacity-0 group-hover:opacity-100 transition" />
            </div>

            <p className="text-gray-700 text-lg transition-colors duration-300 group-hover:text-primary-700">
              {s}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;