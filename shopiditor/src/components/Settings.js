import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

function Settings() {
  return (
    <div className="container mx-auto p-4 bg-light-bg min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-dark-bg">Settings</h1>
        <Link to={ROUTES.HOME} className="text-primary-color hover:underline">
          &larr; Back to Home
        </Link>
      </header>
      
      <div className="card max-w-2xl mx-auto">
        <div className="card-header">
          <h2 className="text-xl font-semibold">Editor Preferences</h2>
        </div>
        
        <div className="card-body">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Theme</h3>
            <div className="flex items-center space-x-4">
              <button className="btn btn-primary">Light</button>
              <button className="btn btn-secondary">Dark</button>
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
            <button className="btn btn-success">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings; 