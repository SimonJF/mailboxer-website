import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

// Page showing practical examples of communication errors detected by Mailboxer
function MailboxerExamples() {
  useEffect(() => {
    document.title = "Examples - Mailboxer";
  }, []);
  return (
    <Container className="py-5 examples-container">
      {/* Page title and introduction with link to full code */}
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 text-center mb-4 ">
            Example Programs with Communication Errors
          </h1>
          <p className="text-center text-muted">
            The following examples show common communication errors and how
            Mailboxer detects them. <br />
            <strong>
              View the complete mailbox-annotated ID server code
            </strong>{" "}
            on the{" "}
            <a href="/mailboxer" className="text-decoration-none fw-bold">
              What is Mailboxer?
            </a>{" "}
            page.
          </p>
        </Col>
      </Row>

      {/* Example demonstrating unexpected request error */}
      <Row className="mb-5">
        <Col>
          <h2 className="h4 fw-semibold mb-4 text-decoration-underline">
            Example 1
          </h2>
          <h3 className="h5 fw-semibold mb-4">
            Extra <code>init</code> in <code>main</code> (Unexpected Request)
          </h3>

          {/* Code snippet showing the error and Mailboxer's error output */}
          <Row className="mb-4">
            <Col md={6}>
              <div className="code-pane position-relative examples-code-pane-small">
                <pre className="code-block examples-code-block">
                  {`Server ! {init, 5},
Server ! {init, 5},  % ← Extra initialization`}
                </pre>
              </div>
            </Col>
            <Col md={6}>
              <h4 className="h6 fw-semibold mb-2">Mailboxer Output</h4>
              <div className="p-3 border rounded bg-danger-subtle">
                <code className="text-danger">
                  3. Error: Inferred message pattern from code '(Init . (Init .
                  Get))' but expected user-asserted message pattern '(Init .
                  *(Get))'
                </code>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Example demonstrating omitted reply error */}
      <Row className="mb-5">
        <Col>
          <h2 className="h4 fw-semibold mb-4 text-decoration-underline">
            Example 2
          </h2>
          <h3 className="h5 fw-semibold mb-4">
            Missing reply in <code>id_server_loop</code> (Omitted Reply)
          </h3>

          {/* Code snippet showing the error and Mailboxer's error output */}
          <Row className="mb-4">
            <Col md={6}>
              <div className="code-pane position-relative examples-code-pane-small">
                <pre className="code-block examples-code-block">
                  {`{get, Client} →
  % Client ! {id, N}, ← Missing reply
  id_server_loop(N + 1);`}
                </pre>
              </div>
            </Col>
            <Col md={6}>
              <h4 className="h6 fw-semibold mb-2">Mailboxer Output</h4>
              <div className="p-3 border rounded bg-danger-subtle">
                <code className="text-danger">
                  3. Error: Inferred from code an empty mailbox but expecting a
                  missing message send that should produce the message pattern
                  'Id'
                </code>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Example demonstrating payload type mismatch error */}
      <Row className="mb-5">
        <Col>
          <h2 className="h4 fw-semibold mb-4 text-decoration-underline">
            Example 3
          </h2>
          <h3 className="h5 fw-semibold mb-4">
            String instead of integer in <code>main</code> (Payload Mismatch)
          </h3>

          {/* Code snippet showing the error and Mailboxer's error output */}
          <Row className="mb-4">
            <Col md={6}>
              <div className="code-pane position-relative examples-code-pane-medium">
                <pre className="code-block examples-code-block">
                  {`Server ! {init, "5"},  % ← String "5" instead of integer 5`}
                </pre>
              </div>
            </Col>
            <Col md={6}>
              <h4 className="h6 fw-semibold mb-2">Mailboxer Output</h4>
              <div className="p-3 border rounded bg-danger-subtle">
                <code className="text-danger">
                  3. Error: Type mismatch. Expected Int but got String.
                </code>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Example demonstrating unsupported request error */}
      <Row className="mb-5">
        <Col>
          <h2 className="h4 fw-semibold mb-4 text-decoration-underline">
            Example 4
          </h2>
          <h3 className="h5 fw-semibold mb-4">
            Wrong message tag in <code>main</code> (Unsupported Request)
          </h3>
          {/* Code snippet showing the error and Mailboxer's error output */}
          <Row className="mb-4">
            <Col md={6}>
              <div className="code-pane position-relative examples-code-pane-large">
                <pre className="code-block examples-code-block-large">
                  {`Server ! {gte, self},  % ← "gte" instead of "get"`}
                </pre>
              </div>
            </Col>
            <Col md={6}>
              <h4 className="h4 fw-semibold mb-2">Mailboxer Output</h4>
              <div className="p-3 border rounded bg-danger-subtle">
                <code className="text-danger">
                  3. Error: Message tag Gte not supported by interface
                  Id_server_mb.
                </code>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Next page navigation link */}
      <Row>
        <Col>
          <div className="text-end">
            <Link to="/sandbox" className="text-decoration-none">
              Next: Try Mailboxer Sandbox
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default MailboxerExamples;
