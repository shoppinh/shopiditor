import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to Shopiditor</h1>
      <p className="text-xl mb-8">A web-based code editor and execution environment</p>
      <div className="flex gap-4">
        <Link 
          to={ROUTES.EDITOR} 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Open Editor
        </Link>
        <Link 
          to={ROUTES.SETTINGS} 
          className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Settings
        </Link>
      </div>
    </div>
  );
}

export default Home; 