import React from 'react';

function EditorPage() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-semibold">Shopiditor - Code Editor</h1>
      </header>
      <main className="flex-1 flex flex-col md:flex-row p-4 gap-4">
        <div className="flex-1 border rounded-lg h-full min-h-[300px] md:min-h-0">
          <div className="p-2 bg-gray-100 border-b">
            {/* Language selector will go here */}
            <p>Code Editor Component (Coming Soon)</p>
          </div>
          <div className="p-4 h-full">
            {/* CodeMirror will be integrated here */}
            <p>Code will go here</p>
          </div>
        </div>
        
        <div className="flex-1 border rounded-lg h-full min-h-[200px] md:min-h-0">
          <div className="p-2 bg-gray-100 border-b">
            <p>Output</p>
          </div>
          <div className="p-4 h-full">
            <p>Code execution output will appear here</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EditorPage; 