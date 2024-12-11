defmodule Utils.Data do
  @moduledoc false

  @type pattern() :: String.t() | [String.t()] | :binary.cp()

  @spec load_day(year :: non_neg_integer(), day :: non_neg_integer(), split :: pattern() | Regex.t()) :: [String.t()]
  def load_day(year, day, split) do
    {year, day}
    |> build_filepath()
    |> File.read!()
    |> String.trim()
    |> String.split(split)
  end

  @spec load_day(year :: non_neg_integer(), day :: non_neg_integer()) :: [String.t()]
  def load_day(year, day), do: load_day(year, day, "\n")

  defp build_filepath({year, day}) do
    filename = "day_#{String.pad_leading(Integer.to_string(day), 2, "0")}.txt"
    Path.join([:code.priv_dir(:aoc), "y#{year}", filename])
  end
end
