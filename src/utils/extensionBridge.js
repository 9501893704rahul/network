// Extension Bridge - Communication between React App and Chrome Extension

// The extension ID will be set dynamically or can be configured
// For development, you'll need to get this from chrome://extensions after loading the extension
let EXTENSION_ID = null;

// Try to detect extension ID from localStorage or use a known ID
const getExtensionId = () => {
  if (EXTENSION_ID) return EXTENSION_ID;
  
  // Check if stored in localStorage
  const storedId = localStorage.getItem('ai_context_flow_extension_id');
  if (storedId) {
    EXTENSION_ID = storedId;
    return EXTENSION_ID;
  }
  
  return null;
};

// Set the extension ID (called when user inputs it or it's detected)
export const setExtensionId = (id) => {
  EXTENSION_ID = id;
  localStorage.setItem('ai_context_flow_extension_id', id);
};

// Check if the extension is installed and get its ID
export const checkExtensionInstalled = async (extensionId) => {
  if (!extensionId && !getExtensionId()) {
    return { installed: false, error: 'No extension ID provided' };
  }
  
  const id = extensionId || getExtensionId();
  
  // Check if chrome.runtime is available
  if (typeof chrome === 'undefined') {
    return { installed: false, error: 'Chrome API not available. Please use Chrome browser.' };
  }
  
  if (!chrome.runtime || !chrome.runtime.sendMessage) {
    return { installed: false, error: 'Chrome runtime API not available. Make sure you are using Chrome.' };
  }
  
  console.log('Attempting to connect to extension:', id);
  
  try {
    return new Promise((resolve) => {
      // Set a timeout in case extension doesn't respond
      const timeout = setTimeout(() => {
        console.log('Extension connection timed out');
        resolve({ installed: false, error: 'Extension not responding. Make sure the extension is installed and enabled, then reload this page.' });
      }, 3000);
      
      try {
        chrome.runtime.sendMessage(id, { type: 'PING' }, (response) => {
          clearTimeout(timeout);
          console.log('Extension response:', response, 'Error:', chrome.runtime.lastError);
          
          if (chrome.runtime.lastError) {
            const errorMsg = chrome.runtime.lastError.message;
            console.error('Chrome runtime error:', errorMsg);
            
            // Provide more helpful error messages
            if (errorMsg.includes('Could not establish connection')) {
              resolve({ installed: false, error: 'Could not connect to extension. Please make sure:\n1. The extension is installed\n2. The extension ID is correct\n3. Reload the extension in chrome://extensions' });
            } else if (errorMsg.includes('Invalid extension id')) {
              resolve({ installed: false, error: 'Invalid extension ID format. Please check the ID.' });
            } else {
              resolve({ installed: false, error: errorMsg });
            }
          } else if (response && response.success) {
            console.log('Successfully connected to extension v' + response.version);
            setExtensionId(id);
            resolve({ installed: true, version: response.version });
          } else {
            resolve({ installed: false, error: 'Extension responded but with invalid data' });
          }
        });
      } catch (sendError) {
        clearTimeout(timeout);
        console.error('Error sending message:', sendError);
        resolve({ installed: false, error: 'Failed to send message: ' + sendError.message });
      }
    });
  } catch (error) {
    console.error('Connection error:', error);
    return { installed: false, error: error.message };
  }
};

// Send message to extension
const sendToExtension = (message) => {
  return new Promise((resolve, reject) => {
    const extensionId = getExtensionId();
    
    if (!extensionId) {
      reject(new Error('Extension ID not set. Please connect to the extension first.'));
      return;
    }
    
    if (typeof chrome === 'undefined' || !chrome.runtime) {
      reject(new Error('Chrome runtime not available. Are you using Chrome?'));
      return;
    }
    
    const timeout = setTimeout(() => {
      reject(new Error('Extension not responding. Please check if it is installed and enabled.'));
    }, 5000);
    
    try {
      chrome.runtime.sendMessage(extensionId, message, (response) => {
        clearTimeout(timeout);
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(response);
        }
      });
    } catch (error) {
      clearTimeout(timeout);
      reject(error);
    }
  });
};

// Sync contexts to extension
export const syncContextsToExtension = async (contexts) => {
  try {
    const response = await sendToExtension({
      type: 'SYNC_CONTEXTS',
      contexts
    });
    return response;
  } catch (error) {
    console.error('Failed to sync contexts:', error);
    throw error;
  }
};

// Get all contexts from extension
export const getContextsFromExtension = async () => {
  try {
    const response = await sendToExtension({ type: 'GET_ALL_CONTEXTS' });
    return response || [];
  } catch (error) {
    console.error('Failed to get contexts:', error);
    throw error;
  }
};

// Save a single context to extension
export const saveContextToExtension = async (context) => {
  try {
    const response = await sendToExtension({
      type: 'SAVE_CONTEXT',
      context
    });
    return response;
  } catch (error) {
    console.error('Failed to save context:', error);
    throw error;
  }
};

// Delete a context from extension
export const deleteContextFromExtension = async (contextId) => {
  try {
    const response = await sendToExtension({
      type: 'DELETE_CONTEXT',
      contextId
    });
    return response;
  } catch (error) {
    console.error('Failed to delete context:', error);
    throw error;
  }
};

// Set active context in extension
export const setActiveContextInExtension = async (contextId) => {
  try {
    const response = await sendToExtension({
      type: 'SET_ACTIVE_CONTEXT',
      contextId
    });
    return response;
  } catch (error) {
    console.error('Failed to set active context:', error);
    throw error;
  }
};

// Get active context from extension
export const getActiveContextFromExtension = async () => {
  try {
    const response = await sendToExtension({ type: 'GET_ACTIVE_CONTEXT' });
    return response;
  } catch (error) {
    console.error('Failed to get active context:', error);
    throw error;
  }
};

// Check if running in Chrome
export const isChrome = () => {
  return typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage;
};

// Get stored extension ID
export const getStoredExtensionId = () => {
  return localStorage.getItem('ai_context_flow_extension_id');
};

// Clear stored extension ID
export const clearExtensionId = () => {
  EXTENSION_ID = null;
  localStorage.removeItem('ai_context_flow_extension_id');
};
