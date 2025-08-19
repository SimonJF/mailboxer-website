import { Col, Container, Row } from 'react-bootstrap';

function About() {
  return (
    <Container className="py-5">
      <Row>
        <Col>
          <h1 className="display-4 text-center mb-4">About Mailboxer</h1>
          {/* <p className="lead text-center">Learn more about Mailboxer and our research.</p> */}
        </Col>
      </Row>
    </Container>
  );
}

export default About;
