const destinations = [
  { name: "Hawaii", image: "/images/1.jpg" },
  { name: "Paris", image: "/images/2.jpg" },
  { name: "Las Vegas", image: "/images/3.jpg" },
  { name: "Cancun", image: "/images/4.jpg" },
  { name: "Los Cabos", image: "/images/5.jpg" },
  { name: "Dominican Republic", image: "/images/6.jpg" },
  { name: "Jamaica", image: "/images/7.jpg" },
  { name: "Orlando", image: "/images/8.jpg" },
];

export default function MasonryGallery() {
  return (
    <div className="max-w-[90%] md:max-w-4xl mx-auto  pt-10  mt-70 mb-10 bg-linear-30 from-primary-400 to-secondary-100 rounded-3xl">
      <h2 className="heading-primary">أجمل الأماكن</h2>
      <div className="columns-1 sm:columns-2 lg:columns-4 gap-4 p-4">
        {destinations.map((item, i) => (
          <div
            key={i}
            className="relative mb-4 overflow-hidden rounded-xl group cursor-pointer"
            data-aos="flip-left"
            data-aos-delay={i * 200}
            data-aos-duration="1000"
          >
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              className="w-full h-auto object-cover 
              transition-all duration-1000 group-hover:scale-125  group-hover:brightness-125"
            />

            <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold drop-shadow-lg">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
