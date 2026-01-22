import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  checkExtensionInstalled,
  setExtensionId,
  syncContextsToExtension,
  getContextsFromExtension,
  saveContextToExtension,
  deleteContextFromExtension,
  setActiveContextInExtension,
  isChrome,
  getStoredExtensionId,
  clearExtensionId
} from '../utils/extensionBridge'

const ContextManager = () => {
  const [contexts, setContexts] = useState([])
  const [extensionConnected, setExtensionConnected] = useState(false)
  const [extensionVersion, setExtensionVersion] = useState(null)
  const [extensionIdInput, setExtensionIdInput] = useState('')
  const [showConnectModal, setShowConnectModal] = useState(false)
  const [showContextModal, setShowContextModal] = useState(false)
  const [editingContext, setEditingContext] = useState(null)
  const [activeContextId, setActiveContextId] = useState(null)
  const [syncStatus, setSyncStatus] = useState(null)
  const [error, setError] = useState(null)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    content: '',
    type: 'general'
  })

  const contextTypes = [
    { id: 'general', name: 'General', icon: '📝' },
    { id: 'work', name: 'Work', icon: '💼' },
    { id: 'coding', name: 'Coding', icon: '💻' },
    { id: 'creative', name: 'Creative', icon: '🎨' },
    { id: 'research', name: 'Research', icon: '🔬' },
    { id: 'personal', name: 'Personal', icon: '👤' }
  ]

  // Check extension connection on mount
  useEffect(() => {
    const storedId = getStoredExtensionId()
    if (storedId) {
      setExtensionIdInput(storedId)
      connectToExtension(storedId)
    }
    
    // Load contexts from localStorage as fallback
    const savedContexts = localStorage.getItem('ai_context_flow_contexts')
    if (savedContexts) {
      setContexts(JSON.parse(savedContexts))
    }
  }, [])

  // Save contexts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('ai_context_flow_contexts', JSON.stringify(contexts))
  }, [contexts])

  const connectToExtension = async (id) => {
    if (!isChrome()) {
      setError('Please use Chrome browser to connect to the extension')
      return
    }
    
    setError(null)
    setSyncStatus('Connecting...')
    
    try {
      const result = await checkExtensionInstalled(id)
      if (result.installed) {
        setExtensionConnected(true)
        setExtensionVersion(result.version)
        setShowConnectModal(false)
        setSyncStatus('Connected!')
        
        // Fetch contexts from extension
        try {
          const extContexts = await getContextsFromExtension()
          if (extContexts && extContexts.length > 0) {
            // Merge with local contexts
            mergeContexts(extContexts)
          }
        } catch (e) {
          console.log('Could not fetch contexts from extension:', e)
        }
        
        setTimeout(() => setSyncStatus(null), 2000)
      } else {
        setError(result.error || 'Could not connect to extension')
        setSyncStatus(null)
      }
    } catch (err) {
      setError(err.message)
      setSyncStatus(null)
    }
  }

  const mergeContexts = (extContexts) => {
    setContexts(prev => {
      const merged = [...prev]
      for (const extCtx of extContexts) {
        const existingIdx = merged.findIndex(c => c.id === extCtx.id)
        if (existingIdx === -1) {
          merged.push(extCtx)
        } else if (extCtx.updatedAt > merged[existingIdx].updatedAt) {
          merged[existingIdx] = extCtx
        }
      }
      return merged.sort((a, b) => b.updatedAt - a.updatedAt)
    })
  }

  const handleDisconnect = () => {
    clearExtensionId()
    setExtensionConnected(false)
    setExtensionVersion(null)
    setExtensionIdInput('')
  }

  const handleSaveContext = async () => {
    if (!formData.name || !formData.content) {
      setError('Name and content are required')
      return
    }

    const now = Date.now()
    let updatedContext

    if (editingContext) {
      updatedContext = {
        ...editingContext,
        ...formData,
        updatedAt: now
      }
      setContexts(prev => prev.map(c => c.id === editingContext.id ? updatedContext : c))
    } else {
      updatedContext = {
        id: `ctx_${now}_${Math.random().toString(36).substr(2, 9)}`,
        ...formData,
        createdAt: now,
        updatedAt: now
      }
      setContexts(prev => [updatedContext, ...prev])
    }

    // Sync to extension if connected
    if (extensionConnected) {
      try {
        await saveContextToExtension(updatedContext)
        setSyncStatus('Synced!')
        setTimeout(() => setSyncStatus(null), 2000)
      } catch (err) {
        console.error('Failed to sync to extension:', err)
      }
    }

    setShowContextModal(false)
    setEditingContext(null)
    setFormData({ name: '', description: '', content: '', type: 'general' })
    setError(null)
  }

  const handleEditContext = (context) => {
    setEditingContext(context)
    setFormData({
      name: context.name,
      description: context.description || '',
      content: context.content,
      type: context.type || 'general'
    })
    setShowContextModal(true)
  }

  const handleDeleteContext = async (contextId) => {
    setContexts(prev => prev.filter(c => c.id !== contextId))
    
    if (activeContextId === contextId) {
      setActiveContextId(null)
    }

    if (extensionConnected) {
      try {
        await deleteContextFromExtension(contextId)
      } catch (err) {
        console.error('Failed to delete from extension:', err)
      }
    }
  }

  const handleSetActive = async (contextId) => {
    const newActiveId = activeContextId === contextId ? null : contextId
    setActiveContextId(newActiveId)

    if (extensionConnected) {
      try {
        await setActiveContextInExtension(newActiveId)
        setSyncStatus('Active context updated!')
        setTimeout(() => setSyncStatus(null), 2000)
      } catch (err) {
        console.error('Failed to set active in extension:', err)
      }
    }
  }

  const handleSyncAll = async () => {
    if (!extensionConnected) {
      setError('Please connect to the extension first')
      return
    }

    setSyncStatus('Syncing...')
    try {
      await syncContextsToExtension(contexts)
      setSyncStatus('All contexts synced!')
      setTimeout(() => setSyncStatus(null), 2000)
    } catch (err) {
      setError('Failed to sync: ' + err.message)
      setSyncStatus(null)
    }
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-[#0F0A1F]">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] text-white mb-2">
                Context Manager
              </h1>
              <p className="text-[#94A3B8]">
                Create and manage your AI contexts. Sync them to the extension to use across all AI tools.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {extensionConnected ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm text-green-400">Connected v{extensionVersion}</span>
                  </div>
                  <button
                    onClick={handleSyncAll}
                    className="px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 12a9 9 0 0 1-9 9m9-9a9 9 0 0 0-9-9m9 9H3m9 9a9 9 0 0 1-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/>
                    </svg>
                    Sync All
                  </button>
                  <button
                    onClick={handleDisconnect}
                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowConnectModal(true)}
                  className="px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-lg text-white text-sm font-medium transition-colors flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                  Connect Extension
                </button>
              )}
            </div>
          </div>

          {/* Status Messages */}
          {syncStatus && (
            <div className="mb-6 px-4 py-3 bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 rounded-lg text-[#A78BFA] flex items-center gap-2">
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              {syncStatus}
            </div>
          )}
          
          {error && (
            <div className="mb-6 px-4 py-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 flex items-center justify-between">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          )}

          {/* Add Context Button */}
          <button
            onClick={() => {
              setEditingContext(null)
              setFormData({ name: '', description: '', content: '', type: 'general' })
              setShowContextModal(true)
            }}
            className="w-full mb-6 p-4 border-2 border-dashed border-[#8B5CF6]/30 hover:border-[#8B5CF6] rounded-xl text-[#8B5CF6] hover:bg-[#8B5CF6]/10 transition-all flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Create New Context
          </button>

          {/* Contexts Grid */}
          {contexts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#1A1333] flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No contexts yet</h3>
              <p className="text-[#94A3B8] mb-4">Create your first context to get started</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {contexts.map(context => (
                <div
                  key={context.id}
                  className={`relative p-5 rounded-xl border transition-all ${
                    activeContextId === context.id
                      ? 'bg-[#8B5CF6]/10 border-[#8B5CF6]'
                      : 'bg-[#1A1333] border-[#2D2D45] hover:border-[#8B5CF6]/50'
                  }`}
                >
                  {/* Active Badge */}
                  {activeContextId === context.id && (
                    <div className="absolute -top-2 -right-2 px-2 py-1 bg-[#8B5CF6] rounded-full text-xs font-medium text-white">
                      Active
                    </div>
                  )}
                  
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center text-lg">
                      {contextTypes.find(t => t.id === context.type)?.icon || '📝'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white truncate">{context.name}</h3>
                      <p className="text-sm text-[#94A3B8] truncate">{context.description || 'No description'}</p>
                    </div>
                  </div>
                  
                  {/* Content Preview */}
                  <div className="mb-4 p-3 bg-[#0F0A1F] rounded-lg">
                    <p className="text-sm text-[#94A3B8] line-clamp-3">{context.content}</p>
                  </div>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-[#252540] rounded text-[#A0A0B0] capitalize">
                        {context.type}
                      </span>
                      <span className="text-xs text-[#6B6B80]">{formatDate(context.updatedAt)}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleSetActive(context.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          activeContextId === context.id
                            ? 'bg-[#8B5CF6] text-white'
                            : 'hover:bg-[#252540] text-[#A0A0B0]'
                        }`}
                        title={activeContextId === context.id ? 'Deactivate' : 'Set as active'}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleEditContext(context)}
                        className="p-2 rounded-lg hover:bg-[#252540] text-[#A0A0B0] transition-colors"
                        title="Edit"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteContext(context.id)}
                        className="p-2 rounded-lg hover:bg-red-500/20 text-[#A0A0B0] hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Connect Extension Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1333] rounded-2xl border border-[#2D2D45] w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-white mb-4">Connect to Extension</h2>
            
            <div className="mb-4">
              <label className="block text-sm text-[#94A3B8] mb-2">Extension ID</label>
              <input
                type="text"
                value={extensionIdInput}
                onChange={(e) => setExtensionIdInput(e.target.value)}
                placeholder="Enter your extension ID"
                className="w-full px-4 py-3 bg-[#0F0A1F] border border-[#2D2D45] rounded-lg text-white placeholder-[#6B6B80] focus:border-[#8B5CF6] focus:outline-none"
              />
            </div>
            
            <div className="mb-6 p-4 bg-[#0F0A1F] rounded-lg">
              <h4 className="text-sm font-medium text-white mb-2">How to find your Extension ID:</h4>
              <ol className="text-sm text-[#94A3B8] space-y-1">
                <li>1. Open <code className="text-[#A78BFA]">chrome://extensions</code></li>
                <li>2. Enable "Developer mode"</li>
                <li>3. Find "AI Context Flow" extension</li>
                <li>4. Copy the ID shown below the extension name</li>
              </ol>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowConnectModal(false)}
                className="flex-1 px-4 py-3 bg-[#252540] hover:bg-[#2D2D45] rounded-lg text-white font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => connectToExtension(extensionIdInput)}
                disabled={!extensionIdInput}
                className="flex-1 px-4 py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Context Modal */}
      {showContextModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1A1333] rounded-2xl border border-[#2D2D45] w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingContext ? 'Edit Context' : 'Create New Context'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#94A3B8] mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Work Project, Writing Style"
                  className="w-full px-4 py-3 bg-[#0F0A1F] border border-[#2D2D45] rounded-lg text-white placeholder-[#6B6B80] focus:border-[#8B5CF6] focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm text-[#94A3B8] mb-2">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of this context"
                  className="w-full px-4 py-3 bg-[#0F0A1F] border border-[#2D2D45] rounded-lg text-white placeholder-[#6B6B80] focus:border-[#8B5CF6] focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm text-[#94A3B8] mb-2">Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {contextTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setFormData({ ...formData, type: type.id })}
                      className={`p-3 rounded-lg border text-sm font-medium transition-all flex items-center gap-2 ${
                        formData.type === type.id
                          ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white'
                          : 'bg-[#0F0A1F] border-[#2D2D45] text-[#94A3B8] hover:border-[#8B5CF6]/50'
                      }`}
                    >
                      <span>{type.icon}</span>
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-[#94A3B8] mb-2">Content *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter the context content that will be injected into AI chats...

Example:
- Your role or expertise
- Project details
- Coding guidelines
- Writing style preferences
- Any information you want the AI to remember"
                  rows={10}
                  className="w-full px-4 py-3 bg-[#0F0A1F] border border-[#2D2D45] rounded-lg text-white placeholder-[#6B6B80] focus:border-[#8B5CF6] focus:outline-none resize-none"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowContextModal(false)
                  setEditingContext(null)
                  setFormData({ name: '', description: '', content: '', type: 'general' })
                }}
                className="flex-1 px-4 py-3 bg-[#252540] hover:bg-[#2D2D45] rounded-lg text-white font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveContext}
                disabled={!formData.name || !formData.content}
                className="flex-1 px-4 py-3 bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-colors"
              >
                {editingContext ? 'Save Changes' : 'Create Context'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default ContextManager
