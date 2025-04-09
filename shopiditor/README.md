# Shopiditor

A web-based code editor and execution environment where users can write, select the language for, and execute code snippets in multiple programming languages, viewing the output directly in the browser.

## Features

- **Code Editor**: Write and edit code with syntax highlighting
- **Multiple Languages**: Currently supports JavaScript and C#
- **Execution Environment**: Run your code and see the output in real-time
- **Responsive Design**: Works well on both desktop and mobile devices

## Tech Stack

- **Frontend**:
  - React
  - CodeMirror for code editing
  - React Router for navigation
  - Tailwind CSS for styling
  
- **Future Backend** (in development):
  - ASP.NET Core for API
  - Docker for secure code execution

## Development Environment Setup

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- .NET 7.0 SDK or later

### Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd shopiditor
```

2. **Install Frontend Dependencies**

```bash
cd shopiditor
npm install
```

3. **Start the Development Environment**

To run both the frontend and backend together, use:

```bash
npm run start:dev
```

This will start:
- The React development server at http://localhost:3000
- The ASP.NET Core backend API at http://localhost:5000

Alternatively, you can run them separately:

```bash
# Start just the frontend
npm run start:frontend

# Start just the backend
npm run start:backend
```

4. **Build for Production**

```bash
npm run build:prod
```

This will create a production-ready build in the `build` folder.

### Environment Configuration

The application uses environment-specific configuration files:

- `.env.development` - Used during development
- `.env.production` - Used for production builds

### API Integration

The frontend communicates with the backend API for code execution. During development:

- API calls are proxied from the React dev server to the backend
- If the backend is not available, the app will run in offline mode with simulated code execution
- Check the status indicator in the header to see if the backend is connected

### Troubleshooting

**API Connection Issues**

If you see "Backend API not available" in the header:
1. Check that the backend is running on port 5000
2. Verify that the proxy is configured correctly in `package.json`
3. Check browser console for CORS errors

**Development Script Issues**

If the `start:dev` script doesn't work correctly on your platform, try running the frontend and backend in separate terminals.

### Security Note

The current code execution is only suitable for development and uses an *unsafe* direct execution model. Do not deploy this to production without implementing the Docker-based sandboxing planned for Phase 3.

## Project Structure

```
shopiditor/
├── public/               # Public assets
├── src/                  # Source code
│   ├── components/       # React components
│   ├── constants/        # Constants and configuration
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services
│   ├── styles/           # CSS/Styling files
│   ├── utils/            # Utility functions
│   ├── App.js            # Main application component
│   ├── index.js          # Application entry point
│   └── ...
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## Development Workflow

1. **Code Editor Component**: The main editor is implemented using CodeMirror.
2. **Language Support**: Language modes are loaded from CodeMirror's modules.
3. **UI Components**: Most UI components use Tailwind CSS utility classes and custom components.
4. **Execution**: Currently implements a placeholder function that will be replaced with actual backend API calls.

## Future Enhancements

- Backend integration for code execution
- User accounts and saved snippets
- More programming languages
- Advanced editor features (themes, keybindings, etc.)
- Real-time collaboration

## Security Considerations

- Code execution will be securely sandboxed using Docker containers (in development)
- Resource limits for CPU, memory, and execution time will be implemented
- Full security audit before public deployment

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Project created as part of the Shopiditor development initiative.*
