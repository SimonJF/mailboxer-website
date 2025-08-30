import hljs from 'highlight.js/lib/core';
import erlang from 'highlight.js/lib/languages/erlang';
import 'highlight.js/styles/github.css';
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

// Register the Erlang language
hljs.registerLanguage('erlang', erlang);

// Page explaining the unexpected request communication error with code examples
function UnexpectedRequest() {
  useEffect(() => {
    document.title = "Unexpected Request - Mailboxer";
    // Initialize syntax highlighting
    document.querySelectorAll('pre.code-block').forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, []);

  return (
    <Container className="py-5">
      {/* Page title and description of the error type */}
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 text-center mb-4">Unexpected Request</h1>
          <p className="lead text-center">
            Understanding behavioural type errors when requests arrive at the
            wrong time
          </p>
        </Col>
      </Row>

      {/* Code examples showing server and client with the protocol violation highlighted */}
      <Row className="mb-5">
        <Col>
          <h2 className="mb-4">Unexpected Request Example</h2>

          <Row className="mt-4">
            <Col md={6}>
              <h5 className="mb-2">Server</h5>
              <div className="code-pane position-relative">
                <pre className="code-block language-erlang">
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
  end.
  `}
                </pre>
              </div>
            </Col>

            <Col md={6}>
              <h5 className="mb-2">Client</h5>
              <div className="code-pane position-relative">
                <pre className="code-block language-erlang">
                  {`client() ->

  % Create server.
  Server = spawn {id_server, []},

  % Initialize server.
  Server ! {init, 5},
  Server ! {init, 5},

  Server ! {get, self},
  receive
    {id, Id} -> print Id
  end.`}
                </pre>
                <div className="unexpected-request-error-label">
                  <span className="bg-danger text-white px-2 py-1 small">
                    Extra init
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
          <h2 className="mb-4">What is an Unexpected Request?</h2>
          <p>
            The client sends a valid message at the wrong time in the protocol.
            Here, two <code>{`{init, 5}`}</code> messages violate the expected
            sequence (init → get → get...), causing the server to hit an error
            case.
          </p>

          <h3 className="mt-4 mb-3">Impact</h3>
          <ul>
            <li>Server crashes or enters error state</li>
            <li>Protocol corruption - communication flow becomes invalid</li>
            <li>Resource waste on invalid sequences</li>
            <li>Difficult debugging of protocol violations</li>
          </ul>
        </Col>
      </Row>

      {/* Navigation links to previous and next pages */}
      <Row>
        <Col md={6}>
          <Link
            to="/actor-communication-errors/message-type-error/unsupported-request"
            className="text-decoration-none"
          >
            ← Previous: Message Type Error - Unsupported Request
          </Link>
        </Col>
        <Col md={6}>
          <div className="text-end">
            <Link
              to="/actor-communication-errors/behavioural-type-error/omitted-reply"
              className="text-decoration-none"
            >
              Next: Omitted Reply →
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default UnexpectedRequest;
