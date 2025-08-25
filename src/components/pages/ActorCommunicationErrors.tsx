import { useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function ActorCommunicationErrors() {
  useEffect(() => {
    document.title = 'Actor Communication Errors - Mailboxer';
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

      {/* Code Section - Split Pane */}
      <Row className="mb-5">
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
  Server ! {init, 5},

  Server ! {get, self},
  receive
    {id, Id} -> print Id
  end.`}
            </pre>
          </div>
        </Col>
      </Row>

      {/* Visual Representation */}
      <Row className="mb-4">
        <Col className="text-center">
          <img 
            src="/src/assets/id_server.webp" 
            alt="ID Server Visual Representation" 
            className="img-fluid"
            style={{ maxHeight: '400px' }}
          />
        </Col>
      </Row>

      <Row className="mb-5">
        <Col>
          <h2 className="mb-4">How the ID Server Works</h2>
          <p className="mb-3">
            The ID server demonstrates a simple request-response protocol in Erlang. The client spawns a server, 
            initializes it with a starting number, then requests unique IDs. Each request increments the counter.
          </p>
          
          <h3 className="mb-3">Two Types of Communication Errors</h3>
          <p className="mb-3">
            <strong>Message Type Errors:</strong> Wrong message format or payload type (e.g., sending string instead of integer).
          </p>
          <p>
            <strong>Behavioural Type Errors:</strong> Correct message at wrong time in protocol (e.g., multiple init calls or missing responses).
          </p>
        </Col>
      </Row>

      {/* Two Column Section */}
      <Row className="mb-5">
        <Col md={6}>
          <div className="pe-3">
            <h3 className="text-center mb-3">Message Type Errors</h3>
            <p className="text-center mb-4">
              Errors that occur when message structure or payload types don't match expectations
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
          <div className="ps-3 border-start">
            <h3 className="text-center mb-3">Behavioural Type Errors</h3>
            <p className="text-center mb-4">
              Errors that occur when messages arrive at inappropriate times in the protocol
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

      {/* Navigation */}
      <Row>
        <Col>
          <div className="text-end">
            <Link to="/mailboxer" className="text-decoration-none">
              Next: Intro to Mailboxer
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ActorCommunicationErrors;
