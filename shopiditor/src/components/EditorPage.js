import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import LanguageSelector from './LanguageSelector';
import { LANGUAGES, DEFAULT_CODE } from '../constants/languages';

function EditorPage() {
  const [language, setLanguage] = useState(LANGUAGES.JAVASCRIPT);
  const [code, setCode] = useState(DEFAULT_CODE[LANGUAGES.JAVASCRIPT]);
  const [output, setOutput] = useState('');

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(DEFAULT_CODE[newLanguage]);
    setOutput('');
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleRunCode = () => {
    // This is a placeholder for future backend integration
    setOutput(`[Execution output will appear here once backend is connected]
    
For now, we're displaying this placeholder message.

Selected language: ${language}
Code length: ${code.length} characters`);
  };

  return (
    <div className="flex flex-col h-screen bg-light-bg">
      <header className="bg-dark-bg text-text-light p-4 shadow-md">
        <h1 className="text-xl font-semibold">Shopiditor - Code Editor</h1>
      </header>
      <main className="flex-1 flex flex-col md:flex-row p-4 gap-4">
        <div className="card flex-1 min-h-[300px] md:min-h-0 flex flex-col">
          <div className="card-header flex justify-between items-center">
            <LanguageSelector 
              selectedLanguage={language} 
              onLanguageChange={handleLanguageChange} 
            />
            <button
              className="btn btn-success"
              onClick={handleRunCode}
            >
              Run Code
            </button>
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
          <div className="card-header">
            <p className="font-medium">Output</p>
          </div>
          <div className="bg-dark-bg text-text-light p-4 h-full font-mono text-sm overflow-auto whitespace-pre-wrap">
            {output || "Code execution output will appear here"}
          </div>
        </div>
      </main>
    </div>
  );
}

export default EditorPage; 