import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";

import { updateSingle, updateRatings } from "./sco.ts";

describe("updateSingle", () => {
  it("should update ratings (lr=1.0)", () => {
    const [winner_updated, loser_updated] = updateSingle(50, 50, 1.0);
    expect(winner_updated).toBeCloseTo(50.25);
    expect(loser_updated).toBeCloseTo(49.75);
  });

  it("should update ratings (lr=0.5)", () => {
    const [winner_updated, loser_updated] = updateSingle(50, 50, 0.5);
    expect(winner_updated).toBeCloseTo(50 + 0.25 / 2);
    expect(loser_updated).toBeCloseTo(50 - 0.25 / 2);
  });

  it("should clamp ratings to [0, 100]", () => {
    const [winner_updated, loser_updated] = updateSingle(100.0, 0.0, 1.0);
    expect(winner_updated).toEqual(100.0);
    expect(loser_updated).toEqual(0.0);
  });
});

describe("updateRatings", () => {
  it("should update multiple ratings based on rankings", () => {
    const ratings = new Map([
      ["Alice", 50.0],
      ["Bob", 50.0],
      ["Charlie", 50.0],
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
    expect(updated.get("Alice")).toBeGreaterThan(50);
    expect(updated.get("Bob")).toBeLessThan(50);
    expect(updated.get("Charlie")).toBeLessThan(50);

    // Bob beat Charlie
    expect(updated.get("Bob")).toBeGreaterThan(updated.get("Charlie") ?? 50);
  });

  it("should handle tied rankings", () => {
    const ratings = new Map([
      ["Alice", 50.0],
      ["Bob", 50.0],
    ]);

    const rankings = [
      [
        { player: "Alice", rank: 1 },
        { player: "Bob", rank: 1 },  // Tied rank
      ],
    ];

    const updated = updateRatings(ratings, rankings, 0.5);

    // Ratings should remain unchanged for tied players
    expect(updated.get("Alice")).toEqual(50);
    expect(updated.get("Bob")).toEqual(50);
  });

  it("should handle new players with default rating", () => {
    const ratings = new Map([
      ["Alice", 70],
    ]);

    const rankings = [
      [
        { player: "Alice", rank: 2 },
        { player: "NewPlayer", rank: 1 },  // NewPlayer not in original ratings
      ],
    ];

    const updated = updateRatings(ratings, rankings, 0.5);

    // NewPlayer started at 50 (default) and won against Alice
    expect(updated.get("NewPlayer")).toBeGreaterThan(50);
    expect(updated.get("Alice")).toBeLessThan(70);
  });
});
