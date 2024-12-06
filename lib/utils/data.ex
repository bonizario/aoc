defmodule Utils.Data do
  @moduledoc false

  def load_day(year, day, split) do
    {year, day}
    |> build_filepath()
    |> File.read!()
    |> String.trim()
    |> String.split(split)
  end

  def load_day(year, day), do: load_day(year, day, "\n")

  defp build_filepath({year, day}) do
    filename = "day_#{String.pad_leading(Integer.to_string(day), 2, "0")}.txt"
    Path.join([:code.priv_dir(:aoc), "y#{year}", filename])
  end
end
