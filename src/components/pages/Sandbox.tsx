import Editor from '@monaco-editor/react';
import { useCallback, useEffect, useRef, useState } from 'react';
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
  const decorationIdsRef = useRef<string[]>([]);

  const loadExampleFile = useCallback(async (exampleKey: string) => {
    console.log('Loading example file:', exampleKey);
    setIsLoadingExample(true);
    try {
      const file = await PaterlService.readExampleFile(exampleKey);
      console.log('Loaded file:', file);
      setExampleFile(file);
      setCode(file.content);
      
      // Store original content for editable examples to enable reset functionality
      if (isEditableExample(exampleKey)) {
        setOriginalCombinedContent(file.content);
      }
    } catch (error) {
      console.error('Failed to load example file:', error);
      setCode('% Mailboxer is currently unavailable. \n% Please contact STARDUST team for support.');
    } finally {
      setIsLoadingExample(false);
    }
  }, []);

  useEffect(() => {
    document.title = 'Sandbox - Mailboxer';
    // Load the initial example file
    loadExampleFile('id_server_code');
    // Initialize syntax highlighting for inline code blocks
    highlightErlangCode();
  }, [loadExampleFile]);

  const isEditableExample = (exampleKey: string) => {
    return exampleKey === 'combined_errors' || 
           exampleKey === 'fib' || 
           exampleKey === 'kfork_dir_rec' || 
           exampleKey === 'master_worker_dir_rec' || 
           exampleKey === 'ping_pong_strict_dir_rec' ||
           exampleKey === 'unexpected_request' ||
           exampleKey === 'omitted_reply' ||
           exampleKey === 'payload_mismatch' ||
           exampleKey === 'unsupported_request';
  };

  const handleExampleChange = (exampleKey: string) => {
    setCurrentExample(exampleKey);
    setIsEditingCombined(isEditableExample(exampleKey));
    loadExampleFile(exampleKey);
    setOutput('Mailboxer output will appear here.');
    
    // Clear any existing decorations first using tracked IDs
    if (editorRef.current) {
      const monacoEditor = editorRef.current as { deltaDecorations: (oldDecorations: string[], newDecorations: unknown[]) => string[] };
      const newIds = monacoEditor.deltaDecorations(decorationIdsRef.current, []);
      decorationIdsRef.current = newIds;
    }
    
    // Add decorations only for combined_errors after a short delay to ensure editor is ready
    if (exampleKey === 'combined_errors') {
      setTimeout(() => {
        if (editorRef.current) {
          const monacoEditor = editorRef.current as { deltaDecorations: (oldDecorations: string[], newDecorations: unknown[]) => string[] };
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
            
            const newIds = monacoEditor.deltaDecorations(decorationIdsRef.current, decorations);
            decorationIdsRef.current = newIds;
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
      
      if (isEditableExample(currentExample)) {
        // For editable examples, run the current editor content
        result = await PaterlService.runCodeContent(code, currentExample);
      } else {
        // For non-editable examples, run the original file
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
          <Col md={6} className="border-end">
            <div className="d-flex flex-column gap-4">
              {/* Working Example Section */}
              <div>
                <h5 className="mb-3">Working Example</h5>
                <div className="d-flex flex-wrap gap-2">
                  <Button 
                    variant="outline-secondary"
                    onClick={() => handleExampleChange('id_server_code')}
                    disabled={isLoadingExample}
                    className={`px-3 py-2 fw-normal border sandbox-example-button text-center ${currentExample === 'id_server_code' ? 'border-success text-success bg-success bg-opacity-10' : ''}`}
                  >
                    ID Server
                  </Button>
                </div>
                <p className="mt-3 text-muted">
                  This ID Server is a non-editable example of a mailbox-annotated ID server, with no errors.
                </p>
              </div>

              {/* ID Server with Errors Section */}
              <div>
                <h5 className="mb-3">ID Server with Errors</h5>
                <div className="d-flex flex-wrap gap-2">
                  <Button 
                    variant={currentExample === 'unexpected_request' ? 'outline-danger' : 'outline-secondary'}
                    onClick={() => handleExampleChange('unexpected_request')}
                    disabled={isLoadingExample}
                    className="px-3 py-2 fw-normal border sandbox-example-button text-center"
                  >
                    Unexpected Request
                  </Button>

                  <Button 
                    variant={currentExample === 'omitted_reply' ? 'outline-danger' : 'outline-secondary'}
                    onClick={() => handleExampleChange('omitted_reply')}
                    disabled={isLoadingExample}
                    className="px-3 py-2 fw-normal border sandbox-example-button text-center"
                  >
                    Omitted Reply
                  </Button>

                  <Button 
                    variant={currentExample === 'payload_mismatch' ? 'outline-danger' : 'outline-secondary'}
                    onClick={() => handleExampleChange('payload_mismatch')}
                    disabled={isLoadingExample}
                    className="px-3 py-2 fw-normal border sandbox-example-button text-center"
                  >
                    Payload Mismatch
                  </Button>

                  <Button 
                    variant={currentExample === 'unsupported_request' ? 'outline-danger' : 'outline-secondary'}
                    onClick={() => handleExampleChange('unsupported_request')}
                    disabled={isLoadingExample}
                    className="px-3 py-2 fw-normal border sandbox-example-button text-center"
                  >
                    Unsupported Request
                  </Button>
                </div>
                <p className="mt-3 text-muted">
                  These examples are of the ID server, with specific errors. Try solve them if you can by editing them.
                </p>
              </div>
            </div>
          </Col>

          <Col md={6}>
            {/* More Examples Section */}
            <div>
              <h5 className="mb-3">More Working Examples</h5>
              <div className="d-flex flex-wrap gap-2">
                <Button 
                  variant="outline-secondary"
                  onClick={() => handleExampleChange('fib')}
                  disabled={isLoadingExample}
                  className={`px-3 py-2 fw-normal border sandbox-example-button text-center ${currentExample === 'fib' ? 'border-success text-success bg-success bg-opacity-10' : ''}`}
                >
                  Parallel Fibonacci
                </Button>

                <Button 
                  variant="outline-secondary"
                  onClick={() => handleExampleChange('kfork_dir_rec')}
                  disabled={isLoadingExample}
                  className={`px-3 py-2 fw-normal border sandbox-example-button text-center ${currentExample === 'kfork_dir_rec' ? 'border-success text-success bg-success bg-opacity-10' : ''}`}
                >
                  Message Broadcast
                </Button>

                <Button 
                  variant="outline-secondary"
                  onClick={() => handleExampleChange('master_worker_dir_rec')}
                  disabled={isLoadingExample}
                  className={`px-3 py-2 fw-normal border sandbox-example-button text-center ${currentExample === 'master_worker_dir_rec' ? 'border-success text-success bg-success bg-opacity-10' : ''}`}
                >
                  Worker Pool
                </Button>

                                <Button 
                  variant="outline-secondary"
                  onClick={() => handleExampleChange('ping_pong_strict_dir_rec')}
                  disabled={isLoadingExample}
                  className={`px-3 py-2 fw-normal border sandbox-example-button text-center ${currentExample === 'ping_pong_strict_dir_rec' ? 'border-success text-success bg-success bg-opacity-10' : ''}`}
                >
                  Ping Pong
                </Button>
                </div>
                <p className="mt-3 text-muted">
                  The above editable examples are all annotated with mailbox types, experiment with them to add errors, and then fix those errors.
                </p>

                <div className="mt-4-5">
                   <h5 className="sandbox-section-header">Challenge Example</h5>
                  <div className="d-flex flex-wrap gap-2">
                    <Button 
                      variant={currentExample === 'combined_errors' ? 'outline-warning' : 'outline-secondary'}
                      onClick={() => handleExampleChange('combined_errors')}
                      disabled={isLoadingExample}
                      className="px-3 py-2 fw-normal border sandbox-example-button text-center"
                    >
                      Can You Fix This?
                    </Button>
                  </div>
                  <p className="mt-3 text-muted">
                    This example is the ID Server with the following errors: Omitted Reply, Unsupported Request, Payload Mismatch, and Unexpected Request. Try solve it if you can by editing it.
                  </p>
                </div>
            </div>
          </Col>
        </Row>

        <hr className="mb-4" />

        <Row className="mb-4">
          <Col md={6}>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex gap-2 align-items-center">
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
                <span className="text-secondary">
                  Loaded file: <code>{`${currentExample}.erl`}</code>
                </span>
              </div>
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
                    <>
                      <p className="mb-2">A recursive fibonacci calculator using parallel processes to compute sub-problems.</p>
                      <p className="mb-1"><strong>Try these errors:</strong></p>
                      <p className="mb-1">• <strong>Unexpected Request:</strong> After line 52, add <code className="language-erlang">FibPid1 ! {'{'} req, Self, 5 {'},'}</code></p>
                      <p className="mb-1">• <strong>Omitted Reply:</strong> On line 44, change <code className="language-erlang">ReplyTo ! {'{'} resp, Term {'}'}</code> to <code className="language-erlang">ok</code></p>
                      <p className="mb-1">• <strong>Payload Mismatch:</strong> On line 52, change <code className="language-erlang">16</code> to <code className="language-erlang">"16"</code></p>
                      <p className="mb-1">• <strong>Unsupported Request:</strong> On line 31 or 32, change <code className="language-erlang">req</code> to <code className="language-erlang">request</code></p>
                    </>
                  )}
                  {currentExample === 'kfork_dir_rec' && (
                    <>
                      <p className="mb-2">Spawns multiple actors and demonstrates one-way message broadcasting.</p>
                      <p className="mb-1"><strong>Try these errors:</strong></p>
                      <p className="mb-1">• <strong>Unexpected Request:</strong> After line 47, add <code className="language-erlang">Actor1 ! {'{'}unexpected{'}'},</code></p>
                      <p className="mb-1">• <strong>Omitted Reply:</strong> Comment out line 25 <code className="language-erlang">{'{'}packet{'}'} {'->'}</code> and its body</p>
                      <p className="mb-1">• <strong>Payload Mismatch:</strong> On line 47-49, change any number to a string (e.g., <code className="language-erlang">5</code> to <code className="language-erlang">"5"</code>)</p>
                      <p className="mb-1">• <strong>Unsupported Request:</strong> On line 37, change <code className="language-erlang">{'{'}packet{'}'}</code> to <code className="language-erlang">{'{'}message{'}'}</code></p>
                    </>
                  )}
                  {currentExample === 'master_worker_dir_rec' && (
                    <>
                      <p className="mb-2">Task distribution system with a master delegating work to a pool of worker processes.</p>
                      <p className="mb-1"><strong>Try these errors:</strong></p>
                      <p className="mb-1">• <strong>Unexpected Request:</strong> After line 125, add <code className="language-erlang">MasterMb ! {'{'}unexpected{'}'},</code></p>
                      <p className="mb-1">• <strong>Omitted Reply:</strong> Comment out line 46 <code className="language-erlang">ReplyTo ! {'{'}result, Result{'}'},</code></p>
                      <p className="mb-1">• <strong>Payload Mismatch:</strong> On line 125, change <code className="language-erlang">5</code> to <code className="language-erlang">"5"</code></p>
                      <p className="mb-1">• <strong>Unsupported Request:</strong> On line 72, change <code className="language-erlang">work</code> to <code className="language-erlang">task</code></p>
                    </>
                  )}
                  {currentExample === 'ping_pong_strict_dir_rec' && (
                    <>
                      <p className="mb-2">Two processes exchanging ping/pong messages with a configurable number of rounds.</p>
                      <p className="mb-1"><strong>Try these errors:</strong></p>
                      <p className="mb-1">• <strong>Unexpected Request:</strong> Edit line 75 to remove the <code className="language-erlang">.</code>, add a comma, and after line 75, add <code className="language-erlang">Ping ! {'{'}start, Pong{'}.'}</code></p>
                      <p className="mb-1">• <strong>Omitted Reply:</strong> Comment out line 65 <code className="language-erlang">Ping ! {'{'}pong, Self{'}'},</code></p>
                      <p className="mb-1">• <strong>Payload Mismatch:</strong> On line 74, change <code className="language-erlang">5</code> to <code className="language-erlang">"5"</code></p>
                      <p className="mb-1">• <strong>Unsupported Request:</strong> On line 44, change <code className="language-erlang">ping</code> to <code className="language-erlang">message</code></p>
                    </>
                  )}
                </p>
              )}
              {/* Error Examples */}
              {currentExample === 'combined_errors' && (
                <>
                  <p className="mb-1 mt-2"><strong>Line 39:</strong> Omitted Reply - Missing response to client. <strong>Fix:</strong> Uncomment the line <code className="language-erlang">Client ! {`{id, N}`},</code></p>
                  <p className="mb-1"><strong>Line 46:</strong> Unsupported Request - Wrong message tag. <strong>Fix:</strong> Change <code className="language-erlang">gte</code> to <code className="language-erlang">get</code></p>
                  <p className="mb-1"><strong>Line 56:</strong> Payload Mismatch - String instead of integer. <strong>Fix:</strong> Change <code className="language-erlang">"5"</code> to <code className="language-erlang">5</code></p>
                  <p className="mb-1"><strong>Line 57:</strong> Unexpected Request - Extra init message. <strong>Fix:</strong> Remove the line <code className="language-erlang">Server ! {`{init, 10}`},</code></p>
                </>
              )}
              {currentExample === 'omitted_reply' && (
                <p className="mb-0 mt-2"><strong>Line 39:</strong> Missing reply message. The server receives a request but doesn't send a response back to the client, causing a deadlock. To fix, uncomment line 39.</p>
              )}
              {currentExample === 'payload_mismatch' && (
                <p className="mb-0 mt-2"><strong>Line 56:</strong> Type mismatch. The <code className="language-erlang">init</code> message sends a string <code className="language-erlang">"5"</code> instead of an integer <code className="language-erlang">5</code>, violating the type specification. To fix, change <code className="language-erlang">"5"</code> to <code className="language-erlang">5</code>.</p>
              )}
              {currentExample === 'unexpected_request' && (
                <p className="mb-0 mt-2"><strong>Line 57:</strong> Protocol violation. The client sends an extra <code className="language-erlang">init</code> message that violates the expected communication pattern. To fix, remove line 57.</p>
              )}
              {currentExample === 'unsupported_request' && (
                <p className="mb-0 mt-2"><strong>Line 46:</strong> Unknown message tag. The client sends <code className="language-erlang">gte</code> instead of <code className="language-erlang">get</code>, using an unsupported message type. To fix, change <code className="language-erlang">gte</code> to <code className="language-erlang">get</code>.</p>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Sandbox;
