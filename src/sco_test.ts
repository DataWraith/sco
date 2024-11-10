import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";

import { sortRanking } from "./sco.ts";

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
