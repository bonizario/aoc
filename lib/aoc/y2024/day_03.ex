defmodule AOC.Y2024.Day03 do
  @moduledoc false

  use AOC.Solution

  @part_one_regex ~r/mul\((\d+),(\d+)\)/
  @part_two_regex ~r/mul\((-?\d+),(-?\d+)\)|do(?:n't)?\(\)/

  @impl true
  def load_data() do
    Data.load_day(2024, 3)
    |> Enum.join()
  end

  @impl true
  def part_one(data) do
    Regex.scan(@part_one_regex, data, capture: :all_but_first)
    |> Enum.map(fn [a, b] -> String.to_integer(a) * String.to_integer(b) end)
    |> Enum.sum()
  end

  @impl true
  def part_two(data) do
    Regex.scan(@part_two_regex, data)
    |> Enum.reduce({0, :enabled}, &reduce_instructions/2)
    |> elem(0)
  end

  defp reduce_instructions(["don't()"], {acc, _status}), do: {acc, :disabled}
  defp reduce_instructions(["do()"], {acc, _status}), do: {acc, :enabled}

  defp reduce_instructions([_mul, a, b], {acc, :enabled}),
    do: {acc + String.to_integer(a) * String.to_integer(b), :enabled}

  defp reduce_instructions([_mul, _a, _b], {acc, :disabled}), do: {acc, :disabled}
end
