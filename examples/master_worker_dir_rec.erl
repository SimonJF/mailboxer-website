-module(master_worker_dir_rec).

-include("paterl.hrl").

-import(io, [format/2]).

-export([main/0]).

-export([master/0, worker/0, client/2]).

-type task() :: {task, client_mb(), integer()}.

-type result() :: {result, integer()}.

-type work() :: {work, pool_mb(), integer()}.

-type master_mb() :: pid() | task().

-type pool_mb() :: pid() | result().

-type worker_mb() :: pid() | work().

-type client_mb() :: pid() | result().

-type main_mb() :: pid().

-new({master_mb, [master/0]}).

-new({pool_mb, [pool/1]}).
-use({pool_mb, [harvest/3, harvest_exit/0]}).

-new({worker_mb, [worker/0]}).

-new({client_mb, [client/2]}).

-new({main_mb, [main/0]}).

-spec master() -> no_return().
master() ->
  ?expects("*Task"),
  receive
    {task, ReplyTo, N} ->
      format("Received task to compute ~b from client ~p.~n", [N, ReplyTo]),
      Result = pool(N),
      format("Received result ~b from workers.~n", [Result]),
      ReplyTo ! {result, Result},
      master()
  end.

-spec pool(integer()) -> integer().
pool(Chunks) ->
  Self = self(),
  farm(0, Chunks, Self),
  harvest(0, Chunks, 0).

-spec worker() -> no_return().
worker() ->
  ?expects("Work"),
  receive
    {work, ReplyTo, Task} ->
      Result = compute(Task),
      ReplyTo ! {result, Result}
  end.

-spec farm(integer(), integer(), pool_mb()) -> no_return().
farm(Count, Chunks, Pool) ->
  if Count == Chunks ->
    ok;
    true ->
      Task = Count + 1,
      Worker = spawn(?MODULE, worker, []),
      Worker ! {work, Pool, Task},

      format("Farmed chunk ~b to worker ~p.~n", [Task, Worker]),
      farm(Task, Chunks, Pool)
  end.

-spec harvest(integer(), integer(), integer()) -> integer().
harvest(Count, Chunks, Acc) ->
  format("Count ~p and chunks ~p~n", [Count, Chunks]),
  if (Count == Chunks) ->
    harvest_exit(),
    Acc;
  true ->
    ?expects("*Result"),
    receive
      {result, Result} ->
        Count0 = Count + 1,

        format("Harvested chunk ~b with result ~b.~n", [Count0, Result]),
        harvest(Count0, Chunks, Acc + Result)
    end
  end.

-spec harvest_exit() -> any().
harvest_exit() ->
  ?expects("*Result"),
  receive
    {result, Result} ->
      harvest_exit()
  after 0 ->
    ok
  end.

-spec compute(integer()) -> integer().
compute(N) ->
  N * N.

-spec client(integer(), master_mb()) -> any().
client(N, Master) ->
  Self = self(),
  Master ! {task, Self, N},

  format("Client ~p sent task ~b to master ~p.~n", [Self, N, Master]),
  ?expects("Result"),
  receive
    {result, Result} ->
      format("Result from master: ~b.~n", [Result])
  end.

-spec main() -> any().
main() ->
  MasterMb = spawn(?MODULE, master, []),

  spawn(?MODULE, client, [5, MasterMb]),
  ok.