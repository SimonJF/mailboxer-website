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
            <div className="dropdown px-3">
              <Link 
                to="/actor-communication-errors" 
                className="nav-link fw-medium text-uppercase text-decoration-none dropdown-toggle-custom"
              >
                ACTOR COMMUNICATION ERRORS
              </Link>
              <div className="dropdown-menu">
                <Link to="/actor-communication-errors/message-type-errors" className="dropdown-item">
                  Message Type Errors
                </Link>
                <Link to="/actor-communication-errors/behavioural-type-errors" className="dropdown-item">
                  Behavioural Type Errors
                </Link>
              </div>
            </div>
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
