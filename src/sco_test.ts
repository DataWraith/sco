import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";

import { sortRanking, updateRatings } from "./sco.ts";

describe("sortRanking", () => {
  it("should sort a ranking by rank", () => {
    const ranking = [{ player: "Alice", rank: 2 }, { player: "Bob", rank: 1 }];
    const sorted = sortRanking(ranking);

    expect(sorted).toEqual([
      { player: "Bob", rank: 1 },
      { player: "Alice", rank: 2 },
    ]);
  });
});

describe("updateSingle", () => {
  it("should update ratings (lr=1.0)", () => {
    const [winner_updated, loser_updated] = updateSingle(0.5, 0.5, 1.0);
    expect(winner_updated).toBeCloseTo(0.75);
    expect(loser_updated).toBeCloseTo(0.25);
  });

  it("should update ratings (lr=0.5)", () => {
    const [winner_updated, loser_updated] = updateSingle(0.5, 0.5, 0.5);
    expect(winner_updated).toBeCloseTo(0.625);
    expect(loser_updated).toBeCloseTo(0.375);
  });

  it("should clamp ratings to [0, 1]", () => {
    const [winner_updated, loser_updated] = updateSingle(1.0, 0.0, 1.0);
    expect(winner_updated).toEqual(1.0);
    expect(loser_updated).toEqual(0.0);
  });
});
