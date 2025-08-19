import { Col, Container, Row } from "react-bootstrap";

function Mailboxer() {
  return (
    <Container className="py-5" style={{ maxWidth: "1200px" }}>
      {/* Header */}
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 text-center mb-4">What is Mailboxer?</h1>
        </Col>
      </Row>

      {/* Intro and Diagram Section */}
      <Row className="mb-5">
        <Col md={6}>
          <h3 className="h6 fw-semibold mb-3">Intro paragraph</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id
            tristique nulla. Sed sit amet libero diam. Donec dapibus condimentum
            est. Morbi vestibulum diam sit amet erat vestibulum, sed porttitor
            velit consequat. Nunc eget est iaculis, hendrerit ex nec, placerat
            sem.
          </p>
        </Col>
        <Col md={6}>
          <div className="text-center p-4 border rounded bg-light">
            <p className="text-muted mb-0">
              (Some sort of diagram showing
              <br />
              Mailboxer and how it fits in the Actor
              <br />
              model workflow)
            </p>
          </div>
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
                <pre className="code-block">
                  {`-new id_server.
-spec id_server() → unit.
id_server() →
  assert("init.get*"),
  receive
    {init, N} → id_server_loop(N)
  end.

-use id_server.
-spec id_server_loop(int) → unit.
id_server_loop(N) →
  assert("get*"),
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
                <pre className="code-block">
                  {`-new id_client.
-spec client() → unit.
client() →
  Server = spawn {id_server, []},
  
  Server ! {init, 5},
  Server ! {get, self},
  assert("id"),
  receive
    {id, Id} → print Id
  end.`}
                </pre>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Key Features Section */}
      <Row>
        <Col>
          <h3 className="h5 fw-semibold mb-3">Key Features</h3>
          <ul className="list-unstyled">
            <li className="mb-2">- Talk about mailbox types</li>
            <li className="mb-2">- Talk about base type support</li>
            <li className="mb-2">- Talk about useable vs returnable types</li>
            <li className="mb-2">
              - Talk about basic language features of Pat and how it works with
              Erlang
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Mailboxer;
