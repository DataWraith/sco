import { parseArgs } from "jsr:@std/cli@1/parse-args";
import { Ranking } from "./src/sco.ts";
import { updateRatings } from "./src/sco.ts";

export { updateRatings } from "./src/sco.ts";
export type { Rating, Ratings, Ranking, Rank } from "./src/sco.ts";

function parseRankings(rankings: string): Ranking[] {
  const lines = rankings.split("\n").filter(line => line.trim() !== '');

  try {
    const parsedRankings = lines.map((line, index) => {
      try {
        const ranking = JSON.parse(line) as Ranking;

        // Validate that it's an array and each element has the correct shape
        if (!Array.isArray(ranking)) {
          throw new Error(`Line ${index + 1}: Expected an array`);
        }

        ranking.forEach((rank, rankIndex) => {
          if (typeof rank.player !== 'string' || typeof rank.rank !== 'number') {
            throw new Error(
              `Line ${index + 1}, rank ${rankIndex + 1}: Invalid rank format`
            );
          }
        });

        return ranking;
      } catch (e) {
        // If we couldn't parse the line as JSON, complain about that.
        if (e instanceof SyntaxError) {
          throw new Error(`Line ${index + 1}: Invalid JSON`);
        }

        // Otherwise, rethrow our custom error.
        throw e;
      }
    });

    return parsedRankings;
  } catch (error: unknown) {
    const err = error as Error;
    console.error(`Error parsing rankings file: ${err.message}`);
    Deno.exit(1);
  }
}

if (import.meta.main) {
  const args = parseArgs(Deno.args);

  if (args["_"].length != 1) {
    console.error("Expected exactly one argument: the path to the rankings file.");
    Deno.exit(1);
  }

  const rankings_path = args["_"][0] as string;
  const temperature = args.temperature ?? 1.0;
  const learning_rate = args.learning_rate ?? 0.5;

  const rankings = await Deno.readTextFile(rankings_path);
  const parsedRankings = parseRankings(rankings);

  const ratings = updateRatings(new Map(), parsedRankings, learning_rate, temperature);

  console.log(JSON.stringify(Object.fromEntries(ratings), null, 2));
}
