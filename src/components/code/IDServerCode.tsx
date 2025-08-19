interface IDServerCodeProps {
  showAnnotation?: boolean;
  annotationText?: string;
  annotationPosition?: { top: string; right: string };
}

function IDServerCode({ showAnnotation = false, annotationText = "", annotationPosition = { top: '140px', right: '10px' } }: IDServerCodeProps) {
  return (
    <div className="code-pane position-relative">
      <pre className="code-block">
{`id_server() ->
  receive
    {init, N} -> id_server_loop(N)
  end.

id_server_loop(N) ->
  receive
    {get, Client} ->
      Client ! {id, N},
      id_server_loop(N + 1);
    {init, _} -> error
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

export default IDServerCode;
