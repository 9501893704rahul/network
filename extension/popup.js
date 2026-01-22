// AI Context Flow - Popup Script

class AIContextFlow {
  constructor() {
    this.contexts = [];
    this.history = [];
    this.activeContextId = null;
    this.editingContextId = null;
    this.selectedType = 'general';
    
    this.init();
  }

  async init() {
    await this.loadData();
    this.bindEvents();
    this.renderContexts();
    this.renderHistory();
    this.updateContextSelect();
    
    // Listen for storage changes (when contexts are synced from web app)
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (namespace === 'local' && changes.contexts) {
        console.log('Contexts updated from external source');
        this.contexts = changes.contexts.newValue || [];
        this.renderContexts();
        this.updateContextSelect();
      }
      if (namespace === 'local' && changes.activeContextId) {
        this.activeContextId = changes.activeContextId.newValue;
        this.renderContexts();
        this.updateContextSelect();
      }
    });
  }

  // Data Management
  async loadData() {
    try {
      const result = await chrome.storage.local.get(['contexts', 'history', 'activeContextId']);
      this.contexts = result.contexts || [];
      this.history = result.history || [];
      this.activeContextId = result.activeContextId || null;
    } catch (error) {
      console.error('Error loading data:', error);
      this.contexts = [];
      this.history = [];
    }
  }

  async saveData() {
    try {
      await chrome.storage.local.set({
        contexts: this.contexts,
        history: this.history,
        activeContextId: this.activeContextId
      });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  // Event Bindings
  bindEvents() {
    // Tab Navigation
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
    });

    // Context Actions
    document.getElementById('addContextBtn')?.addEventListener('click', () => this.openModal());
    document.getElementById('createFirstContext')?.addEventListener('click', () => this.openModal());
    document.getElementById('closeModal')?.addEventListener('click', () => this.closeModal());
    document.getElementById('cancelContext')?.addEventListener('click', () => this.closeModal());
    document.getElementById('saveContext')?.addEventListener('click', () => this.saveContext());

    // Modal Overlay Click
    document.querySelector('.modal-overlay')?.addEventListener('click', () => this.closeModal());

    // Type Selector
    document.querySelectorAll('.type-btn').forEach(btn => {
      btn.addEventListener('click', () => this.selectType(btn.dataset.type));
    });

    // Optimize Actions
    document.getElementById('optimizeBtn')?.addEventListener('click', () => this.optimizePrompt());
    document.getElementById('copyOptimized')?.addEventListener('click', () => this.copyOptimizedPrompt());
    document.getElementById('injectPrompt')?.addEventListener('click', () => this.injectPrompt());

    // History Actions
    document.getElementById('clearHistory')?.addEventListener('click', () => this.clearHistory());

    // Settings
    document.getElementById('settingsBtn')?.addEventListener('click', () => this.openSettings());
  }

  // Tab Navigation
  switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `${tabName}-tab`);
    });
  }

  // Context Management
  renderContexts() {
    const contextList = document.getElementById('contextList');
    const emptyState = document.getElementById('emptyState');
    
    if (this.contexts.length === 0) {
      contextList.style.display = 'none';
      emptyState.style.display = 'flex';
      return;
    }

    contextList.style.display = 'flex';
    emptyState.style.display = 'none';

    contextList.innerHTML = this.contexts.map(context => `
      <div class="context-card ${context.id === this.activeContextId ? 'active' : ''}" data-id="${context.id}">
        <div class="context-icon">
          ${this.getTypeIcon(context.type)}
        </div>
        <div class="context-info">
          <div class="context-name">${this.escapeHtml(context.name)}</div>
          <div class="context-description">${this.escapeHtml(context.description || 'No description')}</div>
          <div class="context-meta">
            <span class="context-type">${context.type}</span>
            <span>${this.formatDate(context.updatedAt)}</span>
          </div>
        </div>
        <div class="context-actions">
          <button class="btn-icon edit-context" data-id="${context.id}" title="Edit">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button class="btn-icon delete-context" data-id="${context.id}" title="Delete">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
          </button>
        </div>
      </div>
    `).join('');

    // Bind context card events
    contextList.querySelectorAll('.context-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (!e.target.closest('.context-actions')) {
          this.setActiveContext(card.dataset.id);
        }
      });
    });

    contextList.querySelectorAll('.edit-context').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.editContext(btn.dataset.id);
      });
    });

    contextList.querySelectorAll('.delete-context').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteContext(btn.dataset.id);
      });
    });
  }

  getTypeIcon(type) {
    const icons = {
      general: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>',
      work: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
      coding: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      creative: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>'
    };
    return icons[type] || icons.general;
  }

  setActiveContext(contextId) {
    this.activeContextId = contextId;
    this.saveData();
    this.renderContexts();
    this.showToast('Context activated', 'success');
    
    // Notify content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'CONTEXT_CHANGED',
          context: this.contexts.find(c => c.id === contextId)
        }).catch(() => {});
      }
    });
  }

  openModal(contextId = null) {
    const modal = document.getElementById('contextModal');
    const title = document.getElementById('modalTitle');
    
    this.editingContextId = contextId;
    
    if (contextId) {
      const context = this.contexts.find(c => c.id === contextId);
      if (context) {
        title.textContent = 'Edit Context';
        document.getElementById('contextName').value = context.name;
        document.getElementById('contextDescription').value = context.description || '';
        document.getElementById('contextContent').value = context.content;
        this.selectType(context.type);
      }
    } else {
      title.textContent = 'Create Context';
      document.getElementById('contextName').value = '';
      document.getElementById('contextDescription').value = '';
      document.getElementById('contextContent').value = '';
      this.selectType('general');
    }
    
    modal.classList.add('active');
  }

  closeModal() {
    const modal = document.getElementById('contextModal');
    modal.classList.remove('active');
    this.editingContextId = null;
  }

  selectType(type) {
    this.selectedType = type;
    document.querySelectorAll('.type-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.type === type);
    });
  }

  saveContext() {
    const name = document.getElementById('contextName').value.trim();
    const description = document.getElementById('contextDescription').value.trim();
    const content = document.getElementById('contextContent').value.trim();

    if (!name) {
      this.showToast('Please enter a context name', 'error');
      return;
    }

    if (!content) {
      this.showToast('Please enter context content', 'error');
      return;
    }

    const now = Date.now();

    if (this.editingContextId) {
      const index = this.contexts.findIndex(c => c.id === this.editingContextId);
      if (index !== -1) {
        this.contexts[index] = {
          ...this.contexts[index],
          name,
          description,
          content,
          type: this.selectedType,
          updatedAt: now
        };
        this.showToast('Context updated', 'success');
      }
    } else {
      const newContext = {
        id: this.generateId(),
        name,
        description,
        content,
        type: this.selectedType,
        createdAt: now,
        updatedAt: now
      };
      this.contexts.unshift(newContext);
      this.showToast('Context created', 'success');
    }

    this.saveData();
    this.renderContexts();
    this.updateContextSelect();
    this.closeModal();
  }

  editContext(contextId) {
    this.openModal(contextId);
  }

  deleteContext(contextId) {
    if (confirm('Are you sure you want to delete this context?')) {
      this.contexts = this.contexts.filter(c => c.id !== contextId);
      if (this.activeContextId === contextId) {
        this.activeContextId = null;
      }
      this.saveData();
      this.renderContexts();
      this.updateContextSelect();
      this.showToast('Context deleted', 'success');
    }
  }

  // Prompt Optimization
  updateContextSelect() {
    const select = document.getElementById('contextSelect');
    if (!select) return;

    select.innerHTML = '<option value="">-- Select a context --</option>' +
      this.contexts.map(c => `<option value="${c.id}">${this.escapeHtml(c.name)}</option>`).join('');
    
    if (this.activeContextId) {
      select.value = this.activeContextId;
    }
  }

  optimizePrompt() {
    const promptInput = document.getElementById('promptInput');
    const contextSelect = document.getElementById('contextSelect');
    const resultDiv = document.getElementById('optimizedResult');
    const resultContent = document.getElementById('optimizedContent');

    const prompt = promptInput.value.trim();
    const contextId = contextSelect.value;

    if (!prompt) {
      this.showToast('Please enter a prompt', 'error');
      return;
    }

    let optimizedPrompt = prompt;
    let contextUsed = null;

    if (contextId) {
      const context = this.contexts.find(c => c.id === contextId);
      if (context) {
        contextUsed = context;
        optimizedPrompt = this.buildOptimizedPrompt(prompt, context);
      }
    } else {
      optimizedPrompt = this.enhancePrompt(prompt);
    }

    resultContent.textContent = optimizedPrompt;
    resultDiv.style.display = 'block';

    // Add to history
    this.addToHistory({
      type: 'optimize',
      originalPrompt: prompt,
      optimizedPrompt,
      contextName: contextUsed?.name || null,
      timestamp: Date.now()
    });

    this.showToast('Prompt optimized!', 'success');
  }

  buildOptimizedPrompt(prompt, context) {
    return `[Context: ${context.name}]
${context.content}

---

[User Request]
${prompt}

---

Please respond considering the context provided above. Maintain consistency with any preferences, guidelines, or information specified in the context.`;
  }

  enhancePrompt(prompt) {
    // Basic prompt enhancement without context
    const enhancements = [];
    
    if (prompt.length < 50) {
      enhancements.push('Please provide a detailed and comprehensive response.');
    }
    
    if (!prompt.includes('?') && !prompt.toLowerCase().includes('please')) {
      enhancements.push('Be thorough in your explanation.');
    }

    if (enhancements.length > 0) {
      return `${prompt}\n\n${enhancements.join(' ')}`;
    }
    
    return prompt;
  }

  async copyOptimizedPrompt() {
    const content = document.getElementById('optimizedContent').textContent;
    try {
      await navigator.clipboard.writeText(content);
      this.showToast('Copied to clipboard!', 'success');
    } catch (error) {
      this.showToast('Failed to copy', 'error');
    }
  }

  async injectPrompt() {
    const content = document.getElementById('optimizedContent').textContent;
    
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (tab) {
        await chrome.tabs.sendMessage(tab.id, {
          type: 'INJECT_PROMPT',
          prompt: content
        });
        this.showToast('Prompt injected!', 'success');
      }
    } catch (error) {
      // Copy to clipboard as fallback
      await navigator.clipboard.writeText(content);
      this.showToast('Copied to clipboard (injection not available on this page)', 'success');
    }
  }

  // History Management
  addToHistory(item) {
    this.history.unshift({
      id: this.generateId(),
      ...item
    });
    
    // Keep only last 50 items
    if (this.history.length > 50) {
      this.history = this.history.slice(0, 50);
    }
    
    this.saveData();
    this.renderHistory();
  }

  renderHistory() {
    const historyList = document.getElementById('historyList');
    const emptyState = document.getElementById('historyEmpty');
    
    if (this.history.length === 0) {
      historyList.style.display = 'none';
      emptyState.style.display = 'flex';
      return;
    }

    historyList.style.display = 'flex';
    emptyState.style.display = 'none';

    historyList.innerHTML = this.history.slice(0, 20).map(item => `
      <div class="history-item">
        <div class="history-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
        </div>
        <div class="history-info">
          <div class="history-title">${this.escapeHtml(item.originalPrompt.substring(0, 50))}${item.originalPrompt.length > 50 ? '...' : ''}</div>
          <div class="history-time">${item.contextName ? `Used: ${item.contextName} • ` : ''}${this.formatDate(item.timestamp)}</div>
        </div>
      </div>
    `).join('');
  }

  clearHistory() {
    if (confirm('Are you sure you want to clear all history?')) {
      this.history = [];
      this.saveData();
      this.renderHistory();
      this.showToast('History cleared', 'success');
    }
  }

  // Settings
  openSettings() {
    this.showToast('Settings coming soon!', 'success');
  }

  // Utilities
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
    
    return date.toLocaleDateString();
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = toast.querySelector('.toast-message');
    
    toastMessage.textContent = message;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AIContextFlow();
});
