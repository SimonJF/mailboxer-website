import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { highlightErlangCode, initErlangSyntax } from '../../config/erlangSyntax';
import type { ExampleFile, PaterlResult } from '../../services/paterlService';
import { PaterlService } from '../../services/paterlService';

// Initialize Erlang syntax highlighting
initErlangSyntax();

// Interactive sandbox component for testing Mailboxer on example programs with communication errors
function Sandbox() {
  const [currentExample, setCurrentExample] = useState('id_server_code');
  const [output, setOutput] = useState('Mailboxer output will appear here.');
  const [isRunning, setIsRunning] = useState(false);
  const [code, setCode] = useState('');
  const [exampleFile, setExampleFile] = useState<ExampleFile | null>(null);
  const [isLoadingExample, setIsLoadingExample] = useState(false);
  const [isEditingCombined, setIsEditingCombined] = useState(false);
  const [originalCombinedContent, setOriginalCombinedContent] = useState<string>('');
  const editorRef = useRef<unknown>(null);

  useEffect(() => {
    document.title = 'Sandbox - Mailboxer';
    // Load the initial example file
    loadExampleFile('id_server_code');
    // Initialize syntax highlighting for inline code blocks
    highlightErlangCode();
  }, []);

  const loadExampleFile = async (exampleKey: string) => {
    console.log('Loading example file:', exampleKey);
    setIsLoadingExample(true);
    try {
      const file = await PaterlService.readExampleFile(exampleKey);
      console.log('Loaded file:', file);
      setExampleFile(file);
      setCode(file.content);
      
      // Store original content for combined_errors to enable reset functionality
      if (exampleKey === 'combined_errors') {
        setOriginalCombinedContent(file.content);
      }
    } catch (error) {
      console.error('Failed to load example file:', error);
      setCode('// Failed to load example file');
    } finally {
      setIsLoadingExample(false);
    }
  };

  const handleExampleChange = (exampleKey: string) => {
    setCurrentExample(exampleKey);
    setIsEditingCombined(exampleKey === 'combined_errors');
    loadExampleFile(exampleKey);
    setOutput('Mailboxer output will appear here.');
    
    // Add decorations after a short delay to ensure editor is ready
    if (exampleKey === 'combined_errors') {
      setTimeout(() => {
        if (editorRef.current) {
          const monacoEditor = editorRef.current as { deltaDecorations: (oldDecorations: string[], newDecorations: unknown[]) => void };
          const monaco = (window as { monaco?: { Range: new (startLine: number, startCol: number, endLine: number, endCol: number) => unknown } }).monaco;
          
          if (monaco) {
            const decorations = [
              {
                range: new monaco.Range(39, 1, 39, 1000), // Omitted Reply
                options: {
                  isWholeLine: true,
                  className: 'error-line-omitted-reply',
                  glyphMarginClassName: 'error-glyph',
                  linesDecorationsClassName: 'error-decoration'
                }
              },
              {
                range: new monaco.Range(46, 1, 46, 1000), // Unsupported Request
                options: {
                  isWholeLine: true,
                  className: 'error-line-unsupported',
                  glyphMarginClassName: 'error-glyph',
                  linesDecorationsClassName: 'error-decoration'
                }
              },
              {
                range: new monaco.Range(56, 1, 56, 1000), // Payload Mismatch
                options: {
                  isWholeLine: true,
                  className: 'error-line-payload',
                  glyphMarginClassName: 'error-glyph',
                  linesDecorationsClassName: 'error-decoration'
                }
              },
              {
                range: new monaco.Range(57, 1, 57, 1000), // Unexpected Request
                options: {
                  isWholeLine: true,
                  className: 'error-line-unexpected',
                  glyphMarginClassName: 'error-glyph',
                  linesDecorationsClassName: 'error-decoration'
                }
              }
            ];
            
            monacoEditor.deltaDecorations([], decorations);
          }
        }
      }, 100);
    }
  };

  const handleRun = async () => {
    if (!editorRef.current) return;
    
    setIsRunning(true);
    setOutput('Running Mailboxer...\n');
    
    try {
      let result: PaterlResult;
      
      if (isEditingCombined) {
        // For combined errors, run the current editor content
        result = await PaterlService.runCodeContent(code, currentExample);
      } else {
        // For individual examples, run the file
        result = await PaterlService.runPaterl(currentExample);
      }
      
      if (result.success) {
        setOutput(`✓ Mailboxer verification successful!\n\n${result.output}`);
      } else {
        setOutput(`✗ Mailboxer verification failed!\n\n${result.output}`);
        if (result.error) {
          setOutput(prev => prev + `\n\nError: ${result.error}`);
        }
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    if (isEditingCombined && originalCombinedContent) {
      setCode(originalCombinedContent);
    } else if (exampleFile) {
      setCode(exampleFile.content);
    }
    setOutput('Mailboxer output will appear here.');
  };

  const handleEditorDidMount = (editor: unknown) => {
    editorRef.current = editor;
    
    // Add error line decorations for combined_errors challenge
    if (currentExample === 'combined_errors' && isEditingCombined) {
      const monacoEditor = editor as { deltaDecorations: (oldDecorations: string[], newDecorations: unknown[]) => void };
      const monaco = (window as { monaco?: { Range: new (startLine: number, startCol: number, endLine: number, endCol: number) => unknown } }).monaco;
      
      if (monaco) {
        const decorations = [
          {
            range: new monaco.Range(39, 1, 39, 1000), // Omitted Reply
            options: {
              isWholeLine: true,
              className: 'error-line-omitted-reply',
              glyphMarginClassName: 'error-glyph',
              linesDecorationsClassName: 'error-decoration',
              marginClassName: 'error-margin',
              inlineClassName: 'error-inline'
            }
          },
          {
            range: new monaco.Range(46, 1, 46, 1000), // Unsupported Request
            options: {
              isWholeLine: true,
              className: 'error-line-unsupported',
              glyphMarginClassName: 'error-glyph',
              linesDecorationsClassName: 'error-decoration',
              marginClassName: 'error-margin'
            }
          },
          {
            range: new monaco.Range(56, 1, 56, 1000), // Payload Mismatch
            options: {
              isWholeLine: true,
              className: 'error-line-payload',
              glyphMarginClassName: 'error-glyph',
              linesDecorationsClassName: 'error-decoration',
              marginClassName: 'error-margin'
            }
          },
          {
            range: new monaco.Range(57, 1, 57, 1000), // Unexpected Request
            options: {
              isWholeLine: true,
              className: 'error-line-unexpected',
              glyphMarginClassName: 'error-glyph',
              linesDecorationsClassName: 'error-decoration',
              marginClassName: 'error-margin'
            }
          }
        ];
        
        monacoEditor.deltaDecorations([], decorations);
      }
    }
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  return (
    <>
      <Container className="py-5 sandbox-container">
        {/* Page title and description */}
        <Row className="mb-4">
          <Col>
            <h1 className="display-4 text-center mb-4">Mailboxer Sandbox</h1>
            <p className="text-center text-muted">
              Test Mailboxer on example programs with communication errors
            </p>
          </Col>
        </Row>

        {/* Example selection buttons */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex flex-column gap-4">
              <div>
                <h5 className="mb-3">Working Examples</h5>
                <div className="d-flex flex-wrap gap-2">
                  <Button 
                    variant="outline-secondary"
                    onClick={() => handleExampleChange('id_server_code')}
                    disabled={isLoadingExample}
                    className={`px-3 py-2 fw-normal border sandbox-example-button text-center ${currentExample === 'id_server_code' ? 'border-success text-success bg-success bg-opacity-10' : ''}`}
                  >
                    {isLoadingExample && currentExample === 'id_server_code' ? 'Loading...' : 'ID Server'}
                  </Button>

                  <Button 
                    variant="outline-secondary"
                    onClick={() => handleExampleChange('fib')}
                    disabled={isLoadingExample}
                    className={`px-3 py-2 fw-normal border sandbox-example-button text-center ${currentExample === 'fib' ? 'border-success text-success bg-success bg-opacity-10' : ''}`}
                  >
                    {isLoadingExample && currentExample === 'fib' ? 'Loading...' : 'Parallel Fibonacci'}
                  </Button>

                  <Button 
                    variant="outline-secondary"
                    onClick={() => handleExampleChange('kfork_dir_rec')}
                    disabled={isLoadingExample}
                    className={`px-3 py-2 fw-normal border sandbox-example-button text-center ${currentExample === 'kfork_dir_rec' ? 'border-success text-success bg-success bg-opacity-10' : ''}`}
                  >
                    {isLoadingExample && currentExample === 'kfork_dir_rec' ? 'Loading...' : 'Message Broadcast'}
                  </Button>

                  <Button 
                    variant="outline-secondary"
                    onClick={() => handleExampleChange('master_worker_dir_rec')}
                    disabled={isLoadingExample}
                    className={`px-3 py-2 fw-normal border sandbox-example-button text-center ${currentExample === 'master_worker_dir_rec' ? 'border-success text-success bg-success bg-opacity-10' : ''}`}
                  >
                    {isLoadingExample && currentExample === 'master_worker_dir_rec' ? 'Loading...' : 'Worker Pool'}
                  </Button>

                  <Button 
                    variant="outline-secondary"
                    onClick={() => handleExampleChange('ping_pong_strict_dir_rec')}
                    disabled={isLoadingExample}
                    className={`px-3 py-2 fw-normal border sandbox-example-button text-center ${currentExample === 'ping_pong_strict_dir_rec' ? 'border-success text-success bg-success bg-opacity-10' : ''}`}
                  >
                    {isLoadingExample && currentExample === 'ping_pong_strict_dir_rec' ? 'Loading...' : 'Ping Pong'}
                  </Button>
                </div>
              </div>

              <div>
                <h5 className="mb-3">Error Examples</h5>
                <div className="d-flex flex-wrap gap-2">
                  <Button 
                    variant={currentExample === 'unexpected_request' ? 'outline-danger' : 'outline-secondary'}
                    onClick={() => handleExampleChange('unexpected_request')}
                    disabled={isLoadingExample}
                    className={`px-3 py-2 fw-normal border sandbox-example-button text-center ${currentExample === 'unexpected_request' ? 'border-danger text-danger bg-danger bg-opacity-10' : 'text-secondary'}`}
                  >
                    {isLoadingExample && currentExample === 'unexpected_request' ? 'Loading...' : 'Unexpected Request'}
                  </Button>

                  <Button 
                    variant={currentExample === 'omitted_reply' ? 'outline-danger' : 'outline-secondary'}
                    onClick={() => handleExampleChange('omitted_reply')}
                    disabled={isLoadingExample}
                    className={`px-3 py-2 fw-normal border sandbox-example-button text-center ${currentExample === 'omitted_reply' ? 'border-danger text-danger bg-danger bg-opacity-10' : 'text-secondary'}`}
                  >
                    {isLoadingExample && currentExample === 'omitted_reply' ? 'Loading...' : 'Omitted Reply'}
                  </Button>

                  <Button 
                    variant={currentExample === 'payload_mismatch' ? 'outline-danger' : 'outline-secondary'}
                    onClick={() => handleExampleChange('payload_mismatch')}
                    disabled={isLoadingExample}
                    className={`px-3 py-2 fw-normal border sandbox-example-button text-center ${currentExample === 'payload_mismatch' ? 'border-danger text-danger bg-danger bg-opacity-10' : 'text-secondary'}`}
                  >
                    {isLoadingExample && currentExample === 'payload_mismatch' ? 'Loading...' : 'Payload Mismatch'}
                  </Button>

                  <Button 
                    variant={currentExample === 'unsupported_request' ? 'outline-danger' : 'outline-secondary'}
                    onClick={() => handleExampleChange('unsupported_request')}
                    disabled={isLoadingExample}
                    className={`px-3 py-2 fw-normal border sandbox-example-button text-center ${currentExample === 'unsupported_request' ? 'border-danger text-danger bg-danger bg-opacity-10' : 'text-secondary'}`}
                  >
                    {isLoadingExample && currentExample === 'unsupported_request' ? 'Loading...' : 'Unsupported Request'}
                  </Button>
                </div>
              </div>

              <div>
                <h5 className="mb-3">Challenge Example</h5>
                <div className="d-flex flex-wrap gap-2">
                  <Button 
                    variant={currentExample === 'combined_errors' ? 'outline-warning' : 'outline-secondary'}
                    onClick={() => handleExampleChange('combined_errors')}
                    disabled={isLoadingExample}
                    className={`px-3 py-2 fw-normal border sandbox-example-button text-center ${currentExample === 'combined_errors' ? 'border-warning text-warning bg-warning bg-opacity-10' : 'text-secondary'}`}
                  >
                    {isLoadingExample && currentExample === 'combined_errors' ? 'Loading...' : 'Can You Fix This?'}
                  </Button>
                  {isEditingCombined && (
                    <Button 
                      variant="outline-secondary" 
                      onClick={handleReset}
                      disabled={isRunning}
                      className="px-3 py-2 fw-normal border sandbox-reset-button"
                    >
                      Reset Code
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <hr className="mb-4" />

        <Row className="mb-4">
          <Col md={6}>
            <div className="d-flex align-items-center gap-3">
              <Button 
                variant="primary"
                onClick={handleRun}
                disabled={isRunning}
                className="px-3 py-2 fw-normal border sandbox-run-button"
              >
                {isRunning ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Running Mailboxer...
                  </>
                ) : (
                  'Run Mailboxer'
                )}
              </Button>
              <span className="text-secondary">
                Loaded file: <code>{`${currentExample}.erl`}</code>
              </span>
            </div>
          </Col>
        </Row>

        {/* Main content area with code editor and output display */}
        <Row className="mb-4">
          {/* Code editor for viewing and editing Erlang code */}
          <Col md={6}>
            <div className={`border rounded sandbox-editor ${!isEditingCombined ? 'bg-light bg-opacity-50' : ''}`}>
              <Editor
                height="100%"
                defaultLanguage="erlang"
                value={code}
                onChange={handleCodeChange}
                onMount={handleEditorDidMount}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  theme: 'vs-light',
                  readOnly: !isEditingCombined,
                  cursorStyle: isEditingCombined ? 'line' : 'underline-thin',
                  renderValidationDecorations: isEditingCombined ? 'on' : 'off',
                  scrollbar: {
                    vertical: 'visible',
                    horizontal: 'visible'
                  }
                }}
              />
            </div>
          </Col>

          {/* Output display showing Mailboxer analysis results */}
          <Col md={6}>
            <div className="bg-light border rounded p-3 font-monospace sandbox-output">
              <pre className="mb-0 sandbox-output-pre">
                {output}
              </pre>
            </div>
          </Col>
        </Row>

        {/* Example/Error details section */}
        <Row className="mb-4">
          <Col>
            <div className="p-3 bg-light border rounded">
              <h6 className="fw-bold mb-0">Example Details:</h6>
              {/* Working Examples */}
              {['id_server_code', 'fib', 'kfork_dir_rec', 'master_worker_dir_rec', 'ping_pong_strict_dir_rec'].includes(currentExample) && (
                <p className="mb-0 mt-2">
                  {currentExample === 'id_server_code' && (
                    "A simple ID server that demonstrates client-server communication with request-reply pattern."
                  )}
                  {currentExample === 'fib' && (
                    "A recursive fibonacci calculator using parallel processes to compute sub-problems."
                  )}
                  {currentExample === 'kfork_dir_rec' && (
                    "Spawns multiple actors and demonstrates one-way message broadcasting."
                  )}
                  {currentExample === 'master_worker_dir_rec' && (
                    "Task distribution system with a master delegating work to a pool of worker processes."
                  )}
                  {currentExample === 'ping_pong_strict_dir_rec' && (
                    "Two processes exchanging ping/pong messages with a configurable number of rounds."
                  )}
                </p>
              )}
              {/* Error Examples */}
              {currentExample === 'combined_errors' && (
                <>
                  <p className="mb-1 mt-2"><strong>Line 39:</strong> Omitted Reply - Missing response to client. <strong>Fix:</strong> Uncomment the line <code className="language-erlang">Client ! {`{id, N}`},</code></p>
                  <p className="mb-1"><strong>Line 56:</strong> Payload Mismatch - String instead of integer. <strong>Fix:</strong> Change <code className="language-erlang">"5"</code> to <code className="language-erlang">5</code></p>
                  <p className="mb-1"><strong>Line 57:</strong> Unexpected Request - Extra init message. <strong>Fix:</strong> Remove the line <code className="language-erlang">Server ! {`{init, 10}`},</code></p>
                  <p className="mb-1"><strong>Line 58:</strong> Unsupported Request - Wrong message tag. <strong>Fix:</strong> Change <code className="language-erlang">gte</code> to <code className="language-erlang">get</code></p>
                </>
              )}
              {currentExample === 'omitted_reply' && (
                <p className="mb-0 mt-2"><strong>Line 39:</strong> Missing reply message. The server receives a request but doesn't send a response back to the client, causing a deadlock.</p>
              )}
              {currentExample === 'payload_mismatch' && (
                <p className="mb-0 mt-2"><strong>Line 56:</strong> Type mismatch. The <code className="language-erlang">init</code> message sends a string <code className="language-erlang">"5"</code> instead of an integer <code className="language-erlang">5</code>, violating the type specification.</p>
              )}
              {currentExample === 'unexpected_request' && (
                <p className="mb-0 mt-2"><strong>Line 57:</strong> Protocol violation. The client sends an extra <code className="language-erlang">init</code> message that violates the expected communication pattern.</p>
              )}
              {currentExample === 'unsupported_request' && (
                <p className="mb-0 mt-2"><strong>Line 46:</strong> Unknown message tag. The client sends <code className="language-erlang">gte</code> instead of <code className="language-erlang">get</code>, using an unsupported message type.</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Sandbox;
