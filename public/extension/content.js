// AI Context Flow - Content Script
// Injects into AI chat platforms to provide context injection functionality

(function() {
  'use strict';

  // Platform detection
  const PLATFORMS = {
    CHATGPT: {
      name: 'ChatGPT',
      hostnames: ['chat.openai.com', 'chatgpt.com'],
      inputSelector: '#prompt-textarea, textarea[data-id="root"]',
      submitSelector: 'button[data-testid="send-button"], button[data-testid="fruitjuice-send-button"]'
    },
    CLAUDE: {
      name: 'Claude',
      hostnames: ['claude.ai'],
      inputSelector: 'div[contenteditable="true"], textarea',
      submitSelector: 'button[aria-label="Send Message"]'
    },
    GEMINI: {
      name: 'Gemini',
      hostnames: ['gemini.google.com'],
      inputSelector: 'rich-textarea, textarea',
      submitSelector: 'button[aria-label="Send message"]'
    },
    GROK: {
      name: 'Grok',
      hostnames: ['grok.x.ai'],
      inputSelector: 'textarea',
      submitSelector: 'button[type="submit"]'
    },
    PERPLEXITY: {
      name: 'Perplexity',
      hostnames: ['www.perplexity.ai'],
      inputSelector: 'textarea',
      submitSelector: 'button[aria-label="Submit"]'
    },
    DEEPSEEK: {
      name: 'DeepSeek',
      hostnames: ['chat.deepseek.com'],
      inputSelector: 'textarea',
      submitSelector: 'button[type="submit"]'
    }
  };

  let currentPlatform = null;
  let floatingButton = null;
  let contextPanel = null;
  let activeContext = null;

  // Initialize
  function init() {
    currentPlatform = detectPlatform();
    if (!currentPlatform) return;

    console.log(`AI Context Flow: Detected ${currentPlatform.name}`);
    
    createFloatingButton();
    createContextPanel();
    loadActiveContext();
    setupMessageListener();
    setupKeyboardShortcuts();
  }

  // Detect current platform
  function detectPlatform() {
    const hostname = window.location.hostname;
    for (const [key, platform] of Object.entries(PLATFORMS)) {
      if (platform.hostnames.some(h => hostname.includes(h))) {
        return platform;
      }
    }
    return null;
  }

  // Create floating action button
  function createFloatingButton() {
    floatingButton = document.createElement('div');
    floatingButton.id = 'acf-floating-button';
    floatingButton.innerHTML = `
      <div class="acf-fab-main">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <circle cx="12" cy="12" r="4" fill="currentColor"/>
        </svg>
      </div>
      <div class="acf-fab-tooltip">AI Context Flow</div>
    `;
    
    floatingButton.addEventListener('click', toggleContextPanel);
    document.body.appendChild(floatingButton);
  }

  // Create context panel
  function createContextPanel() {
    contextPanel = document.createElement('div');
    contextPanel.id = 'acf-context-panel';
    contextPanel.innerHTML = `
      <div class="acf-panel-header">
        <div class="acf-panel-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="4" fill="currentColor"/>
          </svg>
          <span>AI Context Flow</span>
        </div>
        <button class="acf-panel-close" id="acf-close-panel">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      
      <div class="acf-panel-body">
        <div class="acf-active-context" id="acf-active-context">
          <div class="acf-context-label">Active Context</div>
          <div class="acf-context-name" id="acf-context-name">No context selected</div>
        </div>
        
        <div class="acf-quick-actions">
          <button class="acf-action-btn" id="acf-optimize-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            Optimize Prompt
          </button>
          <button class="acf-action-btn" id="acf-inject-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 2L11 13"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
            </svg>
            Inject Context
          </button>
        </div>
        
        <div class="acf-context-list" id="acf-context-list">
          <div class="acf-context-label">Available Contexts</div>
          <div class="acf-contexts" id="acf-contexts">
            <!-- Contexts will be loaded here -->
          </div>
        </div>
        
        <div class="acf-panel-footer">
          <a href="#" id="acf-open-extension">Open Extension</a>
        </div>
      </div>
    `;
    
    document.body.appendChild(contextPanel);
    
    // Bind events
    document.getElementById('acf-close-panel').addEventListener('click', toggleContextPanel);
    document.getElementById('acf-optimize-btn').addEventListener('click', optimizeCurrentPrompt);
    document.getElementById('acf-inject-btn').addEventListener('click', injectContext);
    document.getElementById('acf-open-extension').addEventListener('click', (e) => {
      e.preventDefault();
      chrome.runtime.sendMessage({ type: 'OPEN_POPUP' });
    });
  }

  // Toggle context panel visibility
  function toggleContextPanel() {
    contextPanel.classList.toggle('active');
    floatingButton.classList.toggle('active');
    
    if (contextPanel.classList.contains('active')) {
      loadContextList();
    }
  }

  // Load active context from storage
  async function loadActiveContext() {
    try {
      const response = await chrome.runtime.sendMessage({ type: 'GET_ACTIVE_CONTEXT' });
      if (response) {
        activeContext = response;
        updateActiveContextDisplay();
      }
    } catch (error) {
      console.error('Error loading active context:', error);
    }
  }

  // Load all contexts for the panel
  async function loadContextList() {
    try {
      const contexts = await chrome.runtime.sendMessage({ type: 'GET_ALL_CONTEXTS' });
      const container = document.getElementById('acf-contexts');
      
      if (!contexts || contexts.length === 0) {
        container.innerHTML = '<div class="acf-empty">No contexts yet. Create one in the extension.</div>';
        return;
      }
      
      container.innerHTML = contexts.map(ctx => `
        <div class="acf-context-item ${ctx.id === activeContext?.id ? 'active' : ''}" data-id="${ctx.id}">
          <div class="acf-context-item-icon">
            ${getTypeIcon(ctx.type)}
          </div>
          <div class="acf-context-item-info">
            <div class="acf-context-item-name">${escapeHtml(ctx.name)}</div>
            <div class="acf-context-item-type">${ctx.type}</div>
          </div>
        </div>
      `).join('');
      
      // Bind click events
      container.querySelectorAll('.acf-context-item').forEach(item => {
        item.addEventListener('click', () => selectContext(item.dataset.id));
      });
    } catch (error) {
      console.error('Error loading contexts:', error);
    }
  }

  // Select a context
  async function selectContext(contextId) {
    try {
      await chrome.runtime.sendMessage({ type: 'SET_ACTIVE_CONTEXT', contextId });
      await loadActiveContext();
      loadContextList();
      showNotification('Context activated!');
    } catch (error) {
      console.error('Error selecting context:', error);
    }
  }

  // Update active context display
  function updateActiveContextDisplay() {
    const nameEl = document.getElementById('acf-context-name');
    if (activeContext) {
      nameEl.textContent = activeContext.name;
      nameEl.classList.add('has-context');
    } else {
      nameEl.textContent = 'No context selected';
      nameEl.classList.remove('has-context');
    }
  }

  // Get input element for current platform
  function getInputElement() {
    if (!currentPlatform) return null;
    return document.querySelector(currentPlatform.inputSelector);
  }

  // Get current prompt text
  function getCurrentPrompt() {
    const input = getInputElement();
    if (!input) return '';
    
    if (input.tagName === 'TEXTAREA') {
      return input.value;
    } else if (input.contentEditable === 'true') {
      return input.textContent || input.innerText;
    }
    return '';
  }

  // Set prompt text
  function setPromptText(text) {
    const input = getInputElement();
    if (!input) return false;
    
    if (input.tagName === 'TEXTAREA') {
      input.value = text;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    } else if (input.contentEditable === 'true') {
      input.textContent = text;
      input.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Focus the input
    input.focus();
    return true;
  }

  // Optimize current prompt
  async function optimizeCurrentPrompt() {
    const prompt = getCurrentPrompt();
    
    if (!prompt.trim()) {
      showNotification('Please enter a prompt first', 'warning');
      return;
    }
    
    try {
      const response = await chrome.runtime.sendMessage({
        type: 'OPTIMIZE_PROMPT',
        prompt,
        contextId: activeContext?.id
      });
      
      if (response.success) {
        setPromptText(response.optimizedPrompt);
        showNotification('Prompt optimized!');
      }
    } catch (error) {
      console.error('Error optimizing prompt:', error);
      showNotification('Failed to optimize prompt', 'error');
    }
  }

  // Inject context into prompt
  function injectContext() {
    if (!activeContext) {
      showNotification('No context selected', 'warning');
      return;
    }
    
    const currentPrompt = getCurrentPrompt();
    const contextPrefix = `[Context: ${activeContext.name}]\n${activeContext.content}\n\n---\n\n`;
    
    setPromptText(contextPrefix + currentPrompt);
    showNotification('Context injected!');
  }

  // Setup message listener for communication with popup/background
  function setupMessageListener() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      switch (message.type) {
        case 'INJECT_PROMPT':
          setPromptText(message.prompt);
          sendResponse({ success: true });
          break;
          
        case 'CONTEXT_CHANGED':
          activeContext = message.context;
          updateActiveContextDisplay();
          loadContextList();
          break;
          
        case 'TRIGGER_OPTIMIZE':
          optimizeCurrentPrompt();
          break;
          
        case 'CONTEXTS_UPDATED':
          // Contexts were synced from web app, reload the list
          loadActiveContext();
          if (contextPanel.classList.contains('active')) {
            loadContextList();
          }
          showNotification('Contexts synced from app!');
          break;
      }
    });
  }

  // Setup keyboard shortcuts
  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + Shift + O to optimize
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'O') {
        e.preventDefault();
        optimizeCurrentPrompt();
      }
      
      // Ctrl/Cmd + Shift + I to inject context
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        injectContext();
      }
      
      // Escape to close panel
      if (e.key === 'Escape' && contextPanel.classList.contains('active')) {
        toggleContextPanel();
      }
    });
  }

  // Show notification
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `acf-notification acf-notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Utility functions
  function getTypeIcon(type) {
    const icons = {
      general: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>',
      work: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
      coding: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      creative: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg>'
    };
    return icons[type] || icons.general;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Wait for page to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
