import { useState } from 'react';

const Features = () => {
  const [activeAccordion, setActiveAccordion] = useState(0);

  const features = [
    {
      title: 'Portable AI Context Across All Platforms',
      description: 'Your AI context travels with you across ChatGPT, Claude, Gemini, and more. No more starting from scratch with each new AI tool.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      title: 'Context-Aware Prompt Optimization',
      description: 'Automatically enhance your prompts with relevant context from your profile, preferences, and past interactions.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'User-Owned Data & Privacy',
      description: 'You own your data. Control exactly what context is shared, when, and with whom. Your privacy is our priority.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0A1F] via-[#1A1333] to-[#0F0A1F]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8B5CF6]/10 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-6">
            <svg className="w-5 h-5 text-[#8B5CF6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span className="text-sm font-medium text-[#A78BFA]">INFRASTRUCTURE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-4">
            <span className="text-white">The </span>
            <span className="gradient-text">Universal Context</span>
            <span className="text-white"> Infrastructure</span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Accordion */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                  activeAccordion === index
                    ? 'bg-gradient-to-r from-[#8B5CF6]/10 to-[#F59E0B]/10 border-[#8B5CF6]/40'
                    : 'bg-[#1A1333]/50 border-[#8B5CF6]/10 hover:border-[#8B5CF6]/30'
                }`}
                onClick={() => setActiveAccordion(activeAccordion === index ? -1 : index)}
              >
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      activeAccordion === index
                        ? 'bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] text-white'
                        : 'bg-[#251D3A] text-[#8B5CF6]'
                    }`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  </div>
                  <svg
                    className={`w-5 h-5 text-[#8B5CF6] transition-transform duration-300 ${
                      activeAccordion === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    activeAccordion === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-[#94A3B8] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative rounded-3xl bg-gradient-to-br from-[#1A1333] to-[#251D3A] p-8 border border-[#8B5CF6]/20 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#8B5CF6]/20 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#F59E0B]/20 rounded-full blur-[80px]" />
              
              {/* Content */}
              <div className="relative space-y-6">
                {/* Platform icons */}
                <div className="flex justify-center gap-4 mb-8">
                  {['🤖', '✨', '🔍', '💬'].map((emoji, i) => (
                    <div
                      key={i}
                      className="w-14 h-14 rounded-xl bg-[#0F0A1F] border border-[#8B5CF6]/20 flex items-center justify-center text-2xl hover:scale-110 transition-transform"
                    >
                      {emoji}
                    </div>
                  ))}
                </div>

                {/* Flow visualization */}
                <div className="relative py-8">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#8B5CF6] to-[#F59E0B]" />
                  
                  {['Your Context', 'AI Processing', 'Enhanced Output'].map((step, i) => (
                    <div key={i} className="relative flex items-center gap-4 mb-6 last:mb-0">
                      <div className="flex-1 text-right">
                        {i % 2 === 0 && (
                          <div className="inline-block px-4 py-2 rounded-lg bg-[#8B5CF6]/10 border border-[#8B5CF6]/20">
                            <span className="text-sm text-[#E2E8F0]">{step}</span>
                          </div>
                        )}
                      </div>
                      <div className="relative z-10 w-4 h-4 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] shadow-lg shadow-[#8B5CF6]/30" />
                      <div className="flex-1">
                        {i % 2 === 1 && (
                          <div className="inline-block px-4 py-2 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20">
                            <span className="text-sm text-[#E2E8F0]">{step}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#8B5CF6]/10">
                  {[
                    { value: '10+', label: 'Platforms' },
                    { value: '100%', label: 'Private' },
                    { value: '∞', label: 'Portable' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                      <div className="text-xs text-[#94A3B8]">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
