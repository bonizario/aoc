defmodule Utils do
  @moduledoc false

  alias Utils.Data
  alias Utils.Matrix

  defdelegate load_day(year, day, split), to: Data
  defdelegate load_day(year, day), to: Data
  defdelegate transpose(matrix), to: Matrix
end
