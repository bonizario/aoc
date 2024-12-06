defmodule Mix.Tasks.Day do
  @moduledoc """
  A Mix task for running Advent of Code solutions.
  """

  use Mix.Task

  def run([year_str, day_str]) do
    {year_str, day_str}
    |> parse()
    |> tap(&part_one(elem(&1, 0), elem(&1, 1)))
    |> tap(&part_two(elem(&1, 0), elem(&1, 1)))
  end

  def run([year_str, day_str, "1"]) do
    {year_str, day_str}
    |> parse()
    |> tap(&part_one(elem(&1, 0), elem(&1, 1)))
  end

  def run([year_str, day_str, "2"]) do
    {year_str, day_str}
    |> parse()
    |> tap(&part_two(elem(&1, 0), elem(&1, 1)))
  end

  def run(_args) do
    raise usage()
  end

  defp usage(), do: "Usage: mix day YEAR DAY [PART]"

  defp parse({year_str, day_str}) do
    case {Integer.parse(year_str), Integer.parse(day_str)} do
      {{year, _}, {day, _}} -> {year, day}
      _ -> raise usage()
    end
  end

  defp part_one(year, day) do
    IO.puts("=== YEAR #{year} DAY #{day} - PART 1 ===")
    day_padded = String.pad_leading(Integer.to_string(day), 2, "0")
    module = "Elixir.AOC.Y#{year}.Day#{day_padded}"
    apply(String.to_atom(module), :solve_one, []) |> IO.puts()
  end

  defp part_two(year, day) do
    IO.puts("=== YEAR #{year} DAY #{day} - PART 2 ===")
    day_padded = String.pad_leading(Integer.to_string(day), 2, "0")
    module = "Elixir.AOC.Y#{year}.Day#{day_padded}"
    apply(String.to_atom(module), :solve_two, []) |> IO.puts()
  end
end
