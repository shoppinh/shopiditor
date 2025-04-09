/**
 * Error handling and offline fallback utilities
 */

/**
 * Check if the network is online
 * @returns {boolean} - True if online, false otherwise
 */
export const isOnline = () => {
  return navigator.onLine;
};

/**
 * Format API error messages into user-friendly messages
 * @param {Error} error - The error object
 * @returns {string} - User-friendly error message
 */
export const formatErrorMessage = (error) => {
  if (!error) return 'An unknown error occurred';

  // Handle network connectivity errors
  if (!isOnline()) {
    return 'You are currently offline. Please check your internet connection and try again.';
  }

  // Handle axios specific errors
  if (error.response) {
    // The server responded with a status code outside the 2xx range
    const status = error.response.status;
    const errorData = error.response.data;

    // Handle specific HTTP status codes
    switch (status) {
      case 400:
        return `Bad request: ${errorData.error || 'Invalid input or request'}`;
      case 401:
        return 'Authentication required. Please log in and try again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource or service was not found.';
      case 500:
        return 'A server error occurred. Our team has been notified.';
      case 503:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return `Server error (${status}): ${errorData.error || error.message}`;
    }
  } else if (error.request) {
    // The request was made but no response was received
    return 'No response from server. Please check your connection and try again.';
  } else {
    // Something happened in setting up the request
    return `Error: ${error.message || 'An unexpected error occurred'}`;
  }
};

/**
 * Creates a simulated execution result for offline mode
 * @param {string} code - The code that would be executed
 * @param {string} language - The language of the code
 * @returns {Object} - Simulated execution result
 */
export const simulateCodeExecution = (code, language) => {
  // Create a delay between 200-600ms to simulate processing
  const executionTime = Math.floor(Math.random() * 400) + 200;
  
  // Basic simulation based on language
  let output = '';
  let status = 'Success';
  let error = null;
  
  if (language === 'javascript') {
    if (code.includes('console.log')) {
      // Extract the content inside console.log parentheses
      const matches = code.match(/console\.log\((.*?)\)/g);
      if (matches) {
        output = matches.map(match => {
          // Strip the console.log() part and evaluate what's inside
          const content = match.substring(12, match.length - 1);
          // Simple simulation - just return the content
          return content.startsWith('"') && content.endsWith('"') ? 
            content.substring(1, content.length - 1) : content;
        }).join('\n');
      }
    }
  } else if (language === 'csharp') {
    if (code.includes('Console.WriteLine')) {
      // Extract the content inside Console.WriteLine parentheses
      const matches = code.match(/Console\.WriteLine\((.*?)\)/g);
      if (matches) {
        output = matches.map(match => {
          // Strip the Console.WriteLine() part and evaluate what's inside
          const content = match.substring(18, match.length - 1);
          // Simple simulation - just return the content
          return content.startsWith('"') && content.endsWith('"') ? 
            content.substring(1, content.length - 1) : content;
        }).join('\n');
      }
    }
  }
  
  // Add a disclaimer about offline mode
  output = `[OFFLINE MODE - SIMULATED OUTPUT]\n${output}\n\nNote: This is a simulated response. Connect to the backend for actual execution.`;
  
  return {
    output,
    status,
    error,
    executionTime,
    executionId: `offline-${Date.now()}`,
  };
};

/**
 * Retry a function with exponential backoff
 * @param {Function} fn - The function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise} - The result of the function
 */
export const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 300) => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      console.log(`Attempt ${i + 1} failed, retrying...`);
      lastError = error;
      
      // Exponential backoff
      const delay = baseDelay * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}; 