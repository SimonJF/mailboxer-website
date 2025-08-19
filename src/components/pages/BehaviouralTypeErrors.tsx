import { useEffect } from 'react';
import { Col, Container, Row } from "react-bootstrap";

function BehaviouralTypeErrors() {
  useEffect(() => {
    document.title = 'Behavioural Type Errors - Mailboxer';
  }, []);
  return (
    <Container className="py-5">
      {/* Header */}
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 text-center mb-4">Behavioural Type Errors</h1>
        </Col>
      </Row>

      {/* Normal Working Code Example */}
      <Row className="mb-5">
        <Col>
          <h2 className="mb-4">Normal Working Code</h2>

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
  Server ! {init, 5},

  Server ! {get, self},
  receive
    {id, Id} -> print Id
  end.`}
                </pre>
              </div>
            </Col>
          </Row>
          <br />
          <p>
            This shows the normal working interaction between client and server,
            where the client sends a proper request and receives the expected response.
          </p>
        </Col>
      </Row>

      {/* Unexpected Request Section */}
      <Row className="mb-5">
        <Col>
          <h2 className="mb-4">Unexpected Request</h2>

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
  Server ! {init, 5},
  Server ! {init, 5},

  Server ! {get, self},
  receive
    {id, Id} -> print Id
  end.`}
                </pre>
                <div className="position-absolute" style={{ top: "140px", right: "390px" }}>
                  <span className="bg-danger text-white px-2 py-1 small">Extra init</span>
                </div>
              </div>
            </Col>
          </Row>
          <br />
          <p>
            Talk about and explain the code above, and what an unexpected
            request is.
          </p>
        </Col>
      </Row>

      {/* Omitted Reply Section */}
      <Row className="mb-5">
        <Col>
          <h2 className="mb-4">Omitted Reply</h2>

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
                <div className="position-absolute" style={{ top: "150px", right: "370px" }}>
                  <span className="bg-danger text-white px-2 py-1 small">Omitted id</span>
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
          <br />
          <p>
            Talk about and explain the code above, and what an omitted
            reply is.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default BehaviouralTypeErrors;
