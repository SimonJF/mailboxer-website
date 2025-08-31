-module(fib).

-include("paterl.hrl").

-import(io, [format/2]).

-export([main/0]).

-export([fib/0]).

-type req() :: {req, fib_mb(), integer()}.
-type resp() :: {resp, integer()}.

-type fib_mb() :: pid() | req() | resp().

-new({fib_mb, [fib/0, main/0]}).

-spec fib() -> no_return().
fib() ->
  ?expects("Req"),
  receive
    {req, ReplyTo, N} ->
      Term =
        if N =< 2 ->
          1;
          true ->
            FibPid1 = spawn(?MODULE, fib, []),
            FibPid2 = spawn(?MODULE, fib, []),

            Self = self(),
            FibPid1 ! {req, Self, N - 1},
            FibPid2 ! {req, Self, N - 2},

            ?expects("Resp.Resp"),
            receive
              {resp, Term1} ->
                ?expects("Resp"),
                receive
                  {resp, Term2} ->
                    Term1 + Term2
                end
            end
        end,
      ReplyTo ! {resp, Term}
  end.

-spec main() -> any().
main() ->
  FibPid1 = spawn(?MODULE, fib, []),

  Self = self(),
  FibPid1 ! {req, Self, 16},

  ?expects("Resp"),
  receive
    {resp, Term} ->
      format("Result: ~p.~n", [Term])
  end.