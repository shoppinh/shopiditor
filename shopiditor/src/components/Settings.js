import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

function Settings() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <Link to={ROUTES.HOME} className="text-blue-600 hover:underline">
          &larr; Back to Home
        </Link>
      </header>
      
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Editor Preferences</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Theme</h3>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Light</button>
            <button className="px-4 py-2 bg-gray-200 rounded">Dark</button>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Font Size</h3>
          <select className="w-full max-w-xs p-2 border rounded">
            <option>Small (12px)</option>
            <option selected>Medium (14px)</option>
            <option>Large (16px)</option>
            <option>Extra Large (18px)</option>
          </select>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Tab Size</h3>
          <select className="w-full max-w-xs p-2 border rounded">
            <option>2 spaces</option>
            <option selected>4 spaces</option>
            <option>8 spaces</option>
          </select>
        </div>
        
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings; 