import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

function BehaviouralTypes() {
  useEffect(() => {
    document.title = 'Behavioural Types - Mailboxer';
  }, []);
  return (
    <Container fluid className="py-5" style={{ maxWidth: '1400px' }}>
      {/* Header Section */}
      <Row className="mb-5">
        <Col>
          <div className="text-center">
            <h1 className="display-4 text-center mb-4">
              Behavioural Types in Actor Languages
            </h1>
          </div>
        </Col>
      </Row>

      {/* Four Column Section */}
      <Row className="g-4 mb-5">
        {/* Background */}
        <Col lg={3} md={6} sm={12}>
          <div className="h-100">
            <h3 className="h5 fw-semibold mb-3 pb-2 border-bottom">
              Background
            </h3>
            <p className="mb-3">
              Actor languages use message passing for process communication. Traditional types describe data structure but not communication patterns.
            </p>
            <p>
              Behavioural types formally specify communication protocols, preventing deadlocks and protocol violations.
            </p>
          </div>
        </Col>

        {/* Data Types vs Behavioural Types */}
        <Col lg={3} md={6} sm={12}>
          <div className="h-100">
            <h3 className="h5 fw-semibold mb-3 pb-2 border-bottom">
              Data Types vs Behavioural Types
            </h3>
            <p className="mb-3">
              <strong>Data Types:</strong> Structure of values (int, string). Ensure data integrity.
            </p>
            <p className="mb-3">
              <strong>Behavioural Types:</strong> Message exchange sequences. Define communication protocols.
            </p>
            <p>
              Data types prevent payload errors. Behavioural types prevent protocol violations.
            </p>
          </div>
        </Col>

        {/* What are Behavioural Types? */}
        <Col lg={3} md={6} sm={12}>
          <div className="h-100">
            <h3 className="h5 fw-semibold mb-3 pb-2 border-bottom">
              What are Behavioural Types?
            </h3>
            <p className="mb-3">
              Formal specifications describing communication patterns between concurrent processes.
            </p>
            <p>
              Define valid interaction sequences and expected responses. Enforce protocols at compile-time or runtime to prevent communication errors.
            </p>
          </div>
        </Col>

        {/* Example */}
        <Col lg={3} md={6} sm={12}>
          <div className="h-100">
            <h3 className="h5 fw-semibold mb-3 pb-2 border-bottom">
              Example
            </h3>
            <p className="mb-3">
              ID server specification: <code>!init(int).(?get().!id(int))*</code>
            </p>
            <p>
              Meaning: Send init, then repeat (receive get, send id). Catches multiple inits or omitted responses.
            </p>
          </div>
        </Col>
      </Row>

      {/* Bottom Section - Relation to Erlang and Summary */}
      <Row>
        <Col>
          <div className="text-center">
            <h2 className="h4 fw-semibold mb-4">
              Relation to Erlang and Summary
            </h2>
            <div className="mx-auto" style={{ maxWidth: '600px' }}>
              <p className="mb-3" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                Erlang lacks built-in protocol compliance mechanisms, leading to communication bugs like deadlocks and resource leaks.
              </p>
              <p style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                Behavioural types provide formal protocol specifications, integrated via type checkers or runtime monitors. This enables early error detection and more reliable concurrent programs.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default BehaviouralTypes;
