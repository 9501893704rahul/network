const Hero = () => {
  const integrations = [
    { name: 'Spotify', icon: '🎵', color: '#1DB954' },
    { name: 'Instagram', icon: '📸', color: '#E4405F' },
    { name: 'Farcaster', icon: '🟣', color: '#8B5CF6' },
    { name: 'Gemini', icon: '✨', color: '#4285F4' },
    { name: 'Deepseek', icon: '🔍', color: '#00D4AA' },
    { name: 'ChatGPT', icon: '🤖', color: '#10A37F' },
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F59E0B]/15 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/5 rounded-full blur-[100px]" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8B5CF6]/20 to-[#F59E0B]/20 border border-[#8B5CF6]/30">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
            <span className="text-sm font-medium text-[#A78BFA] tracking-wider">
              REDEFINING CONTEXT MANAGEMENT WITH
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="text-center mb-6">
          <span className="block text-5xl md:text-7xl font-bold font-['Space_Grotesk'] leading-tight">
            <span className="text-white">Open </span>
            <span className="gradient-text">Context</span>
            <span className="text-white"> Layer</span>
          </span>
          <span className="block text-5xl md:text-7xl font-bold font-['Space_Grotesk'] leading-tight mt-2">
            <span className="text-white">for </span>
            <span className="gradient-text">Apps</span>
            <span className="text-white"> and </span>
            <span className="gradient-text">AI Agents</span>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-center text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto mb-10">
          Secure infrastructure for user-owned apps & AI context that travels anywhere.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mb-16">
          <a 
            href="https://app.plurality.network/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-full text-white font-semibold text-lg shadow-lg shadow-[#8B5CF6]/30 hover:shadow-xl hover:shadow-[#8B5CF6]/40 transition-all hover:scale-105"
          >
            <span>USE YOUR AI MEMORY NOW</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F59E0B] opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
          </a>
        </div>

        {/* Integration Visual */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Hub */}
          <div className="relative flex justify-center items-center">
            {/* Connection Lines */}
            <svg className="absolute w-full h-full" viewBox="0 0 800 400" fill="none">
              {/* Left connections */}
              <path d="M200 100 Q 400 100 400 200" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="8 4" opacity="0.5" />
              <path d="M200 200 L 400 200" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="8 4" opacity="0.5" />
              <path d="M200 300 Q 400 300 400 200" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="8 4" opacity="0.5" />
              {/* Right connections */}
              <path d="M600 100 Q 400 100 400 200" stroke="url(#gradient2)" strokeWidth="2" strokeDasharray="8 4" opacity="0.5" />
              <path d="M600 200 L 400 200" stroke="url(#gradient2)" strokeWidth="2" strokeDasharray="8 4" opacity="0.5" />
              <path d="M600 300 Q 400 300 400 200" stroke="url(#gradient2)" strokeWidth="2" strokeDasharray="8 4" opacity="0.5" />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
                <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
              </defs>
            </svg>

            {/* Left Side Integrations */}
            <div className="flex flex-col gap-6 mr-8 md:mr-16">
              {integrations.slice(0, 3).map((item, index) => (
                <div 
                  key={item.name}
                  className="flex items-center gap-3 px-4 py-3 bg-[#1A1333] rounded-xl border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 transition-all hover:scale-105 cursor-pointer group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#251D3A] flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-[#E2E8F0] group-hover:text-white">{item.name}</span>
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
              ))}
            </div>

            {/* Central Logo */}
            <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] p-[2px] glow">
              <div className="w-full h-full rounded-2xl bg-[#0F0A1F] flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center">
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Side Integrations */}
            <div className="flex flex-col gap-6 ml-8 md:ml-16">
              {integrations.slice(3).map((item, index) => (
                <div 
                  key={item.name}
                  className="flex items-center gap-3 px-4 py-3 bg-[#1A1333] rounded-xl border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 transition-all hover:scale-105 cursor-pointer group"
                  style={{ animationDelay: `${(index + 3) * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#251D3A] flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <span className="text-sm font-medium text-[#E2E8F0] group-hover:text-white">{item.name}</span>
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
