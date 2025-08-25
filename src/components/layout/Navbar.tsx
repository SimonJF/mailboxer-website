import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <BootstrapNavbar expand="lg" className="navbar">
      <Container>
        <div className="w-100 d-flex justify-content-center align-items-center">
          {/* Logo/Brand - just emoji linking to home */}
          <Link to="/" className="me-4 text-decoration-none" style={{ fontSize: '2rem' }}>
            📬
          </Link>
          
          {/* Centered Navigation Links */}
          <Nav className="d-flex align-items-center">
            <Nav.Link as={Link} to="/" className="px-3 fw-medium text-uppercase">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/actor-communication-errors" className="px-3 fw-medium text-uppercase">
              ACTOR COMMUNICATION ERRORS
            </Nav.Link>
            <Nav.Link as={Link} to="/behavioural-types" className="px-3 fw-medium text-uppercase">
              Behavioural Types
            </Nav.Link>
            <Nav.Link as={Link} to="/mailboxer" className="px-3 fw-medium text-uppercase">
              Intro to Mailboxer
            </Nav.Link>
            <Nav.Link as={Link} to="/mailboxer-examples" className="px-3 fw-medium text-uppercase">
              Examples
            </Nav.Link>
            <Nav.Link as={Link} to="/sandbox" className="px-3 fw-medium text-uppercase">
              Sandbox
            </Nav.Link>
          </Nav>
        </div>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
