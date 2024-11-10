import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";

import { updateSingle, updateRatings } from "./sco.ts";

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

describe("updateRatings", () => {
  it("should update multiple ratings based on rankings", () => {
    const ratings = new Map([
      ["Alice", 0.5],
      ["Bob", 0.5],
      ["Charlie", 0.5],
    ]);

    const rankings = [
      [
        { player: "Alice", rank: 1 },
        { player: "Bob", rank: 2 },
        { player: "Charlie", rank: 3 },
      ],
    ];

    const updated = updateRatings(ratings, rankings, 0.5);

    // Alice beat both Bob and Charlie
    expect(updated.get("Alice")).toBeGreaterThan(0.5);
    expect(updated.get("Bob")).toBeLessThan(0.5);
    expect(updated.get("Charlie")).toBeLessThan(0.5);

    // Bob beat Charlie
    expect(updated.get("Bob")).toBeGreaterThan(updated.get("Charlie") ?? 0.5);
  });

  it("should handle tied rankings", () => {
    const ratings = new Map([
      ["Alice", 0.5],
      ["Bob", 0.5],
    ]);

    const rankings = [
      [
        { player: "Alice", rank: 1 },
        { player: "Bob", rank: 1 },  // Tied rank
      ],
    ];

    const updated = updateRatings(ratings, rankings, 0.5);

    // Ratings should remain unchanged for tied players
    expect(updated.get("Alice")).toEqual(0.5);
    expect(updated.get("Bob")).toEqual(0.5);
  });

  it("should handle new players with default rating", () => {
    const ratings = new Map([
      ["Alice", 0.7],
    ]);

    const rankings = [
      [
        { player: "Alice", rank: 2 },
        { player: "NewPlayer", rank: 1 },  // NewPlayer not in original ratings
      ],
    ];

    const updated = updateRatings(ratings, rankings, 0.5);

    // NewPlayer started at 0.5 (default) and won against Alice
    expect(updated.get("NewPlayer")).toBeGreaterThan(0.5);
    expect(updated.get("Alice")).toBeLessThan(0.7);
  });
});
