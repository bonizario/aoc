defmodule AOC.Solution do
  @moduledoc """
  A behaviour for Advent of Code solutions.
  """

  @callback load_data() :: any()
  @callback part_one(data :: any()) :: any()
  @callback part_two(data :: any()) :: any()

  defmacro __using__(_opts) do
    quote do
      @behaviour AOC.Solution

      alias Utils.Data
      alias Utils.Matrix

      def solve_one() do
        load_data()
        |> part_one()
      end

      def solve_two() do
        load_data()
        |> part_two()
      end
    end
  end
end
