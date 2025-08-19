import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ClientCode from "../code/ClientCode";
import IDServerCode from "../code/IDServerCode";

function ActorCommunicationErrors() {
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
          <IDServerCode />
        </Col>

        <Col md={6}>
          <h5 className="mb-2">Client</h5>
          <ClientCode />
        </Col>
      </Row>
      <br />
      <p>
        Insert explanation here about the code above, and how it works normally
        and mention how the two types of communication errors are different -
        dont go into full detail just high level overview. Learn more is to go
        into the next page.
      </p>

      {/* Two Column Section */}
      <Row className="mb-5">
        <Col md={6}>
          <div className="pe-3">
            <h3 className="text-center mb-3">Message Type Errors</h3>

            <div className="text-center mt-4">
              <Link
                to="/actor-communication-errors/message-type-errors"
                className="btn btn-outline-primary"
              >
                Learn More
              </Link>
            </div>
          </div>
        </Col>

        <Col md={6}>
          <div className="ps-3 border-start">
            <h3 className="text-center mb-3">Behavioural Type Errors</h3>
            <div className="text-center mt-4">
              <Link
                to="/actor-communication-errors/behavioural-type-errors"
                className="btn btn-outline-primary"
              >
                Learn More
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
