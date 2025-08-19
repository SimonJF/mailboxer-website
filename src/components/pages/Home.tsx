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
              Understanding and Debugging Actor Communication Errors
            </h1>
            <p className="lead">
              Learn and explore Mailboxer
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id tristique nulla. Sed sit 
                amet libero diam. Donec dapibus condimentum est. Morbi vestibulum diam sit 
                amet erat vestibulum, sed porttitor velit consequat. Nunc eget est iaculis, hendrerit ex 
                nec, placerat sem. In commodo, eros in condimentum imperdiet, sapien orci rutrum 
                aliquam, vel cursus tortor vel nunc. Aliquam 
                tincidunt vel nulla ut volutpat. Vivamus 
                pellentesque nunc vel neque molestsuodo, et 
                dapibus lorem eleifend. Cras sodales lorem 
                libero, et dignissim sem convallis sed.
              </Card.Text>
              <Card.Text>
                Suspendisse egestas semper magna pharetra 
                placerat. Sed ullamcorper dolor pharetra velit 
                condimentum, euismod gravida lorem sodales.
              </Card.Text>
              <Card.Text>
                Praesent nec ipsum ac velit suscipit dignissim. 
                Suspendisse leo metus, venenatis ac maximus 
                sit amet, convallis id diam. Vestibulum blandit 
                ligula ipsum, eget rhoncus ex auctor sit amet. 
                Phasellus et pharetra nisl, eget tristique turpis. 
                Nam ut rutrum felis.
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
              <Card.Title className="h5 fw-semibold mb-3">
                Learn Behavioural Types
              </Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur 
                adipiscing elit. Etiam id tristique nulla. Sed sit 
                amet libero diam. Donec dapibus 
                condimentum est. Morbi vestibulum diam sit 
                amet erat vestibulum, sed porttitor velit 
                consequat. Nunc eget est iaculis, hendrerit ex 
                nec, placerat sem. In commodo, eros in 
                condimentum imperdiet, sapien orci rutrum 
                aliquam, vel cursus tortor vel nunc. Aliquam 
                tincidunt vel nulla ut volutpat. Vivamus 
                pellentesque nunc vel neque molestsuodo, et 
                dapibus lorem eleifend. Cras sodales lorem 
                libero, et dignissim sem convallis sed.
              </Card.Text>
              <Card.Text>
                Suspendisse egestas semper magna pharetra 
                placerat. Sed ullamcorper dolor pharetra velit 
                condimentum, euismod gravida lorem sodales.
              </Card.Text>
              <Card.Text>
                Praesent nec ipsum ac velit suscipit dignissim. 
                Suspendisse leo metus, venenatis ac maximus 
                sit amet, convallis id diam. Vestibulum blandit 
                ligula ipsum, eget rhoncus ex auctor sit amet. 
                Phasellus et pharetra nisl, eget tristique turpis. 
                Nam ut rutrum felis.
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
                Lorem ipsum dolor sit amet, consectetur 
                adipiscing elit. Etiam id tristique nulla. Sed sit 
                amet libero diam. Donec dapibus 
                condimentum est. Morbi vestibulum diam sit 
                amet erat vestibulum, sed porttitor velit 
                consequat. Nunc eget est iaculis, hendrerit ex 
                nec, placerat sem. In commodo, eros in 
                condimentum imperdiet, sapien orci rutrum 
                aliquam, vel cursus tortor vel nunc. Aliquam 
                tincidunt vel nulla ut volutpat. Vivamus 
                pellentesque nunc vel neque molestsuodo, et 
                dapibus lorem eleifend. Cras sodales lorem 
                libero, et dignissim sem convallis sed.
              </Card.Text>
              <Card.Text>
                Suspendisse egestas semper magna pharetra 
                placerat. Sed ullamcorper dolor pharetra velit 
                condimentum, euismod gravida lorem sodales.
              </Card.Text>
              <Card.Text>
                Praesent nec ipsum ac velit suscipit dignissim. 
                Suspendisse leo metus, venenatis ac maximus 
                sit amet, convallis id diam. Vestibulum blandit 
                ligula ipsum, eget rhoncus ex auctor sit amet. 
                Phasellus et pharetra nisl, eget tristique turpis. 
                Nam ut rutrum felis.
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
                Lorem ipsum dolor sit amet, consectetur 
                adipiscing elit. Etiam id tristique nulla. Sed sit 
                amet libero diam. Donec dapibus 
                condimentum est. Morbi vestibulum diam sit 
                amet erat vestibulum, sed porttitor velit 
                consequat. Nunc eget est iaculis, hendrerit ex 
                nec, placerat sem. In commodo, eros in 
                condimentum imperdiet, sapien orci rutrum 
                aliquam, vel cursus tortor vel nunc. Aliquam 
                tincidunt vel nulla ut volutpat. Vivamus 
                pellentesque nunc vel neque molestsuodo, et 
                dapibus lorem eleifend. Cras sodales lorem 
                libero, et dignissim sem convallis sed.
              </Card.Text>
              <Card.Text>
                Suspendisse egestas semper magna pharetra 
                placerat. Sed ullamcorper dolor pharetra velit 
                condimentum, euismod gravida lorem sodales.
              </Card.Text>
              <Card.Text>
                Praesent nec ipsum ac velit suscipit dignissim. 
                Suspendisse leo metus, venenatis ac maximus 
                sit amet, convallis id diam. Vestibulum blandit 
                ligula ipsum, eget rhoncus ex auctor sit amet. 
                Phasellus et pharetra nisl, eget tristique turpis. 
                Nam ut rutrum felis.
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