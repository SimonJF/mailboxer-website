import { Navbar as BootstrapNavbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <BootstrapNavbar expand="lg" className="navbar">
      <Container>
        <BootstrapNavbar.Brand
          as={Link}
          to="."
          className="d-flex align-items-center"
        >
          <img
            src={`${import.meta.env.BASE_URL}mailboxer_logo.svg`}
            alt="Mailboxer Logo"
            className="navbar-logo me-2"
          />
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle
          aria-controls="basic-navbar-nav"
          className="border-0"
        />

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="."
              className="px-3 fw-medium text-uppercase"
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="actor-communication-errors"
              className="px-3 fw-medium text-uppercase"
            >
              <span className="d-none d-lg-inline">
                Actor Communication Errors
              </span>
              <span className="d-lg-none">Actor Communication Errors</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="behavioural-types"
              className="px-3 fw-medium text-uppercase"
            >
              Behavioural Types
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="mailboxer"
              className="px-3 fw-medium text-uppercase"
            >
              <span className="d-none d-lg-inline">What is Mailboxer?</span>
              <span className="d-lg-none">What is Mailboxer?</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="mailboxer-examples"
              className="px-3 fw-medium text-uppercase"
            >
              <span className="d-none d-lg-inline">Mailboxer Examples</span>
              <span className="d-lg-none">Mailboxer Examples</span>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="sandbox"
              className="px-3 fw-medium text-uppercase"
            >
              <span className="d-none d-lg-inline">Mailboxer Sandbox</span>
              <span className="d-lg-none">Mailboxer Sandbox</span>
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
export default Navbar;
