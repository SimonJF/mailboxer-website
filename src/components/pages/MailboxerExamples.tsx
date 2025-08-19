import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function MailboxerExamples() {
  useEffect(() => {
    document.title = 'Examples - Mailboxer';
  }, []);
  return (
    <Container className="py-5" style={{ maxWidth: "1200px" }}>
      {/* Header */}
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 text-center mb-4">Example Programs with Communication Errors</h1>
        </Col>
      </Row>

      {/* Example 1: Unexpected Request */}
      <Row className="mb-5">
        <Col>
          <h2 className="h4 fw-semibold mb-4">Example 1: Unexpected Request (unexpected init)</h2>
          
          {/* Server and Client Code */}
          <Row className="mb-4">
            <Col md={6}>
              <h3 className="h5 fw-semibold mb-3">Server</h3>
              <div className="code-pane position-relative">
                <pre className="code-block">
{`id_server() →
  receive
    {init, N} → id_server_loop(N)
  end.

id_server_loop(N) →
  receive
    {get, Client} →
      Client ! {id, N},
      id_server_loop(N + 1);
    {init, _} → error
  end.`}
                </pre>
              </div>
            </Col>

            <Col md={6}>
              <h3 className="h5 fw-semibold mb-3">Client</h3>
              <div className="code-pane position-relative">
                <pre className="code-block">
{`client() →
  % Create server.
  Server = spawn {id_server, []},

  % Initialize server.
  Server ! {init, 5},
  Server ! {init, 5},

  Server ! {get, self},
  receive
    {id, Id} → print Id
  end.`}
                </pre>
              </div>
            </Col>
          </Row>

          {/* Error Output */}
          <Row className="mb-4">
            <Col>
              <h4 className="h6 fw-semibold mb-2">Error Output</h4>
              <div className="p-3 border rounded bg-light text-center text-muted">
                Insert error here
              </div>
            </Col>
          </Row>

          {/* Example with Mailbox Types */}
          <Row className="mb-4">
            <Col>
              <h4 className="h6 fw-semibold mb-2">Example with Mailbox Types</h4>
              <div className="p-3 border rounded bg-light text-center text-muted">
                Insert mailbox annotated here
              </div>
            </Col>
          </Row>

          {/* Mailboxer Output */}
          <Row className="mb-4">
            <Col>
              <h4 className="h6 fw-semibold mb-2">Mailboxer Output</h4>
              <div className="p-3 border rounded bg-light text-center text-muted">
                Mailboxer output
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Example 2: Omitted Reply */}
      <Row className="mb-5">
        <Col>
          <h2 className="h4 fw-semibold mb-4">Example 2: Omitted Reply (missing id reply)</h2>
          
          {/* Server and Client Code */}
          <Row className="mb-4">
            <Col md={6}>
              <h3 className="h5 fw-semibold mb-3">Server</h3>
              <div className="code-pane position-relative">
                <pre className="code-block">
{`id_server() →
  receive
    {init, N} → id_server_loop(N)
  end.

id_server_loop(N) →
  receive
    {get, Client} →
      id_server_loop(N + 1);
    {init, _} → error
  end.`}
                </pre>
              </div>
            </Col>

            <Col md={6}>
              <h3 className="h5 fw-semibold mb-3">Client</h3>
              <div className="code-pane position-relative">
                <pre className="code-block">
{`client() →
  % Create server.
  Server = spawn {id_server, []},

  % Initialize server.
  Server ! {init, 5},

  Server ! {get, self},
  receive
    {id, Id} → print Id
  end.`}
                </pre>
              </div>
            </Col>
          </Row>

          {/* Error Output */}
          <Row className="mb-4">
            <Col>
              <h4 className="h6 fw-semibold mb-2">Error Output</h4>
              <div className="p-3 border rounded bg-light text-center text-muted">
                Insert error here
              </div>
            </Col>
          </Row>

          {/* Example with Mailbox Types */}
          <Row className="mb-4">
            <Col>
              <h4 className="h6 fw-semibold mb-2">Example with Mailbox Types</h4>
              <div className="p-3 border rounded bg-light text-center text-muted">
                Insert mailbox annotated here
              </div>
            </Col>
          </Row>

          {/* Mailboxer Output */}
          <Row className="mb-4">
            <Col>
              <h4 className="h6 fw-semibold mb-2">Mailboxer Output</h4>
              <div className="p-3 border rounded bg-light text-center text-muted">
                Mailboxer output
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Example 3: Payload Mismatch */}
      <Row className="mb-5">
        <Col>
          <h2 className="h4 fw-semibold mb-4">Example 3: Payload Mismatch (wrong type)</h2>
          
          {/* Server and Client Code */}
          <Row className="mb-4">
            <Col md={6}>
              <h3 className="h5 fw-semibold mb-3">Server</h3>
              <div className="code-pane position-relative">
                <pre className="code-block">
{`id_server() →
  receive
    {init, N} → id_server_loop(N)
  end.

id_server_loop(N) →
  receive
    {get, Client} →
      Client ! {id, N},
      id_server_loop(N + 1);
    {init, _} → error
  end.`}
                </pre>
              </div>
            </Col>

            <Col md={6}>
              <h3 className="h5 fw-semibold mb-3">Client</h3>
              <div className="code-pane position-relative">
                <pre className="code-block">
{`client() →
  % Create server.
  Server = spawn {id_server, []},

  % Initialize server.
  Server ! {init, "5"},

  Server ! {get, self},
  receive
    {id, Id} → print Id
  end.`}
                </pre>
              </div>
            </Col>
          </Row>

          {/* Error Output */}
          <Row className="mb-4">
            <Col>
              <h4 className="h6 fw-semibold mb-2">Error Output</h4>
              <div className="p-3 border rounded bg-light text-center text-muted">
                Insert error here
              </div>
            </Col>
          </Row>

          {/* Example with Mailbox Types */}
          <Row className="mb-4">
            <Col>
              <h4 className="h6 fw-semibold mb-2">Example with Mailbox Types</h4>
              <div className="p-3 border rounded bg-light text-center text-muted">
                Insert mailbox annotated here
              </div>
            </Col>
          </Row>

          {/* Mailboxer Output */}
          <Row className="mb-4">
            <Col>
              <h4 className="h6 fw-semibold mb-2">Mailboxer Output</h4>
              <div className="p-3 border rounded bg-light text-center text-muted">
                Mailboxer output
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Example 4: Unsupported Request */}
      <Row className="mb-5">
        <Col>
          <h2 className="h4 fw-semibold mb-4">Example 4: Unsupported Request (wrong tag)</h2>
          
          {/* Server and Client Code */}
          <Row className="mb-4">
            <Col md={6}>
              <h3 className="h5 fw-semibold mb-3">Server</h3>
              <div className="code-pane position-relative">
                <pre className="code-block">
{`id_server() →
  receive
    {init, N} → id_server_loop(N)
  end.

id_server_loop(N) →
  receive
    {get, Client} →
      Client ! {id, N},
      id_server_loop(N + 1);
    {init, _} → error
  end.`}
                </pre>
              </div>
            </Col>

            <Col md={6}>
              <h3 className="h5 fw-semibold mb-3">Client</h3>
              <div className="code-pane position-relative">
                <pre className="code-block">
{`client() →
  % Create server.
  Server = spawn {id_server, []},

  % Initialize server.
  Server ! {init, 5},

  Server ! {gte, self},
  receive
    {id, Id} → print Id
  end.`}
                </pre>
              </div>
            </Col>
          </Row>

          {/* Error Output */}
          <Row className="mb-4">
            <Col>
              <h4 className="h6 fw-semibold mb-2">Error Output</h4>
              <div className="p-3 border rounded bg-light text-center text-muted">
                Insert error here
              </div>
            </Col>
          </Row>

          {/* Example with Mailbox Types */}
          <Row className="mb-4">
            <Col>
              <h4 className="h6 fw-semibold mb-2">Example with Mailbox Types</h4>
              <div className="p-3 border rounded bg-light text-center text-muted">
                Insert mailbox annotated here
              </div>
            </Col>
          </Row>

          {/* Mailboxer Output */}
          <Row>
            <Col>
              <h4 className="h6 fw-semibold mb-2">Mailboxer Output</h4>
              <div className="p-3 border rounded bg-light text-center text-muted">
                Mailboxer output
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default MailboxerExamples;
