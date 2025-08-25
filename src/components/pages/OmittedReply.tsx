import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

// Page explaining the omitted reply communication error with code examples
function OmittedReply() {
  useEffect(() => {
    document.title = "Omitted Reply - Mailboxer";
  }, []);

  return (
    <Container className="py-5">
      {/* Page title and description of the error type */}
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 text-center mb-4">Omitted Reply</h1>
          <p className="lead text-center">
            Understanding behavioural type errors when expected responses are
            not sent
          </p>
        </Col>
      </Row>

      {/* Code examples showing server and client with the error highlighted */}
      <Row className="mb-5">
        <Col>
          <h2 className="mb-4">Omitted Reply Example</h2>

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

      id_server_loop(N + 1);
    {init, _} -> error
  end.`}
                </pre>
                <div className="omitted-reply-error-label">
                  <span className="bg-danger text-white px-2 py-1 small">
                    Omitted id
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

  Server ! {get, self},
  receive
    {id, Id} -> print Id
  end.`}
                </pre>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Explanation of the error and its consequences */}
      <Row className="mb-5">
        <Col>
          <h2 className="mb-4">What is an Omitted Reply?</h2>
          <p>
            The server processes a request but fails to send the expected
            response. Here, the server omits sending <code>{`{id, N}`}</code>,
            leaving the client blocked indefinitely waiting for a response.
          </p>

          <h3 className="mt-4 mb-3">Impact</h3>
          <ul>
            <li>Client deadlock - waits forever for responses</li>
            <li>Resource leaks from blocked processes</li>
            <li>System degradation from accumulating blocked processes</li>
            <li>Cascading failures affecting dependent processes</li>
          </ul>
        </Col>
      </Row>

      {/* Navigation links to previous and next pages */}
      <Row>
        <Col md={6}>
          <Link
            to="/actor-communication-errors/behavioural-type-error/unexpected-request"
            className="text-decoration-none"
          >
            ← Previous: Unexpected Request
          </Link>
        </Col>
        <Col md={6}>
          <div className="text-end">
            <Link to="/mailboxer" className="text-decoration-none">
              Next: Intro to Mailboxer →
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default OmittedReply;
