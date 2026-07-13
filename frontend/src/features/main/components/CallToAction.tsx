const CallToAction = () => {
  return (
    <section className="mt-20 py-20 bg-linear-100  from-primary-400  via-primary-800  to-primary-400 text-secondary-50 text-center text-shadow-2xs text-shadow-secondary-100"
      style={{ backgroundColor: "linear-gradient: " }}
    >
      <h2 className="text-3xl font-bold mb-4">
        جاهز لتجربة سياحية مختلفة في سوريا؟
      </h2>

      <p className="text-lg mb-8 opacity-90">
        ابدأ الآن بتنظيم رحلتك الذكية مع NextTrip Syria
      </p>

      <button className="px-8 py-3 bg-secondary-500 text-primary font-semibold rounded-lg hover:bg-primary-300 transition"  >

        ابدأ الآن
      </button>
    </section>
  );
};

export default CallToAction;
