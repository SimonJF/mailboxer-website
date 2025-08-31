-module(kfork_dir_rec).

-include("paterl.hrl").

-import(io, [format/2]).

-export([main/0]).

-export([actor/0]).

-type packet() :: {packet}.

-type actor_mb() :: pid() | packet().

-type main_mb() :: pid().

-new({actor_mb, [actor/0]}).

-new({main_mb, [main/0]}).

-spec actor() -> no_return().
actor() ->
  ?expects("*Packet"),
  receive
    {packet} ->
      Self = self(),
      format("~p Received packet.~n", [Self]),
      actor()
  after 0 ->
    format("Actor exited.~n", [])
  end.

-spec flood(integer(), actor_mb()) -> no_return().
flood(Num_messages, Actor) ->
  if Num_messages =< 0 -> ok;
    true ->
      Actor ! {packet},
      flood(Num_messages - 1, Actor)
  end.

-spec main() -> any().
main() ->
  Actor1 = spawn(?MODULE, actor, []),
  Actor2 = spawn(?MODULE, actor, []),
  Actor3 = spawn(?MODULE, actor, []),

  flood(5, Actor1),
  flood(10, Actor2),
  flood(15, Actor3).