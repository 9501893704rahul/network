import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SmartProfiles = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const features = [
    {
      title: 'Unified Digital Identity',
      description: 'Aggregate your Web2 and Web3 presence into one portable profile. Connect Twitter, GitHub, wallets, and more.',
      icon: '🔗',
    },
    {
      title: 'User-Owned Data',
      description: 'Your data belongs to you. Control exactly what to share, with whom, and for how long.',
      icon: '🔐',
    },
    {
      title: 'Cross-Platform Portability',
      description: 'Carry your digital context between apps and AI agents without re-entering data.',
      icon: '🌐',
    },
    {
      title: 'Privacy-Preserving',
      description: 'Zero-Knowledge Proofs let you verify identity aspects without revealing sensitive information.',
      icon: '🛡️',
    },
    {
      title: 'Modular Profiles',
      description: 'Create separate profiles for work, personal, or anonymous use cases.',
      icon: '📦',
    },
    {
      title: 'No Crypto Knowledge Needed',
      description: 'User-friendly design abstracts all blockchain complexity. No seed phrases required.',
      icon: '✨',
    },
  ];

  const faqs = [
    {
      question: 'What are Smart Profiles?',
      answer: 'Smart Profiles are user-owned, portable identity containers that unify your digital presence across both Web2 and Web3 platforms. Instead of managing dozens of separate accounts, you create one comprehensive profile that aggregates your preferences, history, credentials, and activity from platforms like Twitter, TikTok, Snapchat and crypto wallets.',
    },
    {
      question: 'How do Smart Profiles differ from traditional login systems?',
      answer: 'Unlike traditional accounts that lock your data within a single platform, Smart Profiles are portable and interoperable. You can carry your digital context between apps and agents without re-entering data or retraining systems. Smart Profiles integrate Web2 and Web3 activities into one seamless identity.',
    },
    {
      question: 'Is my data private and secure?',
      answer: 'Absolutely. Smart Profiles use Decentralized Identifiers (DIDs) to encrypt and secure your data, ensuring only you control access. The platform leverages Zero-Knowledge Proofs (ZKPs), allowing you to verify aspects of your identity without revealing sensitive information.',
    },
    {
      question: 'How easy is it to set up a Smart Profile?',
      answer: 'Setting up your Smart Profile takes just minutes and starts with familiar actions like signing in with your email or crypto wallet. Behind the scenes, Plurality Network automatically creates a multi-chain wallet using MPC technology, so you don\'t need to worry about seed phrases.',
    },
    {
      question: 'Can I create different profiles for different purposes?',
      answer: 'Yes! Smart Profiles feature a modular design that lets you create multiple Individual Profiles under one umbrella. You can customize separate profiles for professional contexts, social interactions, or basic anonymous use.',
    },
    {
      question: 'Do I need to understand cryptocurrency or blockchain?',
      answer: 'Not at all. Smart Profiles are designed with a user-friendly approach that eliminates Web3 complexity. The platform abstracts blockchain complexity so you\'ll never need to worry about seed phrases, wallet management, or technical blockchain details.',
    },
    {
      question: 'How do Smart Profiles enable better AI experiences?',
      answer: 'Smart Profiles are the underlying technology behind AI Context Flow. They help you eliminate re-teaching each AI agent about your preferences, history, goals, etc. Your profile context is automatically available across all connected AI platforms.',
    },
    {
      question: 'How can developers integrate Smart Profiles?',
      answer: 'Developers have three integration options: Embedded Login for plug-and-play authentication, Context SDK for building Web2/Web3 applications, and MCP Server for exposing context to AI agents. Check out our documentation for code samples and guides.',
    },
  ];

  const integrations = [
    { name: 'Twitter/X', icon: '𝕏', category: 'Social' },
    { name: 'GitHub', icon: '🐙', category: 'Developer' },
    { name: 'LinkedIn', icon: '💼', category: 'Professional' },
    { name: 'Discord', icon: '💬', category: 'Community' },
    { name: 'Ethereum', icon: '⟠', category: 'Wallet' },
    { name: 'Solana', icon: '◎', category: 'Wallet' },
    { name: 'Farcaster', icon: '🟣', category: 'Social' },
    { name: 'Lens', icon: '🌿', category: 'Social' },
  ];

  return (
    <div className="min-h-screen bg-[#0F0A1F]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#F59E0B]/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#8B5CF6]/15 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#F59E0B]/20 to-[#8B5CF6]/20 border border-[#F59E0B]/30 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
                <span className="text-sm font-medium text-[#FBBF24]">PORTABLE IDENTITY</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6">
                <span className="gradient-text">Smart Profiles</span>
              </h1>
              
              <p className="text-xl text-[#A78BFA] mb-4">
                Connect Your Existing Profiles and Addresses
              </p>
              
              <p className="text-lg text-[#94A3B8] mb-8">
                Create your Smart Profile by connecting your existing profiles and addresses 
                to gather the context for your AI interactions. Create once and use anywhere 
                across the ecosystem.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://app.plurality.network/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-full text-white font-semibold shadow-lg shadow-[#8B5CF6]/30 hover:shadow-xl hover:shadow-[#8B5CF6]/40 transition-all hover:scale-105"
                >
                  <span>Create Your Profile</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="https://docs.plurality.network/developer-guides"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[#E2E8F0] border border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6] transition-all"
                >
                  Developer Docs
                </a>
              </div>
            </div>

            {/* Profile Card Visual */}
            <div className="relative">
              <div className="rounded-3xl bg-gradient-to-br from-[#1A1333] to-[#251D3A] p-8 border border-[#8B5CF6]/20 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center text-3xl">
                    👤
                  </div>
                  <div>
                    <div className="text-xl font-semibold text-white">Your Smart Profile</div>
                    <div className="flex items-center gap-2 text-sm text-green-400">
                      <span className="w-2 h-2 rounded-full bg-green-400" />
                      Connected & Verified
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {['Twitter', 'GitHub', 'Ethereum Wallet', 'Discord'].map((platform, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#0F0A1F] border border-[#8B5CF6]/10">
                      <span className="text-sm text-[#E2E8F0]">{platform}</span>
                      <span className="text-xs text-green-400 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Connected
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#8B5CF6]/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#94A3B8]">Profile Completeness</span>
                    <span className="text-[#8B5CF6]">85%</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-[#0F0A1F] overflow-hidden">
                    <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#F59E0B]" />
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-[#1A1333] rounded-xl border border-[#8B5CF6]/30 shadow-lg">
                <span className="text-sm text-[#E2E8F0]">🔐 Encrypted</span>
              </div>
              <div className="absolute -bottom-4 -left-4 px-4 py-2 bg-[#1A1333] rounded-xl border border-[#F59E0B]/30 shadow-lg">
                <span className="text-sm text-[#E2E8F0]">🌐 Portable</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0A1F] via-[#1A1333] to-[#0F0A1F]" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] mb-4">
              <span className="text-white">Why </span>
              <span className="gradient-text">Smart Profiles?</span>
            </h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">
              Take control of your digital identity with user-owned, portable profiles
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-[#1A1333]/50 border border-[#8B5CF6]/10 hover:border-[#8B5CF6]/40 transition-all group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-[#94A3B8]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] mb-4">
              <span className="text-white">Connect Your </span>
              <span className="gradient-text">Existing Accounts</span>
            </h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">
              Aggregate your Web2 and Web3 presence into one unified profile
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-[#1A1333]/50 border border-[#8B5CF6]/10 hover:border-[#8B5CF6]/40 transition-all text-center group cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{integration.icon}</div>
                <div className="text-white font-medium">{integration.name}</div>
                <div className="text-xs text-[#94A3B8] mt-1">{integration.category}</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-[#94A3B8]">
              And many more integrations coming soon...
            </p>
          </div>
        </div>
      </section>

      {/* Developer Integration */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1333] to-[#0F0A1F]" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 mb-6">
                <span className="text-sm font-medium text-[#A78BFA]">FOR DEVELOPERS</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] mb-6">
                <span className="text-white">Easy Integration </span>
                <span className="gradient-text">In Minutes</span>
              </h2>
              <p className="text-[#94A3B8] mb-8">
                Three integration options to fit your needs: Embedded Login, Context SDK, or MCP Server.
              </p>

              <div className="space-y-4">
                {[
                  { title: 'Embedded Login', desc: 'Plug-and-play authentication with context injection' },
                  { title: 'Context SDK', desc: 'Full SDK for building Web2/Web3 applications' },
                  { title: 'MCP Server', desc: 'Expose context to AI agents via Model Context Protocol' },
                ].map((option, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-[#1A1333]/50 border border-[#8B5CF6]/10">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] flex items-center justify-center text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{option.title}</h4>
                      <p className="text-sm text-[#94A3B8]">{option.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://docs.plurality.network/developer-guides"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 text-[#8B5CF6] hover:text-[#A78BFA] transition-colors"
              >
                View Developer Documentation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>

            {/* Code Preview */}
            <div className="rounded-2xl bg-[#0F0A1F] border border-[#8B5CF6]/20 overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-[#1A1333] border-b border-[#8B5CF6]/10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-[#94A3B8]">integration.js</span>
              </div>
              <pre className="p-6 text-sm overflow-x-auto">
                <code className="text-[#A78BFA]">
{`import { PluralityAuth } from '@plurality/sdk';

const auth = new PluralityAuth({
  appId: 'your-app-id',
  redirectUri: 'https://yourapp.com/callback'
});

// Trigger login
await auth.login();

// Get user context
const context = await auth.getContext();

// Use context in your AI app
console.log(context.preferences);
console.log(context.history);`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] mb-4">
              <span className="gradient-text">Frequently Asked Questions</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openFaq === index
                    ? 'bg-gradient-to-r from-[#8B5CF6]/10 to-[#F59E0B]/10 border-[#8B5CF6]/40'
                    : 'bg-[#1A1333]/30 border-[#8B5CF6]/10 hover:border-[#8B5CF6]/30'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <h3 className="text-lg font-medium text-white pr-8">{faq.question}</h3>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      openFaq === index
                        ? 'bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] rotate-180'
                        : 'bg-[#251D3A]'
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 ${openFaq === index ? 'text-white' : 'text-[#8B5CF6]'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-[#94A3B8] leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/10 to-[#8B5CF6]/10" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6">
            <span className="text-white">Create Your </span>
            <span className="gradient-text">Smart Profile</span>
            <span className="text-white"> Today</span>
          </h2>
          <p className="text-lg text-[#94A3B8] mb-10">
            Take control of your digital identity. Connect once, use everywhere.
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
              to="/ai-context-flow"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[#E2E8F0] border border-[#8B5CF6]/30 hover:bg-[#8B5CF6]/10 hover:border-[#8B5CF6] transition-all"
            >
              Learn About AI Context Flow
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SmartProfiles;
