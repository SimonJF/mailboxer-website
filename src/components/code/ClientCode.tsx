interface ClientCodeProps {
  showAnnotation?: boolean;
  annotationText?: string;
  annotationPosition?: { top: string; right: string };
  initValue?: string | number;
  messageType?: string;
}

function ClientCode({ 
  showAnnotation = false, 
  annotationText = "", 
  annotationPosition = { top: '110px', right: '10px' },
  initValue = 5,
  messageType = "get"
}: ClientCodeProps) {
  return (
    <div className="code-pane position-relative">
      <pre className="code-block">
{`client() ->

  % Create server.
  Server = spawn {id_server, []},

  % Initialize server.
  Server ! {init, ${typeof initValue === 'string' ? `"${initValue}"` : initValue}},

  Server ! {${messageType}, self},
  receive
    {id, Id} -> print Id
  end.`}
      </pre>
      {showAnnotation && (
        <div className="position-absolute" style={{ top: annotationPosition.top, right: annotationPosition.right }}>
          <span className="bg-danger text-white px-2 py-1 small">{annotationText}</span>
        </div>
      )}
    </div>
  );
}

export default ClientCode;
