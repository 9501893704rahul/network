import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'What is AI context management, and how does the Open Context Layer work?',
      answer: 'AI context management refers to how AI systems store, retrieve, and use information about you to provide personalized responses. The Open Context Layer (OCL) is a decentralized infrastructure that lets you own and control your AI context, making it portable across different AI platforms while maintaining your privacy.',
    },
    {
      question: 'Why is portable memory important for AI users?',
      answer: 'Portable memory means you don\'t have to start from scratch every time you use a new AI tool. Your preferences, writing style, and accumulated knowledge travel with you, making every AI interaction more personalized and efficient from the first message.',
    },
    {
      question: 'How does the context layer protect my privacy and data ownership?',
      answer: 'Your data is encrypted and stored in a way that only you control. You decide exactly what context to share, with which AI platforms, and for how long. Unlike traditional AI services, your data is never used to train models without your explicit consent.',
    },
    {
      question: 'How is the Open Context Layer different from existing AI memory solutions?',
      answer: 'Unlike platform-specific memory features, OCL is universal and user-owned. It works across all major AI platforms, gives you full control over your data, and uses decentralized technology to ensure your context can\'t be locked into any single provider.',
    },
    {
      question: 'How do I get started with the Open Context Layer?',
      answer: 'Getting started is simple: Create a Smart Profile, connect your existing accounts, and install our browser extension or use our API. Your AI context will automatically sync across supported platforms.',
    },
    {
      question: 'Can I use my AI context across multiple platforms?',
      answer: 'Yes! That\'s the core benefit of OCL. Your context works seamlessly across ChatGPT, Claude, Gemini, and many other AI platforms. One profile, universal access.',
    },
    {
      question: 'What happens to my data if an AI platform changes or shuts down?',
      answer: 'Because you own your data through OCL, it\'s never locked into any single platform. If a platform changes its policies or shuts down, your context remains safe and portable to other services.',
    },
  ];

  return (
    <section id="faq" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0F0A1F]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#8B5CF6]/5 rounded-full blur-[150px]" />

      <div className="relative max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 mb-6">
            <svg className="w-5 h-5 text-[#F59E0B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-[#FBBF24]">QUESTIONS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk']">
            <span className="gradient-text">FAQs</span>
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                openIndex === index
                  ? 'bg-gradient-to-r from-[#8B5CF6]/10 to-[#F59E0B]/10 border-[#8B5CF6]/40'
                  : 'bg-[#1A1333]/30 border-[#8B5CF6]/10 hover:border-[#8B5CF6]/30'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="text-lg font-medium text-white pr-8">{faq.question}</h3>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    openIndex === index
                      ? 'bg-gradient-to-br from-[#8B5CF6] to-[#F59E0B] rotate-180'
                      : 'bg-[#251D3A]'
                  }`}
                >
                  <svg
                    className={`w-4 h-4 ${openIndex === index ? 'text-white' : 'text-[#8B5CF6]'}`}
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
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-6 pb-6 text-[#94A3B8] leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Help Link */}
        <div className="text-center mt-12">
          <p className="text-[#94A3B8]">
            Still have a question? Browse{' '}
            <a href="https://docs.plurality.network/" className="text-[#8B5CF6] hover:text-[#A78BFA] underline">
              documentation
            </a>{' '}
            or{' '}
            <a href="mailto:contact@plurality.network" className="text-[#8B5CF6] hover:text-[#A78BFA] underline">
              submit a ticket.
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
