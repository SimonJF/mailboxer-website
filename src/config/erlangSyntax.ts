import { loader } from '@monaco-editor/react';
import hljs from 'highlight.js/lib/core';
import erlang from 'highlight.js/lib/languages/erlang';
import 'highlight.js/styles/github.css';
import type * as monacoEditor from 'monaco-editor';

// Register Highlight.js Erlang language
hljs.registerLanguage('erlang', erlang);

// Configure Monaco Editor with Erlang language support
export const initErlangSyntax = () => {
  loader.init().then((monacoInstance) => {
    const monaco = monacoInstance;
    // Register Erlang language
    monaco.languages.register({ id: 'erlang' });

    // Define Erlang syntax highlighting rules
    const erlangLanguage = {
      tokenizer: {
        root: [
          // Keywords and built-in functions
          [/\b(module|export|import|behaviour|record|macro|include|define|when|if|case|receive|after|of|end|fun|try|catch|throw|begin|let|in|spawn|self|send|apply|call|whereis|register|unregister|exit|link|unlink|monitor|demonitor|andalso|orelse)\b/, 'keyword', ''],
          
          // Type declarations and specs
          [/-type\s+/, 'keyword', ''],
          [/-spec\s+/, 'keyword', ''],
          [/-new\s*\(/, 'keyword', ''],
          [/-use\s*\(/, 'keyword', ''],
          
          // Macros
          [/\?[A-Z][A-Za-z0-9_]*|\?[a-z][A-Za-z0-9_]*/, 'macro', ''],
          
          // Variables
          [/[A-Z_][A-Za-z0-9_]*/, 'variable', ''],
          
          // Function names and atoms
          [/[a-z][a-zA-Z0-9_]*(?=\()/, 'function', ''],
          [/[a-z][a-zA-Z0-9_]*/, 'identifier', ''],
          
          // Numbers
          [/[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?/, 'number', ''],
          
          // Strings
          [/'[^']*'/, 'string', ''],
          [/"[^"]*"/, 'string', ''],
          
          // Comments
          [/%.*$/, 'comment', ''],
          
          // Operators
          [/->|=>|::|:=|==|=:=|=\/=|>=|=<|<|>|\+|-|\*|\/|\+\+|--|\|\||!|\|/, 'operator', ''],
          
          // Delimiters
          [/[.,;]/, 'delimiter', ''],
          [/[{}()[\]]/, 'delimiter', ''],
          
          // Whitespace
          [/[ \t\r\n]+/, 'white', '']
        ]
      }
    }

    monaco.languages.setMonarchTokensProvider('erlang', erlangLanguage as monacoEditor.languages.IMonarchLanguage);
  });
}

// Helper function to highlight code blocks
export const highlightErlangCode = () => {
  document.querySelectorAll('pre.code-block.language-erlang, code.language-erlang').forEach((block) => {
    hljs.highlightElement(block as HTMLElement);
  });
};
