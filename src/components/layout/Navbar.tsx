import { Navbar as BootstrapNavbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

// Main navigation bar with logo and menu links
function Navbar() {
  return (
    <BootstrapNavbar expand="lg" className="navbar">
      <Container>
        <div className="w-100 d-flex justify-content-center align-items-center">
          {/* Mailbox emoji linking to home page */}
          <Link
            to="/"
            className="me-4 text-decoration-none"
            style={{ fontSize: "2rem" }}
          >
            📬
          </Link>

          {/* Main navigation menu with all page links */}
          <Nav className="d-flex align-items-center">
            <Nav.Link
              as={Link}
              to="/"
              className="px-3 fw-medium text-uppercase"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/actor-communication-errors"
              className="px-3 fw-medium text-uppercase"
            >
              ACTOR COMMUNICATION ERRORS
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/behavioural-types"
              className="px-3 fw-medium text-uppercase"
            >
              Behavioural Types
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/mailboxer"
              className="px-3 fw-medium text-uppercase"
            >
              What is Mailboxer?
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/mailboxer-examples"
              className="px-3 fw-medium text-uppercase"
            >
              Mailboxer Examples
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/sandbox"
              className="px-3 fw-medium text-uppercase"
            >
              Mailboxer Sandbox
            </Nav.Link>
          </Nav>
        </div>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
