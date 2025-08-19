import { Button, Col, Container, Dropdown, Form, Row } from 'react-bootstrap';

function Sandbox() {
  return (
    <Container className="py-5" style={{ maxWidth: "1400px" }}>
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="display-4 text-center mb-4">Mailboxer Sandbox</h1>
        </Col>
      </Row>

      {/* Controls */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex gap-3 align-items-center">
            <Button variant="primary" size="sm">
              Run
            </Button>
            <Button variant="outline-secondary" size="sm">
              Reset
            </Button>
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" size="sm">
                Load Examples
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Example 1</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Example 2</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Example 3</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Col>
      </Row>

      {/* Main Content Area */}
      <Row className="mb-4">
        {/* Code Input */}
        <Col md={6}>
          <Form.Control
            as="textarea"
            defaultValue={`-new id_server.
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
  end.

-new id_client.
-spec client() → unit.
client() →
  Server = spawn {id_server, []},
  
  Server ! {init, 5},
  Server ! {get, self},
  assert("id"),
  receive
    {id, Id} → print Id
  end.`}
            className="font-monospace border-2 rounded"
            style={{ fontSize: '14px', height: '500px', resize: 'none', overflow: 'auto' }}
          />
        </Col>

        {/* Output */}
        <Col md={6}>
          <div className="bg-light border-2 rounded p-3 font-monospace text-muted h-100" 
               style={{ height: '500px', fontSize: '14px' }}>
            mailboxer output here
          </div>
        </Col>
      </Row>

      {/* Right Side Instruction Text */}
      <Row>
        <Col md={6}>
          {/* Empty space to align with left column */}
        </Col>
        <Col md={6}>
          <div className="text-muted small">
            when specific example loaded, show here how to annotate with mailbox types - some stuff pre-annotated
          </div>
        </Col>
      </Row>

      {/* Bottom Note */}
      <Row className="mt-4">
        <Col>
          <p className="text-muted small">
            This is a sandboxed environment. No installation required!
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Sandbox;
