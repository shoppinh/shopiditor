/**
 * Supported programming languages
 */
export const LANGUAGES = {
  JAVASCRIPT: 'javascript',
  CSHARP: 'csharp'
};

/**
 * Language display names
 */
export const LANGUAGE_NAMES = {
  [LANGUAGES.JAVASCRIPT]: 'JavaScript',
  [LANGUAGES.CSHARP]: 'C#'
};

/**
 * Default code examples for each language
 */
export const DEFAULT_CODE = {
  [LANGUAGES.JAVASCRIPT]: `// JavaScript Example
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World"));`,

  [LANGUAGES.CSHARP]: `// C# Example
using System;

class Program {
  static void Main() {
    Console.WriteLine("Hello, World!");
  }
}`
}; 