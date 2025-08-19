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
            <h1 className="display-5 mb-4 fw-bold">
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
              Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Etiam id tristique nulla. Sed sit amet libero diam.
              Donec dapibus condimentum est. Morbi vestibulum
              diam sit amet erat vestibulum, sed porttitor velit
              consequat. Nunc eget est iaculis, hendrerit ex nec,
              placerat sem. In commodo, eros in condimentum
              imperdiet, sapien orci rutrum elit, nec auctor velit tortor
              vel nunc. Aliquam tincidunt vel nulla ut volutpat.
              Vivamus pellentesque nunc vel neque molestsuodo, et
              dapibus lorem eleifend. Cras sodales lorem libero, et
              dignissim sem convallis sed.
            </p>
            <p className="mb-3">
              Suspendisse egestas semper magna pharetra placerat. Sed ullamcorper
              dolor pharetra velit condimentum, euismod gravida
              lorem sodales.
            </p>
            <p>
              Praesent nec ipsum ac velit suscipit dignissim.
              Suspendisse leo metus, venenatis ac maximus sit amet,
              convallis id diam. Vestibulum blandit ligula ipsum, eget
              rhoncus ex auctor sit amet. Phasellus et pharetra nisl,
              eget tristique turpis. Nam ut rutrum felis.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Etiam id tristique nulla. Sed sit amet libero diam.
              Donec dapibus condimentum est. Morbi vestibulum
              diam sit amet erat vestibulum, sed porttitor velit
              consequat. Nunc eget est iaculis, hendrerit ex nec,
              placerat sem. In commodo, eros in condimentum
              imperdiet, sapien orci rutrum elit, nec auctor velit tortor
              vel nunc. Aliquam tincidunt vel nulla ut volutpat.
              Vivamus pellentesque nunc vel neque molestsuodo, et
              dapibus lorem eleifend. Cras sodales lorem libero, et
              dignissim sem convallis sed.
            </p>
            <p className="mb-3">
              Suspendisse egestas semper magna pharetra placerat. Sed ullamcorper
              dolor pharetra velit condimentum, euismod gravida
              lorem sodales.
            </p>
            <p>
              Praesent nec ipsum ac velit suscipit dignissim.
              Suspendisse leo metus, venenatis ac maximus sit amet,
              convallis id diam. Vestibulum blandit ligula ipsum, eget
              rhoncus ex auctor sit amet. Phasellus et pharetra nisl,
              eget tristique turpis. Nam ut rutrum felis.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Etiam id tristique nulla. Sed sit amet libero diam.
              Donec dapibus condimentum est. Morbi vestibulum
              diam sit amet erat vestibulum, sed porttitor velit
              consequat. Nunc eget est iaculis, hendrerit ex nec,
              placerat sem. In commodo, eros in condimentum
              imperdiet, sapien orci rutrum elit, nec auctor velit tortor
              vel nunc. Aliquam tincidunt vel nulla ut volutpat.
              Vivamus pellentesque nunc vel neque molestsuodo, et
              dapibus lorem eleifend. Cras sodales lorem libero, et
              dignissim sem convallis sed.
            </p>
            <p className="mb-3">
              Suspendisse egestas semper magna pharetra placerat. Sed ullamcorper
              dolor pharetra velit condimentum, euismod gravida
              lorem sodales.
            </p>
            <p>
              Praesent nec ipsum ac velit suscipit dignissim.
              Suspendisse leo metus, venenatis ac maximus sit amet,
              convallis id diam. Vestibulum blandit ligula ipsum, eget
              rhoncus ex auctor sit amet. Phasellus et pharetra nisl,
              eget tristique turpis. Nam ut rutrum felis.
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
              Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Etiam id tristique nulla. Sed sit amet libero diam.
              Donec dapibus condimentum est. Morbi vestibulum
              diam sit amet erat vestibulum, sed porttitor velit
              consequat. Nunc eget est iaculis, hendrerit ex nec,
              placerat sem. In commodo, eros in condimentum
              imperdiet, sapien orci rutrum elit, nec auctor velit tortor
              vel nunc. Aliquam tincidunt vel nulla ut volutpat.
              Vivamus pellentesque nunc vel neque molestsuodo, et
              dapibus lorem eleifend. Cras sodales lorem libero, et
              dignissim sem convallis sed.
            </p>
            <p className="mb-3">
              Suspendisse egestas semper magna pharetra placerat. Sed ullamcorper
              dolor pharetra velit condimentum, euismod gravida
              lorem sodales.
            </p>
            <p>
              Praesent nec ipsum ac velit suscipit dignissim.
              Suspendisse leo metus, venenatis ac maximus sit amet,
              convallis id diam. Vestibulum blandit ligula ipsum, eget
              rhoncus ex auctor sit amet. Phasellus et pharetra nisl,
              eget tristique turpis. Nam ut rutrum felis.
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
            <div className="mx-auto" style={{ maxWidth: '800px' }}>
              <p className="mb-3" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id tristique nulla. Sed sit amet libero diam. Donec dapibus condimentum est. Morbi vestibulum diam sit amet erat vestibulum, sed porttitor velit consequat. Nunc eget est iaculis, hendrerit ex nec, placerat sem. In commodo, eros in condimentum imperdiet, sapien orci rutrum elit, nec auctor velit tortor vel nunc. Aliquam tincidunt vel nulla ut volutpat. Vivamus pellentesque nunc vel neque molestsuodo, et dapibus lorem eleifend. Cras sodales lorem libero, et dignissim sem convallis sed. Suspendisse egestas semper magna pharetra placerat. Sed ullamcorper dolor pharetra velit condimentum, euismod gravida lorem sodales.
              </p>
              <p className="mb-3" style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                Praesent nec ipsum ac velit suscipit dignissim. Suspendisse leo metus, venenatis ac maximus sit amet, convallis id diam. Vestibulum blandit ligula ipsum, eget rhoncus ex auctor sit amet. Phasellus et pharetra nisl, eget tristique turpis. Nam ut rutrum felis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam id tristique nulla. Sed sit amet libero diam. Donec dapibus condimentum est. Morbi vestibulum diam sit amet erat vestibulum, sed porttitor velit consequat.
              </p>
              <p style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>
                Nunc eget est iaculis, hendrerit ex nec, placerat sem. In commodo, eros in condimentum imperdiet, sapien orci rutrum elit, nec auctor velit tortor vel nunc. Aliquam tincidunt vel nulla ut volutpat. Vivamus pellentesque nunc vel neque molestsuodo, et dapibus lorem eleifend. Cras sodales lorem libero, et dignissim sem convallis sed. Suspendisse egestas semper magna pharetra placerat.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default BehaviouralTypes;
