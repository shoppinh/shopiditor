# Shopiditor - Web-based Code Editor

A web-based code editor and execution environment that supports multiple programming languages including JavaScript and C#.

## Project Overview

Shopiditor is a web application that allows users to write, edit, and execute code in various programming languages directly in the browser. The application is structured as:

- **Frontend**: React-based UI with CodeMirror for code editing
- **Backend**: ASP.NET Core API for code execution

## Project Structure

The project is organized into two main components:

- **`/shopiditor/`** - Frontend React application
- **`/Shopiditor.Api/`** - Backend ASP.NET Core API

## Features

- Modern code editor with syntax highlighting
- Support for JavaScript and C# languages
- Real-time code execution
- Error handling and display
- Offline fallback mode
- Responsive design

## Development Setup

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- .NET 7.0 SDK or later

### Running the Application

1. **Clone the repository**

```bash
git clone <repository-url>
cd shopiditor
```

2. **Start the Backend API**

```bash
cd Shopiditor.Api
dotnet run
```

The API will be available at http://localhost:5000.

3. **Start the Frontend (in a new terminal)**

```bash
cd shopiditor
npm install
npm start
```

The frontend will be available at http://localhost:3000.

## API Endpoints

The backend API provides the following endpoints:

- **POST /api/CodeExecution/execute** - Execute code in the specified language
- **GET /api/CodeExecution/result/{executionId}** - Get a cached execution result
- **GET /api/CodeExecution/languages** - Get a list of supported languages

## Security Notice

This application is currently in Phase 1 (MVP) and uses direct code execution, which is **NOT SECURE** for production use. The code execution is done:

- JavaScript: Using Node.js process execution
- C#: Using Roslyn for dynamic compilation and execution

Phase 3 will implement proper Docker-based sandboxing for secure code execution.

## Future Enhancements

- Additional language support (Python, etc.)
- User accounts and saved snippets
- Collaborative editing
- Docker-based secure execution environment
- Advanced editor features (debugging, breakpoints)

## License

This project is licensed under the MIT License. 