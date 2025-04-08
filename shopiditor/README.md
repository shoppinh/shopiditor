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

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shopiditor.git
   cd shopiditor
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build for Production

To build the app for production:

```bash
npm run build
```

This will create a `build` folder with optimized production files.

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
