import hljs from 'highlight.js/lib/core';
import erlang from 'highlight.js/lib/languages/erlang';
import 'highlight.js/styles/github.css';
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

// Register the Erlang language
hljs.registerLanguage('erlang', erlang);

// Page explaining actor communication errors with code examples
function ActorCommunicationErrors() {
  useEffect(() => {
    document.title = "Actor Communication Errors - Mailboxer";
    // Initialize syntax highlighting
    document.querySelectorAll('pre.code-block').forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }, []);
  return (
    <Container className="py-5">
      {/* Header */}
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 text-center mb-4">
            Communication Errors in Actor Languages (Erlang)
          </h1>
        </Col>
      </Row>

      {/* Code examples showing server and client implementation */}
      <Row className="mb-5">
        <Col>
          <Row className="mb-4">
            <Col md={6}>
              <h3 className="h5 fw-semibold mb-4">Server Implementation</h3>
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
  end.`}
                </pre>
              </div>
            </Col>

            <Col md={6}>
              <h3 className="h5 fw-semibold mb-4">Client Implementation</h3>
              <div className="code-pane position-relative">
                <pre className="code-block language-erlang">
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

      {/* Visual diagram showing the ID server communication flow */}
      <Row className="mb-4">
        <Col className="text-center">
          <img
            src={`${import.meta.env.BASE_URL}id_server.webp`}
            alt="ID Server Visual Representation"
            className="img-fluid"
            style={{ maxHeight: "400px" }}
          />
        </Col>
      </Row>

      {/* Explanation of the ID server protocol and error types */}
      <Row className="mb-5">
        <Col>
          <h2 className="mb-4">How the ID Server Works</h2>
          <p className="mb-3">
            The ID server demonstrates a simple request-response protocol in
            Erlang. The client spawns a server, initializes it with a starting
            number, then requests unique IDs. Each request increments the
            counter.
          </p>

          <h3 className="mb-3">Two Types of Communication Errors</h3>
          <p className="mb-3">
            <strong>Message Type Errors:</strong> Wrong message tag or payload type. Errors that occur when message structure or payload types don't match the declared type.
          </p>
          <p>
            <strong>Behavioural Type Errors:</strong> Errors that occur when a sequence of messages don't conform to the protocol.
          </p>
        </Col>
      </Row>

            {/* Navigation to specific error type examples */}
      <Row className="mb-5">
        <Col md={6}>
          <div className="pe-md-3">
            <h3 className="text-center mb-3">Message Type Errors</h3>
            <p className="text-center mb-4 error-type-description">
              Errors that occur when message structure or payload types don't match the declared type
            </p>

            <div className="d-flex flex-column gap-2">
              <Link
                to="/actor-communication-errors/message-type-error/payload-mismatch"
                className="btn btn-outline-primary"
                >
                Payload Mismatch
              </Link>
              <Link
                to="/actor-communication-errors/message-type-error/unsupported-request"
                className="btn btn-outline-primary"
                >
                Unsupported Request
              </Link>
            </div>
          </div>
        </Col>

        <Col md={6}>
          <div className="behavioural-type-section">
            <h3 className="text-center mb-3">Behavioural Type Errors</h3>
            <p className="text-center mb-4 error-type-description">
              Errors that occur when a sequence of messages don't conform to the protocol
            </p>

            <div className="d-flex flex-column gap-2">
              <Link
                to="/actor-communication-errors/behavioural-type-error/unexpected-request"
                className="btn btn-outline-primary"
                >
                Unexpected Request
              </Link>
              <Link
                to="/actor-communication-errors/behavioural-type-error/omitted-reply"
                className="btn btn-outline-primary"
                >
                Omitted Reply
              </Link>
            </div>
          </div>
        </Col>
      </Row>

      {/* Next page navigation link */}
      <Row>
        <Col>
          <div className="text-end">
            <Link to="/behavioural-types" className="text-decoration-none">
              Next: Behavioural Types
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ActorCommunicationErrors;
