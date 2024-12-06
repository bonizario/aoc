defmodule Utils.Matrix do
  @moduledoc false

  @spec transpose([list()]) :: list()
  def transpose(arr) do
    arr
    |> List.zip()
    |> Enum.map(&Tuple.to_list/1)
  end
end
