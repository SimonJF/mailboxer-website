import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

// Page explaining what Mailboxer is and how it works with code examples
function Mailboxer() {
  useEffect(() => {
    document.title = "What is Mailboxer? - Mailboxer";
  }, []);
  return (
    <Container className="py-5 mailboxer-container">
      {/* Page title */}
      <Row className="mb-5">
        <Col>
          <h1 className="display-4 text-center mb-4">What is Mailboxer?</h1>
        </Col>
      </Row>

      {/* Main description of Mailboxer tool */}
      <Row className="mb-5">
        <Col>
          <p className="lead text-center">
            <strong>Mailboxer</strong> is a runtime verification tool for
            actor-based programs that integrates mailbox types with Erlang. It
            provides compile-time and runtime checking of communication
            protocols, preventing deadlocks, protocol violations, and message
            type mismatches.
          </p>
        </Col>
      </Row>

      {/* Code example showing annotated Erlang with mailbox types */}
      <Row className="mb-5">
        <Col>
          <h2 className="text-center h4 fw-semibold mb-4">
            Annotated ID Server and Client using Mailbox Types
          </h2>

          <div className="code-pane position-relative">
            <pre className="code-block mailboxer-code-block">
              <span className="syntax-comment">% MAILBOX TYPES</span>
              {`
`}
              <span className="syntax-type">
                -type init() :: {"{"}init, integer(){"}"}.
              </span>
              {`
`}
              <span className="syntax-type">
                -type get() :: {"{"}get, id_client_mb(){"}"}.
              </span>
              {`
`}
              <span className="syntax-type">
                -type id() :: {"{"}id, integer(){"}"}.
              </span>
              {`
`}
              <span className="syntax-type">
                -type id_server_mb() :: pid() | init() | get().
              </span>
              {`
`}
              <span className="syntax-type">
                -type id_client_mb() :: pid() | id().
              </span>
              {`
`}
              <span className="syntax-type">
                -new({"{"}id_server_mb, [id_server/0]{"}"}).
              </span>
              {`
`}
              <span className="syntax-type">
                -use({"{"}id_server_mb, [id_server_loop/1]{"}"}).
              </span>
              {`
`}
              <span className="syntax-type">
                -new({"{"}id_client_mb, [id_client/1]{"}"}).
              </span>
              {`

`}
              <span className="syntax-comment">% SERVER</span>
              {`
`}
              <span className="syntax-type">
                -spec id_server() -&gt; no_return().
              </span>
              {`
id_server() ->
  `}
              <span className="syntax-directive">
                ?expects(id_server_mb, "Init.*Get")
              </span>
              {`,
  receive
    {init, N} -> id_server_loop(N)
  end.

`}
              <span className="syntax-type">
                -spec id_server_loop(integer()) -&gt; no_return().
              </span>
              {`
id_server_loop(N) ->
  `}
              <span className="syntax-directive">?expects("*Get")</span>
              {`,
  receive
    {get, Client} ->
      Client ! {id, N},
      id_server_loop(N + 1)
  end.

`}
              <span className="syntax-comment">% CLIENT</span>
              {`
`}
              <span className="syntax-type">
                -spec id_client(id_server_mb()) -&gt; integer().
              </span>
              {`
id_client(Server) ->
  Self = self(),
  Server ! {get, Self},
  `}
              <span className="syntax-directive">
                ?expects(id_client_mb, "Id")
              </span>
              {`,
  receive
    {id, Id} -> Id
  end.

`}
              <span className="syntax-comment">% MAIN</span>
              {`
`}
              <span className="syntax-type">-spec main() -&gt; any().</span>
              {`
main() ->
  Server = spawn(?MODULE, id_server, []),
  Server ! {init, 5},
  Id = id_client(Server),
  format("Id: ~p~n", [Id]).`}
            </pre>
          </div>
        </Col>
      </Row>

      {/* Explanation of mailbox type syntax and capabilities */}
      <Row className="mb-5">
        <Col>
          <h2 className="h4 fw-semibold mb-3">Mailbox Types</h2>
          <p>
            Behavioral type specifications for message-passing protocols using
            regular expression syntax: <code>!msg(type)</code> (send),{" "}
            <code>?msg(type)</code> (receive), <code>*</code> (repetition),{" "}
            <code>.</code> (sequencing).
          </p>
          <p>
            <strong>Properties:</strong> Static protocol verification, deadlock
            detection, type safety, runtime compliance checking.
          </p>
        </Col>
      </Row>

      {/* Details about the Pat language extension for Erlang */}
      <Row className="mb-5">
        <Col>
          <h2 className="h4 fw-semibold mb-3">Pat Language Extension</h2>
          <p>
            Minimal Erlang extension with annotations: <code>-new</code> (type
            declaration), <code>-use</code> (type reference),{" "}
            <code>?expects(pattern)</code> (protocol assertion).
          </p>
          <p>
            <strong>Implementation:</strong> Source-to-source transformation,
            standard BEAM bytecode generation, OTP compatibility.
          </p>
        </Col>
      </Row>

      {/* Overview of static and runtime verification methods */}
      <Row className="mb-5">
        <Col>
          <h2 className="h4 fw-semibold mb-3">Verification Approach</h2>
          <p>
            <strong>Static Analysis:</strong> Compile-time protocol checking,
            type inference, deadlock detection.
          </p>
          <p>
            <strong>Runtime Monitoring:</strong> Dynamic compliance checking,
            violation reporting, minimal overhead.
          </p>
        </Col>
      </Row>

      {/* Next page navigation link */}
      <Row>
        <Col>
          <div className="text-end">
            <Link to="/mailboxer-examples" className="text-decoration-none">
              Next: Mailboxer Examples
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Mailboxer;
