import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AIContextFlow = () => {
  const userTypes = [
    {
      type: 'FOR MARKETERS',
      title: 'Stop Copy-Pasting Your Brand Voice 47 Times a Day',
      subtitle: 'Your brand guidelines, tone, and style, instantly available in every AI conversation',
      features: [
        'Consistent brand voice across all platforms – ChatGPT, Claude, Gemini all speak your language from day one',
        'Generate campaign copy in seconds, not hours – No more re-explaining your target audience, pain points, or messaging framework',
        'Switch between client contexts instantly – Keep Agency Client A\'s voice separate from Client B\'s without mental gymnastics',
      ],
      stat: '⏱️ Average time saved: 12+ hours per week',
      icon: '📢',
    },
    {
      type: 'FOR FREELANCERS',
      title: 'Juggling 5 Clients? Your AI Now Juggles With You.',
      subtitle: 'Keep every client\'s project details, preferences, and history perfectly organized',
      features: [
        'Switch between client contexts in one click – Never mix up Client A\'s deliverables with Client B\'s requirements again',
        'Deliver personalized work at scale – Each client gets your full attention because your AI remembers their unique needs',
        'Faster onboarding for new projects – Store client intake info once, reference it forever across all your AI tools',
        'Professional consistency across everything – Your proposals, reports, and communications maintain the same quality and voice',
      ],
      stat: '💼 Manage 3x more clients without the chaos',
      icon: '💻',
    },
    {
      type: 'FOR FOUNDERS',
      title: 'Run Your Business. Let AI Remember Everything Else.',
      subtitle: 'Your product roadmap, customer insights, and business model, accessible across every AI tool',
      features: [
        'Keep your startup knowledge centralized – Product specs, customer feedback, growth metrics, and pivot decisions all in one context',
        'Switch between investor mode and builder mode – Separate contexts for fundraising pitches vs. product development conversations',
        'Never lose momentum on key initiatives – Your AI remembers where you left off on every project, every time',
        'Make data-informed decisions faster – Your market research, competitor analysis, and customer insights power every AI conversation',
      ],
      stat: '🚀 Ship products 2x faster with organized context',
      icon: '🎯',
    },
    {
      type: 'FOR STUDENTS',
      title: 'Your AI Tutor That Actually Knows Your Coursework',
      subtitle: 'Store your notes, learning style, and course materials for instant, personalized help',
      features: [
        'AI tutoring tailored to how YOU learn – Your learning preferences and current understanding level guide every explanation',
        'Instant access to lecture notes and study guides – No more scrolling through folders or re-uploading PDFs for every question',
        'Separate contexts for every course – Keep Biology 101 separate from Business Strategy without mixing concepts',
        'Study smarter, not longer – Get explanations that build on what you already know instead of generic responses',
      ],
      stat: '📚 Study 40% more efficiently with personalized AI help',
      icon: '🎓',
    },
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Create Your Knowledge Base',
      description: 'Build your personal AI memory with preferences, context, and information you want AI to remember.',
      icon: '🧠',
    },
    {
      step: '02',
      title: 'Organize Into Buckets',
      description: 'Group your context into buckets for different projects, clients, or use cases.',
      icon: '📦',
    },
    {
      step: '03',
      title: 'Install Browser Extension',
      description: 'Add our extension to inject your context into any LLM app via DOM injection.',
      icon: '🔌',
    },
    {
      step: '04',
      title: 'Use Anywhere',
      description: 'Your knowledge base is now available in ChatGPT, Claude, Gemini, and more.',
      icon: '✨',
    },
  ];

  const platforms = [
    { name: 'ChatGPT', icon: '🤖', status: 'Live' },
    { name: 'Claude', icon: '🟣', status: 'Live' },
    { name: 'Gemini', icon: '✨', status: 'Live' },
    { name: 'Perplexity', icon: '🔍', status: 'Live' },
    { name: 'Grok', icon: '⚡', status: 'Live' },
    { name: 'DeepSeek', icon: '🌊', status: 'Coming Soon' },
  ];

  return (
    <div className="min-h-screen bg-[#0F0A1F]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B5CF6]/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F59E0B]/15 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8B5CF6]/20 to-[#F59E0B]/20 border border-[#8B5CF6]/30 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
              <span className="text-sm font-medium text-[#A78BFA]">UNIVERSAL AI MEMORY</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold font-['Space_Grotesk'] mb-6">
              <span className="gradient-text">AI Context Flow</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#A78BFA] mb-4">
              Your Universal Memory Across AI Tools
            </p>
            
            <p className="text-lg text-[#94A3B8] max-w-3xl mx-auto mb-10">
              Create your knowledge base once. Inject it into any LLM app via DOM injection. 
              Stop reconfiguring every AI assistant – your preferences, writing style, and knowledge 
              automatically enhance every AI conversation.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <a
                href="https://app.plurality.network/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-full text-white font-semibold text-lg shadow-lg shadow-[#8B5CF6]/30 hover:shadow-xl hover:shadow-[#8B5CF6]/40 transition-all hover:scale-105"
              >
                <span>Start Building Your Memory</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="https://docs.plurality.network/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[#E2E8F0] border border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6] transition-all"
              >
                View Documentation
              </a>
            </div>

            {/* Supported Platforms */}
            <div className="flex flex-wrap justify-center gap-4">
              {platforms.map((platform) => (
                <div
                  key={platform.name}
                  className="flex items-center gap-2 px-4 py-2 bg-[#1A1333] rounded-xl border border-[#8B5CF6]/20"
                >
                  <span className="text-xl">{platform.icon}</span>
                  <span className="text-sm text-[#E2E8F0]">{platform.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    platform.status === 'Live' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-[#F59E0B]/20 text-[#F59E0B]'
                  }`}>
                    {platform.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0A1F] via-[#1A1333] to-[#0F0A1F]" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] mb-4">
              <span className="text-white">How </span>
              <span className="gradient-text">It Works</span>
            </h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">
              Build your knowledge base and inject it into any AI platform in minutes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div
                key={item.step}
                className="relative p-6 rounded-2xl bg-[#1A1333]/50 border border-[#8B5CF6]/10 hover:border-[#8B5CF6]/40 transition-all group"
              >
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-[#8B5CF6] to-transparent" />
                )}
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-xs text-[#8B5CF6] font-mono mb-2">STEP {item.step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-[#94A3B8]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOM Injection Explainer */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 mb-6">
                <span className="text-sm font-medium text-[#FBBF24]">TECHNOLOGY</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] mb-6">
                <span className="text-white">Inject Your Context via </span>
                <span className="gradient-text">DOM Injection</span>
              </h2>
              <p className="text-[#94A3B8] mb-6">
                Our browser extension seamlessly injects your knowledge base into any LLM interface. 
                No API keys needed, no complex setup – just install and your context is automatically 
                available in ChatGPT, Claude, Gemini, and more.
              </p>
              <ul className="space-y-4">
                {[
                  'Works with any web-based AI chat interface',
                  'Automatic context injection before your prompts',
                  'Selective bucket activation for different use cases',
                  'Privacy-first: your data never leaves your control',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[#E2E8F0]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="rounded-2xl bg-[#1A1333] border border-[#8B5CF6]/20 p-6 overflow-hidden">
                {/* Browser mockup */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 bg-[#0F0A1F] rounded-lg px-4 py-1.5 text-sm text-[#94A3B8]">
                    chat.openai.com
                  </div>
                </div>
                
                {/* Chat interface mockup */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30">
                    <div className="text-xs text-[#8B5CF6] mb-2">📦 Context Injected from "Work Projects"</div>
                    <p className="text-sm text-[#E2E8F0]">
                      User preferences: Technical writer, prefers concise explanations, 
                      working on AI documentation project...
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#0F0A1F]">
                    <p className="text-sm text-[#E2E8F0]">
                      Help me write documentation for our new API endpoint
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#1A1333] border border-[#8B5CF6]/10">
                    <p className="text-sm text-[#94A3B8]">
                      Based on your technical writing style and the AI documentation project context, 
                      here's a concise API documentation template...
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#F59E0B] rounded-full text-white text-sm font-medium shadow-lg">
                ✨ Auto-injected
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Types */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1333] to-[#0F0A1F]" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] mb-4">
              <span className="text-white">Trusted By </span>
              <span className="gradient-text">Professionals</span>
              <span className="text-white"> Who Refuse To Waste Time</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {userTypes.map((user, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-[#1A1333]/50 border border-[#8B5CF6]/10 hover:border-[#8B5CF6]/40 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{user.icon}</span>
                  <span className="text-xs font-medium text-[#8B5CF6] tracking-wider">{user.type}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{user.title}</h3>
                <p className="text-[#A78BFA] mb-6">{user.subtitle}</p>
                
                <ul className="space-y-3 mb-6">
                  {user.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <span className="text-sm text-[#94A3B8]">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-4 border-t border-[#8B5CF6]/10">
                  <span className="text-lg font-semibold gradient-text">{user.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/10 to-[#F59E0B]/10" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6">
            <span className="text-white">Ready to Build Your </span>
            <span className="gradient-text">AI Memory?</span>
          </h2>
          <p className="text-lg text-[#94A3B8] mb-10">
            Join thousands of professionals who've stopped wasting time re-explaining themselves to AI.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://app.plurality.network/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-full text-white font-semibold text-lg shadow-lg shadow-[#8B5CF6]/30 hover:shadow-xl hover:shadow-[#8B5CF6]/40 transition-all hover:scale-105"
            >
              Get Started Free
            </a>
            <Link
              to="/smart-profiles"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[#E2E8F0] border border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6] transition-all"
            >
              Learn About Smart Profiles
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIContextFlow;
