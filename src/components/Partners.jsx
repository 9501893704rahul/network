const Partners = () => {
  const partners = [
    { name: 'Flutterverse', logo: '🦋' },
    { name: 'Oasis', logo: '🏝️' },
    { name: 'Lit Protocol', logo: '🔥' },
    { name: 'Partner 4', logo: '⚡' },
    { name: 'Partner 5', logo: '🌟' },
    { name: 'Partner 6', logo: '💎' },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0F0A1F]" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] text-white">
            Our Partners and Investors
          </h2>
        </div>

        {/* Logo Carousel */}
        <div className="relative overflow-hidden">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0F0A1F] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0F0A1F] to-transparent z-10" />
          
          {/* Scrolling Container */}
          <div className="flex animate-scroll">
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-8 group"
              >
                <div className="flex items-center gap-4 px-8 py-6 rounded-2xl bg-[#1A1333]/50 border border-[#8B5CF6]/10 hover:border-[#8B5CF6]/30 transition-all hover:scale-105">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#F59E0B]/20 flex items-center justify-center text-2xl">
                    {partner.logo}
                  </div>
                  <span className="text-lg font-medium text-[#94A3B8] group-hover:text-white transition-colors">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative Arrow */}
        <div className="flex justify-center mt-12">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Partners;
