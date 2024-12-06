defmodule AOC.Y2024.Day01 do
  @moduledoc false

  use AOC.Solution

  @impl true
  def load_data() do
    Data.load_day(2024, 1)
    |> Enum.map(&String.split(&1, ~r/\s+/, trim: true))
    |> Enum.map(fn [a, b] -> {String.to_integer(a), String.to_integer(b)} end)
    |> Matrix.transpose()
  end

  @impl true
  def part_one([l, r]) do
    l
    |> Enum.sort()
    |> Enum.zip(Enum.sort(r))
    |> Enum.map(fn {a, b} -> abs(a - b) end)
    |> Enum.sum()
  end

  @impl true
  def part_two([l, r]) do
    frequencies = Enum.frequencies(r)

    l
    |> Enum.map(fn x -> x * Map.get(frequencies, x, 0) end)
    |> Enum.sum()
  end
end
