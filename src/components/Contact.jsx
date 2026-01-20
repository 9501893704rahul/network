const Contact = () => {
  const userTypes = [
    { name: 'RESEARCHERS', icon: '🔬' },
    { name: 'BUSINESS ANALYSTS', icon: '📊' },
    { name: 'MARKETERS', icon: '📢' },
    { name: 'PROGRAMMERS', icon: '💻' },
    { name: 'STUDENTS', icon: '📚' },
  ];

  return (
    <section id="support" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1333] to-[#0F0A1F]" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#8B5CF6]/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#F59E0B]/10 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4">
                <span className="text-white">Get in touch with </span>
                <span className="gradient-text">us.</span>
              </h2>
              <p className="text-lg text-[#94A3B8]">
                Reach out to our support team for any questions, problems, or suggestions.
              </p>
            </div>

            <a
              href="mailto:contact@plurality.network"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-full text-white font-semibold text-lg shadow-lg shadow-[#8B5CF6]/30 hover:shadow-xl hover:shadow-[#8B5CF6]/40 transition-all hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              CONTACT SUPPORT
            </a>
          </div>

          {/* Right Content - User Types */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {userTypes.map((type, index) => (
              <div
                key={index}
                className="group p-4 rounded-2xl bg-[#1A1333]/50 border border-[#8B5CF6]/10 hover:border-[#8B5CF6]/40 transition-all hover:scale-105 cursor-pointer"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#F59E0B]/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {type.icon}
                  </div>
                  <span className="text-xs font-medium text-[#94A3B8] group-hover:text-white transition-colors">
                    {type.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
