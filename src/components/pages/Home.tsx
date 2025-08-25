import { useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  useEffect(() => {
    document.title = 'Home - Mailboxer';
  }, []);
  return (
    <Container fluid className="py-5" style={{ maxWidth: '1400px' }}>
      {/* Header Section */}
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="display-5 mb-4 fw-bold">
              Programming with Mailbox Types
            </h1>
            <p className="lead">
              Prevent actor communication errors with behavioral type verification
            </p>
          </div>
        </Col>
      </Row>

      {/* Four Column Section */}
      <Row className="g-4">
        {/* Learn Actor Communication Errors */}
        <Col lg={3} md={6} sm={12}>
          <Card className="h-100 card">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="h6 fw-semibold mb-3">
                Learn Actor Communication Errors
              </Card.Title>
              <Card.Text>
                Discover the common communication errors that occur in actor-based systems like Erlang. Learn about message type errors and behavioral type violations that can cause deadlocks and system failures.
              </Card.Text>
              <Card.Text>
                Explore real examples of payload mismatches, unsupported requests, unexpected messages, and omitted replies through interactive code examples.
              </Card.Text>
              <div className="mt-auto text-center">
                <Link to="/actor-communication-errors" className="btn btn-outline-primary">
                  Learn More
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Learn Behavioural Types */}
        <Col lg={3} md={6} sm={12}>
          <Card className="h-100 card">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="h6 fw-semibold mb-3">
                Learn Behavioural Types
              </Card.Title>
              <Card.Text>
                Understand behavioral types - formal specifications that describe communication patterns between concurrent processes in actor systems.
              </Card.Text>
              <Card.Text>
                Learn how behavioral types differ from traditional data types and how they prevent protocol violations, deadlocks, and communication errors at compile-time.
              </Card.Text>
              <div className="mt-auto text-center">
                <Link to="/behavioural-types" className="btn btn-outline-primary">
                  Learn More
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Explore Mailboxer */}
        <Col lg={3} md={6} sm={12}>
          <Card className="h-100 card">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="h6 fw-semibold mb-3">
                Explore Mailboxer
              </Card.Title>
              <Card.Text>
                Discover Mailboxer - a runtime verification tool that integrates mailbox types with Erlang to prevent actor communication errors.
              </Card.Text>
              <Card.Text>
                Learn about the Pat language extension, mailbox type annotations, and how static analysis and runtime monitoring work together.
              </Card.Text>
              <div className="mt-auto text-center">
                <Link to="/mailboxer" className="btn btn-outline-primary">
                  Learn More
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Experiment in Sandbox */}
        <Col lg={3} md={6} sm={12}>
          <Card className="h-100 card">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="h6 fw-semibold mb-3">
                Experiment in Sandbox
              </Card.Title>
              <Card.Text>
                Try Mailboxer in an interactive sandbox environment. Write Pat code with mailbox type annotations and see real-time verification results.
              </Card.Text>
              <Card.Text>
                Experiment with different communication patterns, introduce errors, and learn how Mailboxer detects and reports protocol violations.
              </Card.Text>
              <div className="mt-auto text-center">
                <Link to="/sandbox" className="btn btn-outline-primary">
                  Try Sandbox
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;