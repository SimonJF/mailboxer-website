import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { highlightErlangCode, initErlangSyntax } from '../../config/erlangSyntax';

// Initialize Erlang syntax highlighting
initErlangSyntax();
// Page explaining what Mailboxer is and how it works with code examples
function Mailboxer() {
  useEffect(() => {
    document.title = "What is Mailboxer? - Mailboxer";
    // Initialize syntax highlighting
    highlightErlangCode();
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
            <strong>Mailboxer</strong> is a static (compile-time) verification
            tool for actor-based programs that integrates mailbox types with
            Erlang. It provides compile-time checking of communication
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
            <pre><code className="language-erlang">{`% ID SERVER EXAMPLE WITH MAILBOX TYPES

-type init() :: {init, integer()}.
-type get() :: {get, id_client_mb()}.
-type id() :: {id, integer()}.
-type id_server_mb() :: pid() | init() | get().
-type id_client_mb() :: pid() | id().

-new({id_server_mb, [id_server/0]}).
-use({id_server_mb, [id_server_loop/1]}).
-new({id_client_mb, [id_client/1]}).

% SERVER
-spec id_server() -> no_return().
id_server() ->
  % Mailbox type
  ?expects(id_server_mb, "Init.*Get"),
  receive
    {init, N} -> id_server_loop(N)
  end.

-spec id_server_loop(integer()) -> no_return().
id_server_loop(N) ->
  % Mailbox type
  ?expects("*Get"),
  receive
    {get, Client} ->
      Client ! {id, N},
      id_server_loop(N + 1)
  end.

% CLIENT
-spec id_client(id_server_mb()) -> integer().
id_client(Server) ->
  Self = self(),
  Server ! {get, Self},
  % Mailbox type
  ?expects(id_client_mb, "Id"),
  receive
    {id, Id} -> Id
  end.

% MAIN
-spec main() -> any().
main() ->
  Server = spawn(?MODULE, id_server, []),
  Server ! {init, 5},
  Id = id_client(Server),
  format("Id: ~p~n", [Id]).`}
            </code></pre>
          </div>
        </Col>
      </Row>

      {/* Explanation of mailbox type syntax and capabilities */}
      <Row className="mb-5">
        <Col>
          <h2 className="h4 fw-semibold mb-3">Mailbox Types</h2>
          <p>
            Mailbox types are a novel behavioural type system for mailboxes,
            first introduced by de'Liguoro and Padovani in 2018 [1]. These types
            capture mailbox contents as a commutative regular expression,
            providing a formal way to specify and verify communication protocols
            in actor-based systems [2].
          </p>
          <p>
            <strong>Properties:</strong> Static protocol verification, deadlock
            detection, type safety, compile-time compliance checking.
          </p>
          
          <h4 className="mt-4 mb-3">Mailbox Type Definition</h4>
          <p>
            A mailbox type defines the sequence and pattern of messages that can be in an actor's mailbox at any given time. For example:
          </p>
          <p>
            First, we define message structures with <code>{`-type id_server_mb() :: pid() | init() | get().`}</code>.
          </p>
          <p>
            Then we declare a new mailbox with <code>{`-new({id_server_mb, [id_server/0]})`}</code>.
          </p>
          <p>
            The actual <strong>mailbox type</strong> is specified using <code>{`?expects(id_server_mb, "Init.*Get")`}</code>, which enforces the protocol pattern.
          </p>
          <p>
            This mailbox type ensures the ID server can only receive <code>init</code> messages followed by any number of <code>get</code> messages, preventing protocol violations.
          </p>
          <p className="mt-3">
            <strong>References:</strong>
            <br />
            [1]{" "}
            <a
              href="https://arxiv.org/pdf/1801.04167"
              target="_blank"
              rel="noopener noreferrer"
            >
              de'Liguoro and Padovani (2018) - Mailbox Types for Unordered
              Interactions
            </a>
            <br />
            [2]{" "}
            <a
              href="https://simonjf.com/writing/pat.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fowler et al. (2023) - Special Delivery: Programming with Mailbox
              Types
            </a>
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
