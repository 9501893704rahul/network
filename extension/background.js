// AI Context Flow - Background Service Worker

// Initialize extension on install
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Set default data
    chrome.storage.local.set({
      contexts: [],
      history: [],
      activeContextId: null,
      settings: {
        autoInject: false,
        showFloatingButton: true,
        keyboardShortcut: 'Ctrl+Shift+O'
      }
    });
    
    console.log('AI Context Flow installed successfully!');
  }
});

// Listen for messages from popup and content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'GET_ACTIVE_CONTEXT':
      getActiveContext().then(sendResponse);
      return true;
      
    case 'GET_ALL_CONTEXTS':
      getAllContexts().then(sendResponse);
      return true;
      
    case 'SAVE_CONTEXT':
      saveContext(message.context).then(sendResponse);
      return true;
      
    case 'DELETE_CONTEXT':
      deleteContext(message.contextId).then(sendResponse);
      return true;
      
    case 'SET_ACTIVE_CONTEXT':
      setActiveContext(message.contextId).then(sendResponse);
      return true;
      
    case 'ADD_TO_HISTORY':
      addToHistory(message.item).then(sendResponse);
      return true;
      
    case 'GET_HISTORY':
      getHistory().then(sendResponse);
      return true;
      
    case 'OPTIMIZE_PROMPT':
      optimizePrompt(message.prompt, message.contextId).then(sendResponse);
      return true;
      
    case 'HIGHLIGHT_SAVED':
      handleHighlightSaved(message.text, sender.tab).then(sendResponse);
      return true;
  }
});

// Context Management Functions
async function getActiveContext() {
  const result = await chrome.storage.local.get(['contexts', 'activeContextId']);
  const contexts = result.contexts || [];
  const activeId = result.activeContextId;
  
  if (activeId) {
    return contexts.find(c => c.id === activeId) || null;
  }
  return null;
}

async function getAllContexts() {
  const result = await chrome.storage.local.get(['contexts']);
  return result.contexts || [];
}

async function saveContext(context) {
  const result = await chrome.storage.local.get(['contexts']);
  let contexts = result.contexts || [];
  
  const existingIndex = contexts.findIndex(c => c.id === context.id);
  
  if (existingIndex !== -1) {
    contexts[existingIndex] = {
      ...contexts[existingIndex],
      ...context,
      updatedAt: Date.now()
    };
  } else {
    contexts.unshift({
      ...context,
      id: context.id || generateId(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
  }
  
  await chrome.storage.local.set({ contexts });
  return { success: true, contexts };
}

async function deleteContext(contextId) {
  const result = await chrome.storage.local.get(['contexts', 'activeContextId']);
  let contexts = result.contexts || [];
  let activeContextId = result.activeContextId;
  
  contexts = contexts.filter(c => c.id !== contextId);
  
  if (activeContextId === contextId) {
    activeContextId = null;
  }
  
  await chrome.storage.local.set({ contexts, activeContextId });
  return { success: true };
}

async function setActiveContext(contextId) {
  await chrome.storage.local.set({ activeContextId: contextId });
  
  // Notify all tabs about context change
  const tabs = await chrome.tabs.query({});
  const context = contextId ? await getContextById(contextId) : null;
  
  for (const tab of tabs) {
    try {
      await chrome.tabs.sendMessage(tab.id, {
        type: 'CONTEXT_CHANGED',
        context
      });
    } catch (e) {
      // Tab might not have content script
    }
  }
  
  return { success: true };
}

async function getContextById(contextId) {
  const result = await chrome.storage.local.get(['contexts']);
  const contexts = result.contexts || [];
  return contexts.find(c => c.id === contextId) || null;
}

// History Management
async function addToHistory(item) {
  const result = await chrome.storage.local.get(['history']);
  let history = result.history || [];
  
  history.unshift({
    id: generateId(),
    ...item,
    timestamp: Date.now()
  });
  
  // Keep only last 100 items
  if (history.length > 100) {
    history = history.slice(0, 100);
  }
  
  await chrome.storage.local.set({ history });
  return { success: true };
}

async function getHistory() {
  const result = await chrome.storage.local.get(['history']);
  return result.history || [];
}

// Prompt Optimization
async function optimizePrompt(prompt, contextId) {
  let context = null;
  
  if (contextId) {
    context = await getContextById(contextId);
  } else {
    context = await getActiveContext();
  }
  
  let optimizedPrompt = prompt;
  
  if (context) {
    optimizedPrompt = buildOptimizedPrompt(prompt, context);
  } else {
    optimizedPrompt = enhancePrompt(prompt);
  }
  
  // Add to history
  await addToHistory({
    type: 'optimize',
    originalPrompt: prompt,
    optimizedPrompt,
    contextName: context?.name || null
  });
  
  return {
    success: true,
    optimizedPrompt,
    contextUsed: context?.name || null
  };
}

function buildOptimizedPrompt(prompt, context) {
  return `[Context: ${context.name}]
${context.content}

---

[User Request]
${prompt}

---

Please respond considering the context provided above. Maintain consistency with any preferences, guidelines, or information specified in the context.`;
}

function enhancePrompt(prompt) {
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

// Handle highlighted text saved from content script
async function handleHighlightSaved(text, tab) {
  const context = await getActiveContext();
  
  if (context) {
    // Append to existing context
    const result = await chrome.storage.local.get(['contexts']);
    const contexts = result.contexts || [];
    const index = contexts.findIndex(c => c.id === context.id);
    
    if (index !== -1) {
      contexts[index].content += `\n\n[Highlighted from ${tab?.url || 'webpage'}]\n${text}`;
      contexts[index].updatedAt = Date.now();
      await chrome.storage.local.set({ contexts });
    }
  }
  
  return { success: true };
}

// Utility Functions
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Context menu for saving highlighted text
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'saveToContext',
    title: 'Save to AI Context Flow',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'saveToContext' && info.selectionText) {
    await handleHighlightSaved(info.selectionText, tab);
    
    // Show notification
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: 'AI Context Flow',
      message: 'Text saved to active context!'
    });
  }
});

// Keyboard shortcut handling
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'optimize-prompt') {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab) {
      chrome.tabs.sendMessage(tab.id, { type: 'TRIGGER_OPTIMIZE' });
    }
  }
});
