import React, { useState, useEffect } from 'react';
import CodeEditor from './CodeEditor';
import LanguageSelector from './LanguageSelector';
import ExecutionStatus from './ExecutionStatus';
import { LANGUAGES, DEFAULT_CODE } from '../constants/languages';
import { executeCode, getSupportedLanguages, checkApiAvailability } from '../services/api';
import { isOnline } from '../utils/errorHandling';

function EditorPage() {
  const [language, setLanguage] = useState(LANGUAGES.JAVASCRIPT);
  const [code, setCode] = useState(DEFAULT_CODE[LANGUAGES.JAVASCRIPT]);
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState(null);
  const [executionTime, setExecutionTime] = useState(null);
  const [apiAvailable, setApiAvailable] = useState(null);
  const [executionStatus, setExecutionStatus] = useState(null);
  const [networkStatus, setNetworkStatus] = useState(isOnline());
  const [retryCount, setRetryCount] = useState(0);

  // Check if API is available on component mount
  useEffect(() => {
    const checkApi = async () => {
      const isAvailable = await checkApiAvailability();
      setApiAvailable(isAvailable);
    };
    checkApi();
  }, []);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setNetworkStatus(true);
      // Check API availability when we come back online
      checkApiAvailability().then(isAvailable => setApiAvailable(isAvailable));
    };
    
    const handleOffline = () => {
      setNetworkStatus(false);
      setApiAvailable(false);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(DEFAULT_CODE[newLanguage]);
    setOutput('');
    setError(null);
    setExecutionTime(null);
    setExecutionStatus(null);
    setRetryCount(0);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleRunCode = async (shouldRetry = true) => {
    setIsExecuting(true);
    setOutput('');
    setError(null);
    setExecutionTime(null);
    setExecutionStatus(null);
    setRetryCount(0);

    try {
      // Execute code with retry option
      const result = await executeCode(code, language, 5000, shouldRetry);
      
      setExecutionStatus(result.status);
      
      if (result.status === 'Error') {
        setError(result.error);
        setOutput(result.output || '');
      } else {
        setOutput(result.output || 'Execution completed successfully with no output.');
      }
      
      setExecutionTime(result.executionTime);
    } catch (err) {
      setError(`Failed to execute code: ${err.message}`);
      setExecutionStatus('Error');
    } finally {
      setIsExecuting(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    handleRunCode(true);
  };

  return (
    <div className="flex flex-col h-screen bg-light-bg">
      <header className="bg-dark-bg text-text-light p-4 shadow-md">
        <h1 className="text-xl font-semibold">Shopiditor - Code Editor</h1>
        <div className="mt-1 flex items-center text-sm">
          {!networkStatus && (
            <p className="text-red-400 mr-4">
              ⚠️ You are offline
            </p>
          )}
          {networkStatus && apiAvailable === false && (
            <p className="text-yellow-400 mr-4">
              ⚠️ Backend API not available. Running in offline mode.
            </p>
          )}
          {networkStatus && apiAvailable === true && (
            <p className="text-green-400 mr-4">
              ✓ Connected to backend
            </p>
          )}
        </div>
      </header>
      <main className="flex-1 flex flex-col md:flex-row p-4 gap-4">
        <div className="card flex-1 min-h-[300px] md:min-h-0 flex flex-col">
          <div className="card-header flex justify-between items-center">
            <LanguageSelector 
              selectedLanguage={language} 
              onLanguageChange={handleLanguageChange} 
            />
            <div className="flex gap-2">
              {error && retryCount < 3 && (
                <button
                  className="btn btn-warning"
                  onClick={handleRetry}
                  disabled={isExecuting}
                >
                  Retry
                </button>
              )}
              <button
                className={`btn ${isExecuting ? 'btn-disabled' : 'btn-success'}`}
                onClick={() => handleRunCode(true)}
                disabled={isExecuting}
              >
                {isExecuting ? 'Running...' : 'Run Code'}
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <CodeEditor 
              language={language} 
              value={code} 
              onChange={handleCodeChange} 
            />
          </div>
        </div>
        
        <div className="card flex-1 min-h-[200px] md:min-h-0 flex flex-col">
          <div className="card-header flex justify-between items-center">
            <p className="font-medium">Output</p>
            <ExecutionStatus 
              status={executionStatus} 
              executionTime={executionTime} 
              isExecuting={isExecuting} 
            />
          </div>
          <div className="bg-dark-bg text-text-light p-4 h-full font-mono text-sm overflow-auto whitespace-pre-wrap">
            {isExecuting ? (
              <div className="flex items-center justify-center h-full">
                <p>Executing code, please wait...</p>
              </div>
            ) : error ? (
              <div className="text-red-400">
                <p className="font-bold mb-2">Error:</p>
                <pre>{error}</pre>
                {output && (
                  <>
                    <p className="font-bold mt-4 mb-2">Output:</p>
                    <pre>{output}</pre>
                  </>
                )}
              </div>
            ) : (
              output || "Code execution output will appear here"
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default EditorPage; 