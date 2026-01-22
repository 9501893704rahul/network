import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const ExtensionDemo = () => {
  const [activeTab, setActiveTab] = useState('contexts')
  const [contexts, setContexts] = useState([
    {
      id: '1',
      name: 'Work Project',
      description: 'React development guidelines and coding standards',
      type: 'coding',
      content: 'I am working on a React project using TypeScript, Tailwind CSS, and Vite. Please follow these guidelines:\n- Use functional components with hooks\n- Prefer TypeScript strict mode\n- Use Tailwind for styling\n- Follow clean code principles',
      updatedAt: Date.now() - 3600000
    },
    {
      id: '2',
      name: 'Content Writing',
      description: 'Brand voice and writing style preferences',
      type: 'creative',
      content: 'Writing style: Professional yet approachable. Use active voice. Keep sentences concise. Target audience: Tech-savvy professionals aged 25-45.',
      updatedAt: Date.now() - 86400000
    }
  ])
  const [showModal, setShowModal] = useState(false)
  const [editingContext, setEditingContext] = useState(null)
  const [promptInput, setPromptInput] = useState('')
  const [selectedContext, setSelectedContext] = useState('')
  const [optimizedPrompt, setOptimizedPrompt] = useState('')
  const [activeContextId, setActiveContextId] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    content: '',
    type: 'general'
  })

  const typeIcons = {
    general: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
      </svg>
    ),
    work: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    coding: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    creative: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 19l7-7 3 3-7 7-3-3z"/>
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
      </svg>
    )
  }

  const formatDate = (timestamp) => {
    const diff = Date.now() - timestamp
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
    return `${Math.floor(diff / 86400000)}d ago`
  }

  const handleSaveContext = () => {
    if (!formData.name || !formData.content) return

    if (editingContext) {
      setContexts(contexts.map(c => 
        c.id === editingContext.id 
          ? { ...c, ...formData, updatedAt: Date.now() }
          : c
      ))
    } else {
      setContexts([
        {
          id: Date.now().toString(),
          ...formData,
          updatedAt: Date.now()
        },
        ...contexts
      ])
    }
    
    setShowModal(false)
    setEditingContext(null)
    setFormData({ name: '', description: '', content: '', type: 'general' })
  }

  const handleEditContext = (context) => {
    setEditingContext(context)
    setFormData({
      name: context.name,
      description: context.description,
      content: context.content,
      type: context.type
    })
    setShowModal(true)
  }

  const handleDeleteContext = (id) => {
    setContexts(contexts.filter(c => c.id !== id))
    if (activeContextId === id) setActiveContextId(null)
  }

  const handleOptimize = () => {
    if (!promptInput) return

    const context = contexts.find(c => c.id === selectedContext)
    
    if (context) {
      setOptimizedPrompt(`[Context: ${context.name}]
${context.content}

---

[User Request]
${promptInput}

---

Please respond considering the context provided above. Maintain consistency with any preferences, guidelines, or information specified in the context.`)
    } else {
      setOptimizedPrompt(`${promptInput}

Please provide a detailed and comprehensive response. Be thorough in your explanation.`)
    }
  }

  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-[#0F0A1F]">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8B5CF6]/20 to-[#F59E0B]/20 border border-[#8B5CF6]/30 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
              <span className="text-sm font-medium text-[#A78BFA]">CHROME EXTENSION</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold font-['Space_Grotesk'] mb-6">
              <span className="text-white">AI </span>
              <span className="gradient-text">Context Flow</span>
            </h1>
            
            <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto mb-8">
              Your universal memory across AI tools. Save context once, use it anywhere - 
              ChatGPT, Claude, Gemini, Grok, Perplexity and more.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a 
                href="/ai-context-flow.zip"
                download="ai-context-flow.zip"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] rounded-full text-white font-semibold hover:shadow-lg hover:shadow-[#8B5CF6]/30 transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download Extension
              </a>
              <a 
                href="https://github.com/9501893704rahul/network/tree/main/extension"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1333] border border-[#8B5CF6]/30 rounded-full text-white font-semibold hover:border-[#8B5CF6] transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View Source
              </a>
            </div>

            {/* Installation Instructions */}
            <div className="bg-[#1A1333] border border-[#8B5CF6]/30 rounded-2xl p-6 mb-12">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4"/>
                  <path d="M12 8h.01"/>
                </svg>
                Installation Guide
              </h3>
              <ol className="space-y-3 text-[#94A3B8]">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8B5CF6] text-white text-sm flex items-center justify-center font-semibold">1</span>
                  <span>Click <strong className="text-white">"Download Extension"</strong> to get the ZIP file</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8B5CF6] text-white text-sm flex items-center justify-center font-semibold">2</span>
                  <span>Extract the ZIP file to a folder on your computer</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8B5CF6] text-white text-sm flex items-center justify-center font-semibold">3</span>
                  <span>Open Chrome and go to <code className="bg-[#0F0A1F] px-2 py-1 rounded text-[#A78BFA]">chrome://extensions</code></span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8B5CF6] text-white text-sm flex items-center justify-center font-semibold">4</span>
                  <span>Enable <strong className="text-white">"Developer mode"</strong> (toggle in top right)</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8B5CF6] text-white text-sm flex items-center justify-center font-semibold">5</span>
                  <span>Click <strong className="text-white">"Load unpacked"</strong> and select the extracted folder</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#8B5CF6] text-white text-sm flex items-center justify-center font-semibold">6</span>
                  <span>The extension icon will appear in your toolbar - you're ready to go! 🎉</span>
                </li>
              </ol>
            </div>
          </div>

          {/* Extension Demo */}
          <div className="max-w-md mx-auto">
            <div className="bg-[#0F0F1A] rounded-2xl border border-[#2D2D45] overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-4 bg-[#1A1A2E] border-b border-[#2D2D45]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <circle cx="12" cy="12" r="4" fill="white"/>
                    </svg>
                  </div>
                  <span className="font-semibold bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
                    AI Context Flow
                  </span>
                </div>
                <button className="p-2 rounded-lg hover:bg-[#252540] text-[#A0A0B0] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                </button>
              </div>

              {/* Tabs */}
              <div className="flex p-2 gap-1 bg-[#1A1A2E] border-b border-[#2D2D45]">
                {['contexts', 'optimize', 'history'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab 
                        ? 'bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] text-white' 
                        : 'text-[#A0A0B0] hover:bg-[#252540]'
                    }`}
                  >
                    {tab === 'contexts' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                      </svg>
                    )}
                    {tab === 'optimize' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                      </svg>
                    )}
                    {tab === 'history' && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                    )}
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="p-4 min-h-[400px] max-h-[500px] overflow-y-auto">
                {/* Contexts Tab */}
                {activeTab === 'contexts' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-white">Memory Buckets</h3>
                      <button 
                        onClick={() => {
                          setEditingContext(null)
                          setFormData({ name: '', description: '', content: '', type: 'general' })
                          setShowModal(true)
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] rounded-lg text-xs font-medium text-white"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="5" x2="12" y2="19"/>
                          <line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        New
                      </button>
                    </div>

                    <div className="space-y-3">
                      {contexts.map(context => (
                        <div 
                          key={context.id}
                          onClick={() => setActiveContextId(context.id)}
                          className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                            activeContextId === context.id 
                              ? 'bg-[#8B5CF6]/10 border-[#8B5CF6]' 
                              : 'bg-[#1A1A2E] border-[#2D2D45] hover:border-[#8B5CF6]/50'
                          }`}
                        >
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center text-white flex-shrink-0">
                            {typeIcons[context.type]}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm text-white truncate">{context.name}</div>
                            <div className="text-xs text-[#A0A0B0] truncate">{context.description}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[#252540] rounded text-[#A0A0B0]">
                                {context.type}
                              </span>
                              <span className="text-[10px] text-[#6B6B80]">{formatDate(context.updatedAt)}</span>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleEditContext(context) }}
                              className="p-1.5 rounded-md hover:bg-[#252540] text-[#A0A0B0] transition-colors"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                              </svg>
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleDeleteContext(context.id) }}
                              className="p-1.5 rounded-md hover:bg-[#252540] text-[#A0A0B0] transition-colors"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Optimize Tab */}
                {activeTab === 'optimize' && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Prompt Optimizer</h3>
                    <p className="text-xs text-[#A0A0B0] mb-4">Enhance your prompts with saved context</p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-[#A0A0B0] mb-2">Your Prompt</label>
                        <textarea
                          value={promptInput}
                          onChange={(e) => setPromptInput(e.target.value)}
                          placeholder="Enter your prompt here..."
                          className="w-full p-3 bg-[#1A1A2E] border border-[#2D2D45] rounded-lg text-sm text-white placeholder-[#6B6B80] focus:border-[#8B5CF6] focus:outline-none resize-none"
                          rows={4}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#A0A0B0] mb-2">Select Context</label>
                        <select
                          value={selectedContext}
                          onChange={(e) => setSelectedContext(e.target.value)}
                          className="w-full p-3 bg-[#1A1A2E] border border-[#2D2D45] rounded-lg text-sm text-white focus:border-[#8B5CF6] focus:outline-none appearance-none cursor-pointer"
                        >
                          <option value="">-- Select a context --</option>
                          {contexts.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <button
                        onClick={handleOptimize}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                        </svg>
                        Optimize Prompt
                      </button>

                      {optimizedPrompt && (
                        <div className="mt-4 p-4 bg-[#1A1A2E] border border-[#2D2D45] rounded-xl">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-medium text-white">Optimized Prompt</h4>
                            <button 
                              onClick={() => copyToClipboard(optimizedPrompt)}
                              className="p-1.5 rounded-md hover:bg-[#252540] text-[#A0A0B0] transition-colors"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                              </svg>
                            </button>
                          </div>
                          <div className="p-3 bg-[#0F0F1A] rounded-lg text-xs text-[#A0A0B0] whitespace-pre-wrap max-h-40 overflow-y-auto">
                            {optimizedPrompt}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#1A1A2E] flex items-center justify-center mb-4 text-[#6B6B80]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                      </svg>
                    </div>
                    <h3 className="text-sm font-medium text-white mb-2">No history yet</h3>
                    <p className="text-xs text-[#6B6B80]">Your optimized prompts and context usage will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-20 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                ),
                title: 'Persistent AI Memory',
                description: 'Save your project details, client notes, tech stack, or brand voice once and reuse across all AI platforms.'
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                ),
                title: 'One-Click Optimization',
                description: 'Instantly inject the right context without retyping long instructions. Get better results with less effort.'
              },
              {
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                ),
                title: 'Cross-AI Portability',
                description: 'Works across ChatGPT, Claude, Gemini, Grok, Perplexity, DeepSeek and more. Your context travels with you.'
              }
            ].map((feature, index) => (
              <div key={index} className="p-6 bg-[#1A1333] rounded-2xl border border-[#8B5CF6]/20 hover:border-[#8B5CF6]/50 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-[#94A3B8]">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Installation Guide */}
          <div className="mt-20 p-8 bg-[#1A1333] rounded-2xl border border-[#8B5CF6]/20">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">How to Install</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Download', desc: 'Download the extension files from this page' },
                { step: '2', title: 'Open Chrome', desc: 'Go to chrome://extensions in your browser' },
                { step: '3', title: 'Enable Dev Mode', desc: 'Toggle "Developer mode" in the top right' },
                { step: '4', title: 'Load Extension', desc: 'Click "Load unpacked" and select the extension folder' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center text-white font-bold mx-auto mb-3">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-[#94A3B8]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-md bg-[#0F0F1A] border border-[#2D2D45] rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#2D2D45]">
              <h3 className="text-lg font-semibold text-white">
                {editingContext ? 'Edit Context' : 'Create Context'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 rounded-lg hover:bg-[#252540] text-[#A0A0B0]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#A0A0B0] mb-2">Context Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Work Project, Personal, Coding"
                  className="w-full p-3 bg-[#1A1A2E] border border-[#2D2D45] rounded-lg text-sm text-white placeholder-[#6B6B80] focus:border-[#8B5CF6] focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-[#A0A0B0] mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of this context"
                  className="w-full p-3 bg-[#1A1A2E] border border-[#2D2D45] rounded-lg text-sm text-white placeholder-[#6B6B80] focus:border-[#8B5CF6] focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-[#A0A0B0] mb-2">Context Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter your context details, preferences, instructions..."
                  className="w-full p-3 bg-[#1A1A2E] border border-[#2D2D45] rounded-lg text-sm text-white placeholder-[#6B6B80] focus:border-[#8B5CF6] focus:outline-none resize-none"
                  rows={6}
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-[#A0A0B0] mb-2">Context Type</label>
                <div className="grid grid-cols-4 gap-2">
                  {['general', 'work', 'coding', 'creative'].map(type => (
                    <button
                      key={type}
                      onClick={() => setFormData({ ...formData, type })}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-all ${
                        formData.type === type 
                          ? 'bg-[#8B5CF6]/10 border-[#8B5CF6] text-[#8B5CF6]' 
                          : 'bg-[#1A1A2E] border-[#2D2D45] text-[#A0A0B0] hover:border-[#8B5CF6]/50'
                      }`}
                    >
                      {typeIcons[type]}
                      <span className="text-[10px] capitalize">{type}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 p-4 border-t border-[#2D2D45]">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 py-2.5 bg-[#252540] border border-[#2D2D45] rounded-lg text-sm font-medium text-white hover:bg-[#1A1A2E] transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveContext}
                className="flex-1 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] rounded-lg text-sm font-medium text-white hover:opacity-90 transition-opacity"
              >
                Save Context
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default ExtensionDemo
