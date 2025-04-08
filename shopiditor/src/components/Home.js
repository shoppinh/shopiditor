import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-light-bg">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-dark-bg">Shopiditor</h1>
        <p className="text-xl mb-8 text-text-dark">A web-based code editor and execution environment</p>
      </div>
      
      <div className="card max-w-lg w-full p-6 text-center">
        <h2 className="text-2xl font-semibold mb-6">Getting Started</h2>
        <p className="mb-8 text-text-dark">
          Write, edit, and run code in JavaScript and C# directly in your browser.
          No installation required!
        </p>
        
        <div className="flex gap-4 justify-center">
          <Link 
            to={ROUTES.EDITOR} 
            className="btn btn-primary"
          >
            Open Editor
          </Link>
          <Link 
            to={ROUTES.SETTINGS} 
            className="btn btn-secondary"
          >
            Settings
          </Link>
        </div>
      </div>
      
      <div className="mt-12 text-sm text-gray-500">
        <p>Version 0.1.0 | Open Source Project</p>
      </div>
    </div>
  );
}

export default Home; 