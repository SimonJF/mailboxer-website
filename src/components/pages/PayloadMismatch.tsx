import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

// Page explaining the payload mismatch communication error with code examples
function PayloadMismatch() {
  useEffect(() => {
    document.title = "Payload Mismatch - Mailboxer";
  }, []);

  return (
    <Container className="py-5">
      {/* Page title and description of the error type */}
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 text-center mb-4">Payload Mismatch</h1>
          <p className="lead text-center">
            Understanding message type errors when payload types don't match
            expectations
          </p>
        </Col>
      </Row>

      {/* Code examples showing server and client with the type error highlighted */}
      <Row className="mb-5">
        <Col>
          <h2 className="mb-4">Payload Mismatch Example</h2>

          <Row className="mt-4">
            <Col md={6}>
              <h5 className="mb-2">Server</h5>
              <div className="code-pane position-relative">
                <pre className="code-block">
                  {`id_server() ->
  receive
    {init, N} -> id_server_loop(N)
  end.

id_server_loop(N) ->
  receive
    {get, Client} ->
      Client ! {id, N},
      id_server_loop(N + 1);
    {init, _} -> error
  end.`}
                </pre>
              </div>
            </Col>

            <Col md={6}>
              <h5 className="mb-2">Client</h5>
              <div className="code-pane position-relative">
                <pre className="code-block">
                  {`client() ->

  % Create server.
  Server = spawn {id_server, []},

  % Initialize server.
  Server ! {init, "5"},

  Server ! {get, self},
  receive
    {id, Id} -> print Id
  end.`}
                </pre>
                <div className="payload-mismatch-error-label">
                  <span className="bg-danger text-white px-2 py-1 small">
                    Wrong type
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Explanation of the error and its consequences */}
      <Row className="mb-5">
        <Col>
          <h2 className="mb-4">What is a Payload Mismatch?</h2>
          <p>
            The client sends a message with correct structure but wrong data
            type. Here, the server expects an integer but receives a string:{" "}
            <code>{`{init, "5"}`}</code> instead of <code>{`{init, 5}`}</code>.
          </p>

          <h3 className="mt-4 mb-3">Impact</h3>
          <ul>
            <li>Runtime errors during arithmetic operations</li>
            <li>Type-related crashes or unexpected behavior</li>
            <li>Silent failures in weakly-typed systems</li>
          </ul>
        </Col>
      </Row>

      {/* Navigation links to previous and next pages */}
      <Row>
        <Col md={6}>
          <Link
            to="/actor-communication-errors"
            className="text-decoration-none"
          >
            ← Back to Communication Errors
          </Link>
        </Col>
        <Col md={6}>
          <div className="text-end">
            <Link
              to="/actor-communication-errors/message-type-error/unsupported-request"
              className="text-decoration-none"
            >
              Next: Unsupported Request →
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default PayloadMismatch;
