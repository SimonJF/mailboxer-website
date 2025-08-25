import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

// Footer component with navigation links and project description
function Footer() {
  return (
    <footer className="footer mt-auto py-4">
      <Container style={{ maxWidth: "1400px" }}>
        <Row>
          <Col>
            <div className="text-center">
              {/* Navigation links section */}
              <div className="mb-3">
                <Link
                  to="/about"
                  className="text-decoration-none fw-medium px-3"
                >
                  About
                </Link>
              </div>
              {/* Separator line styled via CSS */}
              <hr className="my-3" />
              {/* Project description and purpose */}
              <div className="text-muted small">
                <p className="mb-0">
                  Mailboxer - Academic tool for understanding and debugging
                  actor communication errors
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
