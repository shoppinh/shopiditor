import axios from 'axios';
import { isOnline, formatErrorMessage, simulateCodeExecution, retryWithBackoff } from '../utils/errorHandling';

// Base URL for the API - use environment variable if available, fallback to localhost
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

/**
 * Execute code and get the result
 * @param {string} code - The code to execute
 * @param {string} language - The programming language
 * @param {number} timeout - Optional timeout in milliseconds
 * @param {boolean} retry - Whether to retry on failure
 * @returns {Promise} - The execution result
 */
export const executeCode = async (code, language, timeout = 5000, retry = true) => {
  // Check if we're online
  if (!isOnline()) {
    console.log('Offline mode: simulating code execution');
    return simulateCodeExecution(code, language);
  }
  
  try {
    // If retry is enabled, use retryWithBackoff
    const executeRequest = async () => {
      const response = await apiClient.post('/CodeExecution/execute', {
        code,
        language,
        timeout,
        arguments: [],
      });
      return response.data;
    };
    
    return retry 
      ? await retryWithBackoff(executeRequest)
      : await executeRequest();
  } catch (error) {
    console.error('Error executing code:', error);
    return {
      status: 'Error',
      error: formatErrorMessage(error),
      output: '',
      executionTime: 0,
    };
  }
};

/**
 * Get a cached execution result by ID
 * @param {string} executionId - The execution ID
 * @returns {Promise} - The execution result
 */
export const getExecutionResult = async (executionId) => {
  if (!isOnline()) {
    console.log('Offline mode: cannot retrieve cached execution results');
    return null;
  }
  
  try {
    const response = await apiClient.get(`/CodeExecution/result/${executionId}`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving execution result:', error);
    return null;
  }
};

/**
 * Get the list of supported languages
 * @returns {Promise<string[]>} - Array of supported languages
 */
export const getSupportedLanguages = async () => {
  if (!isOnline()) {
    console.log('Offline mode: returning default languages');
    return ['javascript', 'csharp']; // Fallback to default languages
  }
  
  try {
    const response = await apiClient.get('/CodeExecution/languages');
    return response.data;
  } catch (error) {
    console.error('Error getting supported languages:', error);
    return ['javascript', 'csharp']; // Fallback to default languages
  }
};

/**
 * Check if the API is available
 * @returns {Promise<boolean>} - True if API is available, false otherwise
 */
export const checkApiAvailability = async () => {
  if (!isOnline()) {
    return false;
  }
  
  try {
    // Try a simple request to check if the API is responsive
    await apiClient.get('/CodeExecution/languages');
    return true;
  } catch (error) {
    console.warn('API not available:', error);
    return false;
  }
};

export default {
  executeCode,
  getExecutionResult,
  getSupportedLanguages,
  checkApiAvailability,
}; 