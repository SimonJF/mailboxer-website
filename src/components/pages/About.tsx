import { Col, Container, Row } from "react-bootstrap";

// About page component with project description and resources
function About() {
  return (
    <Container className="py-5">
      {/* Page title */}
      <Row>
        <Col>
          <h1 className="display-4 text-center mb-4">About Mailboxer</h1>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8}>
          {/* Main project description */}
          <p className="lead mb-4">
            Mailboxer is a static analysis tool for early detection of Erlang
            communication errors. It uses mailbox types to identify potential
            communication mismatches between actors before runtime, helping
            developers build more reliable distributed systems.
          </p>

          {/* STARDUST project context and technical approach */}
          <p className="mb-4">
            Developed as part of the STARDUST project, Mailboxer addresses the
            challenge of ensuring reliability in distributed software systems.
            The tool combines session types with actor-based programming to
            provide lightweight support for developers, warning of potential
            communication issues while allowing the use of established Erlang
            idioms.
          </p>

          {/* Project objectives and methodology */}
          <p className="mb-4">
            The STARDUST project focuses on session types for reliable
            distributed systems, combining fault prevention with fault
            tolerance. The key objective is to merge communication-structuring
            mechanisms of session types with the scalability and fault-tolerance
            of actor-based software architectures.
          </p>

          {/* Author and project attribution */}
          <div className="text-center mb-4">
            <p>
              <strong>
                Zubair Khalid | University of Glasgow | Made for MSc Computer
                Science Project
              </strong>
            </p>
          </div>

          {/* Academic research papers and project links */}
          <div className="text-center mb-4">
            <h6 className="mb-3">Academic Resources</h6>
            <div className="mb-3">
              <a
                href="https://simonjf.com/writing/pat.pdf"
                className="me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pat Paper
              </a>
              <span className="me-3">|</span>
              <a
                href="https://epsrc-stardust.github.io/"
                className="me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                STARDUST Project
              </a>
              <span className="me-3">|</span>
              <a
                href="https://epsrc-stardust.github.io/#publications"
                className="me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                All Papers
              </a>
            </div>
          </div>

          {/* GitHub repositories and source code links */}
          <div className="text-center mb-4">
            <h6 className="mb-3">Source Code & Tools</h6>
            <div className="mb-3">
              <a
                href="https://github.com/duncanatt/paterl"
                className="me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Original Mailboxer
              </a>
              <span className="me-3">|</span>
              <a
                href="https://github.com/ZubyWasTaken/paterl"
                className="me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dockerized Mailboxer
              </a>
              <span className="me-3">|</span>
              <a
                href="https://github.com/ZubyWasTaken/mailboxer-website"
                className="me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Website Source
              </a>
            </div>
          </div>

          {/* Docker Hub images for local deployment */}
          <div className="text-center mb-5">
            <h6 className="mb-3">Docker Images - Run Locally</h6>
            <div className="mb-3">
              <a
                href="https://hub.docker.com/repository/docker/zubywastaken/paterl/general"
                className="me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mailboxer Docker
              </a>
              <span className="me-3">|</span>
              <a
                href="https://hub.docker.com/repository/docker/zubywastaken/mailboxer-website/general"
                className="me-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mailboxer Website Docker
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
