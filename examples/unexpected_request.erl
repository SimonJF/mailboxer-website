-module(unexpected_request).

-include("paterl.hrl").

-import(io, [format/2]).

-export([main/0]).

-export([id_server/0]).

-type init() :: {init, integer()}.
-type get() :: {get, id_client_mb()}.
-type id() :: {id, integer()}.

-type id_server_mb() :: pid() | init() | get().
-type id_client_mb() :: pid() | id().

-type main_mb() :: pid().

-new({id_server_mb, [id_server/0]}).
-use({id_server_mb, [id_server_loop/1]}).
-new({id_client_mb, [id_client/1]}).

-new({main_mb, [main/0]}).

-spec id_server() -> no_return().
id_server() ->
  ?expects(id_server_mb, "Init.*Get"),
  receive
    {init, N} ->
      id_server_loop(N)
  end.

-spec id_server_loop(integer()) -> no_return().
id_server_loop(N) ->
  ?expects("*Get"),
  receive
    {get, Client} ->
      Client ! {id, N},
      id_server_loop(N + 1)
  end.

-spec id_client(id_server_mb()) -> integer().
id_client(Server) ->
  Self = self(),
  Server ! {get, Self},
  ?expects(id_client_mb, "Id"),
  receive
    {id, Id} ->
      Id
  end.

-spec main() -> any().
main() ->
  Server = spawn(?MODULE, id_server, []),
  Server ! {init, 5},
  Server ! {init, 5}, % <-- Extra init, an unexpected_request
  Id = id_client(Server),
  format("Id: ~p~n", [Id]).