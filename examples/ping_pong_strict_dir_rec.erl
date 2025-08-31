-module(ping_pong_strict_dir_rec).

-include("paterl.hrl").

-import(io, [format/2]).

-export([main/0]).

-export([ping/1, pong/0]).

-type start() :: {start, pong_mb()}.
-type pong() :: {pong, pong_mb()}.

-type ping() :: {ping, ping_mb()}.
-type stop() :: {stop}.

-type ping_mb() :: pid() | start() | pong().

-type pong_mb() :: pid() | ping() | stop().

-type main_mb() :: pid().

-new({ping_mb, [ping/1]}).
-use({ping_mb, [send_ping/2, ping_loop/1]}).

-new({pong_mb, [pong/0]}).

-new({main_mb, [main/0]}).

-spec ping(integer()) -> no_return().
ping(Pings_left) ->
  ?expects("Start"),
  receive
    {start, Pong} ->
      send_ping(Pong, Pings_left)
  end.

-spec send_ping(pong_mb(), integer()) -> no_return().
send_ping(Pong, Pings_left) ->
  if Pings_left > 0 ->
    format("Pinging ~p...~n", [Pings_left]),

    Self = self(),
    Pong ! {ping, Self},
    ping_loop(Pings_left - 1);
    true ->
      Pong ! {stop}
  end.

-spec ping_loop(integer()) -> no_return().
ping_loop(Pings_left) ->
  ?expects("Pong"),
  receive
    {pong, Pong} ->
      send_ping(Pong, Pings_left)
  end.

-spec pong() -> no_return().
pong() ->
  ?expects("Ping + Stop"),
  receive
    {ping, Ping} ->
      format("Ponging~n", []),
      Self = self(),
      Ping ! {pong, Self},
      pong();
    {stop} ->
      ok
  end.

-spec main() -> any().
main() ->
  Pong = spawn(?MODULE, pong, []),
  Ping = spawn(?MODULE, ping, [5]),
  Ping ! {start, Pong}.