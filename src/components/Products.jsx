import { useState } from 'react';

const Products = () => {
  const [activeTab, setActiveTab] = useState(0);

  const products = [
    {
      id: 'ai-context-flow',
      name: 'AI Context Flow',
      tagline: 'Your universal memory across AI tools.',
      description: 'Stop reconfiguring every AI assistant. AI Context Flow creates one memory layer that works across ChatGPT, Claude, Gemini, and several other platforms. Your preferences, writing style, and knowledge automatically enhance every AI conversation.',
      features: [
        'Universal memory across all AI platforms',
        'Automatic context injection',
        'Privacy-first architecture',
        'Real-time sync',
      ],
      cta: 'Try AI Context Flow',
      ctaLink: 'https://app.plurality.network/',
      learnMore: '#',
      visual: (
        <div className="relative h-80 rounded-2xl bg-gradient-to-br from-[#1A1333] to-[#251D3A] border border-[#8B5CF6]/20 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              {/* Central node */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center shadow-lg shadow-[#8B5CF6]/30">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              {/* Orbiting nodes */}
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute w-10 h-10 rounded-xl bg-[#1A1333] border border-[#8B5CF6]/30 flex items-center justify-center"
                  style={{
                    top: `${50 + 60 * Math.sin((i * Math.PI) / 2)}px`,
                    left: `${50 + 60 * Math.cos((i * Math.PI) / 2)}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {['🤖', '✨', '🔍', '💬'][i]}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'smart-profiles',
      name: 'Smart Profiles',
      tagline: 'Connect your existing profiles and addresses.',
      description: 'Create your Smart Profile by connecting your existing profiles and addresses to gather the context for your AI interactions. Create once and use anywhere across the ecosystem.',
      features: [
        'Unified identity across platforms',
        'Secure credential management',
        'Selective data sharing',
        'Cross-platform portability',
      ],
      cta: 'Create Smart Profile',
      ctaLink: 'https://app.plurality.network/',
      learnMore: 'https://plurality.network/smart-profiles/',
      visual: (
        <div className="relative h-80 rounded-2xl bg-gradient-to-br from-[#1A1333] to-[#251D3A] border border-[#8B5CF6]/20 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-8">
            {/* Profile Card */}
            <div className="bg-[#0F0A1F] rounded-2xl p-6 border border-[#8B5CF6]/20 shadow-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">Your Smart Profile</div>
                  <div className="text-sm text-[#94A3B8]">Connected & Verified</div>
                </div>
              </div>
              <div className="space-y-2">
                {['Twitter', 'GitHub', 'Wallet'].map((platform, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#1A1333]">
                    <span className="text-sm text-[#E2E8F0]">{platform}</span>
                    <span className="text-xs text-green-400">✓ Connected</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="products" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F0A1F] to-[#1A1333]" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-[#8B5CF6]/10 rounded-full blur-[150px]" />
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-[#F59E0B]/10 rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 rounded-full bg-[#1A1333] border border-[#8B5CF6]/20">
            {products.map((product, index) => (
              <button
                key={product.id}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeTab === index
                    ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-lg shadow-[#8B5CF6]/30'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {product.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {products.map((product, index) => (
          <div
            key={product.id}
            id={product.id}
            className={`transition-all duration-500 ${
              activeTab === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute pointer-events-none'
            }`}
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk']">
                  <span className="gradient-text">{product.name}</span>
                </h2>
                <p className="text-xl text-[#A78BFA]">{product.tagline}</p>
                <p className="text-[#94A3B8] leading-relaxed">{product.description}</p>
                
                {/* Features List */}
                <ul className="space-y-3">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-[#E2E8F0]">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href={product.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-full text-white font-medium hover:shadow-lg hover:shadow-[#8B5CF6]/30 transition-all hover:scale-105"
                  >
                    {product.cta}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                  <a
                    href={product.learnMore}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[#E2E8F0] border border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6] transition-all"
                  >
                    Learn More
                  </a>
                </div>
              </div>

              {/* Visual */}
              <div className="order-first md:order-last">
                {product.visual}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
