import { useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";

function Mailboxer() {
  useEffect(() => {
    document.title = 'What is Mailboxer? - Mailboxer';
  }, []);
  return (
    <Container className="py-5" style={{ maxWidth: "1200px" }}>
      {/* Header */}
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 text-center mb-4">What is Mailboxer?</h1>
        </Col>
      </Row>

      {/* Intro Section */}
      <Row className="mb-5">
        <Col>
          <p className="lead text-center">
            <strong>Mailboxer</strong> is a runtime verification tool for actor-based programs that integrates mailbox types with Erlang. It provides compile-time and runtime checking of communication protocols, preventing deadlocks, protocol violations, and message type mismatches.
          </p>
        </Col>
      </Row>

      {/* Code Section */}
      <Row className="mb-5">
        <Col>
          <h2 className="text-center h4 fw-semibold mb-4">
            Annotated ID Server and Client using Mailbox Types
          </h2>

          <Row>
            <Col md={6}>
              <h3 className="h5 fw-semibold mb-3">Server</h3>
              <div className="code-pane position-relative">
                <pre className="code-block" style={{ height: '400px', overflow: 'auto' }}>
                  <span style={{ color: '#0066cc', fontWeight: 'bold' }}>-new id_server.</span>{`
`}<span style={{ color: '#0066cc', fontWeight: 'bold' }}>-spec id_server() → unit.</span>{`
id_server() →
  `}<span style={{ color: '#cc6600', fontWeight: 'bold' }}>assert("init.get*")</span>{`,
  receive
    {init, N} → id_server_loop(N)
  end.

`}<span style={{ color: '#0066cc', fontWeight: 'bold' }}>-use id_server.</span>{`
`}<span style={{ color: '#0066cc', fontWeight: 'bold' }}>-spec id_server_loop(int) → unit.</span>{`
id_server_loop(N) →
  `}<span style={{ color: '#cc6600', fontWeight: 'bold' }}>assert("get*")</span>{`,
  receive
    {get, Client} →
      Client ! {id, N},
      id_server_loop(N + 1)
  end.`}
                </pre>
              </div>
            </Col>

            <Col md={6}>
              <h3 className="h5 fw-semibold mb-3">Client</h3>
              <div className="code-pane position-relative">
                <pre className="code-block" style={{ height: '400px' }}>
                  <span style={{ color: '#0066cc', fontWeight: 'bold' }}>-new id_client.</span>{`
`}<span style={{ color: '#0066cc', fontWeight: 'bold' }}>-spec client() → unit.</span>{`
client() →
  Server = spawn {id_server, []},
  
  Server ! {init, 5},
  Server ! {get, self},
  `}<span style={{ color: '#cc6600', fontWeight: 'bold' }}>assert("id")</span>{`,
  receive
    {id, Id} → print Id
  end.`}
                </pre>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Mailbox Types Section */}
      <Row className="mb-5">
        <Col>
          <h2 className="h4 fw-semibold mb-3">Mailbox Types</h2>
          <p>
            Mailbox types are behavioral specifications that describe expected message sequences between processes. They use regular expression syntax: <code>!msg(type)</code> (send), <code>?msg(type)</code> (receive), <code>*</code> (zero or more), <code>.</code> (sequence).
          </p>
          <p>
            <strong>Key Benefits:</strong> Protocol verification, deadlock prevention, message type safety, runtime monitoring, and executable documentation.
          </p>
        </Col>
      </Row>

      {/* Pat Language Section */}
      <Row className="mb-5">
        <Col>
          <h2 className="h4 fw-semibold mb-3">Pat Language</h2>
          <p>
            Pat extends Erlang with mailbox type annotations: <code>-new</code> (declares new type), <code>-use</code> (references existing type), <code>-spec</code> (function signatures), <code>assert("pattern")</code> (expected message patterns).
          </p>
          <p>
            <strong>Erlang Integration:</strong> Compatible with existing code, compiles to standard bytecode, integrates with OTP.
          </p>
        </Col>
      </Row>

      {/* Key Features Section */}
      <Row className="mb-5">
        <Col>
          <h2 className="h4 fw-semibold mb-3">Key Features</h2>
          <p>
            <strong>Static Analysis:</strong> Compile-time protocol checking, type inference, deadlock detection, protocol compatibility verification.
          </p>
          <p>
            <strong>Runtime Verification:</strong> Dynamic monitoring, detailed error reporting, graceful degradation, minimal performance overhead.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Mailboxer;
