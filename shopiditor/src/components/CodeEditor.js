import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

// Language modes
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/clike/clike';

// Add-ons
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/selection/active-line';

const CodeEditor = ({ language = 'javascript', value = '', onChange }) => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);

  // Map language names to CodeMirror modes
  const languageModeMap = {
    javascript: 'javascript',
    csharp: 'text/x-csharp'
  };

  useEffect(() => {
    if (!editorRef.current) return;

    const codeMirror = CodeMirror.fromTextArea(editorRef.current, {
      mode: languageModeMap[language] || 'javascript',
      theme: 'material',
      lineNumbers: true,
      lineWrapping: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      styleActiveLine: true,
      indentUnit: 2,
      tabSize: 2,
    });

    codeMirror.setValue(value);

    codeMirror.on('change', (instance) => {
      const newValue = instance.getValue();
      if (onChange) {
        onChange(newValue);
      }
    });

    setEditor(codeMirror);

    // Cleanup on unmount
    return () => {
      if (codeMirror) {
        codeMirror.toTextArea();
      }
    };
  }, []);

  // Update editor mode when language changes
  useEffect(() => {
    if (editor) {
      editor.setOption('mode', languageModeMap[language] || 'javascript');
    }
  }, [language, editor]);

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getValue()) {
      const cursorPosition = editor.getCursor();
      editor.setValue(value);
      editor.setCursor(cursorPosition);
    }
  }, [value, editor]);

  return (
    <div className="w-full h-full border rounded">
      <textarea ref={editorRef} defaultValue={value} />
    </div>
  );
};

export default CodeEditor; 