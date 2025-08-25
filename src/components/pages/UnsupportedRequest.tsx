import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

// Page explaining the unsupported request communication error with code examples
function UnsupportedRequest() {
  useEffect(() => {
    document.title = "Unsupported Request - Mailboxer";
  }, []);

  return (
    <Container className="py-5">
      {/* Page title and description of the error type */}
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 text-center mb-4">Unsupported Request</h1>
          <p className="lead text-center">
            Understanding message type errors when sending unrecognized message
            types
          </p>
        </Col>
      </Row>

      {/* Code examples showing server and client with the protocol violation highlighted */}
      <Row className="mb-5">
        <Col>
          <h2 className="mb-4">Unsupported Request Example</h2>

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
                <div className="unsupported-request-server-error-label">
                  <span className="bg-danger text-white px-2 py-1 small">
                    Mailbox junk
                  </span>
                </div>
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
  Server ! {init, 5},

  Server ! {gte, self},
  receive
    {id, Id} -> print Id
  end.`}
                </pre>
                <div className="unsupported-request-client-error-label">
                  <span className="bg-danger text-white px-2 py-1 small">
                    Wrong tag
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
          <h2 className="mb-4">What is an Unsupported Request?</h2>
          <p>
            The client sends a message with an incorrect or unrecognized tag.
            Here, <code>{`{gte, self}`}</code> instead of{" "}
            <code>{`{get, self}`}</code> becomes mailbox junk that will never be
            processed.
          </p>

          <h3 className="mt-4 mb-3">Impact</h3>
          <ul>
            <li>Messages accumulate as unprocessed mailbox junk</li>
            <li>Memory leaks from growing mailboxes</li>
            <li>Silent failures - client waits indefinitely</li>
            <li>Performance degradation from large mailboxes</li>
          </ul>
        </Col>
      </Row>

      {/* Navigation links to previous and next pages */}
      <Row>
        <Col md={6}>
          <Link
            to="/actor-communication-errors/message-type-error/payload-mismatch"
            className="text-decoration-none"
          >
            ← Previous: Payload Mismatch
          </Link>
        </Col>
        <Col md={6}>
          <div className="text-end">
            <Link
              to="/actor-communication-errors/behavioural-type-error/unexpected-request"
              className="text-decoration-none"
            >
              Next: Behavioural Type Errors - Unexpected Request →
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default UnsupportedRequest;
