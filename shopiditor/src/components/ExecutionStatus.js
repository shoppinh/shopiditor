import React from 'react';

/**
 * ExecutionStatus component displays the current status of code execution
 * and relevant statistics like execution time
 */
function ExecutionStatus({ status, executionTime, isExecuting }) {
  // Helper to determine the status color
  const getStatusColor = () => {
    if (isExecuting) return 'text-yellow-500';
    switch (status) {
      case 'Success':
        return 'text-green-500';
      case 'Error':
        return 'text-red-500';
      case 'Timeout':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };

  // Helper to determine the status icon
  const getStatusIcon = () => {
    if (isExecuting) return '⏳';
    switch (status) {
      case 'Success':
        return '✅';
      case 'Error':
        return '❌';
      case 'Timeout':
        return '⏰';
      default:
        return '⚪';
    }
  };

  // Helper to determine the status text
  const getStatusText = () => {
    if (isExecuting) return 'Executing...';
    switch (status) {
      case 'Success':
        return 'Execution successful';
      case 'Error':
        return 'Execution failed';
      case 'Timeout':
        return 'Execution timed out';
      default:
        return 'Ready';
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <span className={`${getStatusColor()} font-bold flex items-center`}>
        <span className="mr-1">{getStatusIcon()}</span>
        <span>{getStatusText()}</span>
      </span>
      
      {executionTime !== null && !isExecuting && (
        <span className="text-sm text-gray-500">
          Completed in {executionTime}ms
        </span>
      )}
      
      {isExecuting && (
        <div className="loading-spinner h-4 w-4 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      )}
    </div>
  );
}

export default ExecutionStatus; 