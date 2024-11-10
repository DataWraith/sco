import { sigmoidLossGradient } from "./loss.ts";

export type Rating = number;
export type Ratings = Map<string, Rating>;
export type Rank = { player: string; rank: number };
export type Ranking = Rank[];

function sortRanking(ranking: Ranking): Ranking {
    return ranking.sort((a, b) => a.rank - b.rank);
}

function clamp(x: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, x));
}

export function updateSingle(
    winner: Rating,
    loser: Rating,
    lr: number = 0.5,
    tau: number = 1.0,
): [winner: Rating, loser: Rating] {
    const gradient = sigmoidLossGradient(winner, loser, tau);
    const winner_updated = winner - lr * gradient;
    const loser_updated = loser + lr * gradient;

    return [clamp(winner_updated, 0, 1), clamp(loser_updated, 0, 1)];
}

export function updateRatings(
    ratings: Ratings,
    rankings: Ranking[],
    lr: number = 0.5,
    tau: number = 1.0,
): Ratings {
    const updated_ratings = new Map(ratings);

    for (const ranking of rankings) {
        sortRanking(ranking);

        for (let i = 0; i < ranking.length - 1; i++) {
            for (let j = i + 1; j < ranking.length; j++) {
                if (ranking[i].rank == ranking[j].rank) {
                    continue;
                }

                const winner = ranking[i].player;
                const loser = ranking[j].player;

                const [winner_updated, loser_updated] = updateSingle(
                    updated_ratings.get(winner) ?? 0.5,
                    updated_ratings.get(loser) ?? 0.5,
                    lr,
                    tau,
                );

                updated_ratings.set(winner, winner_updated);
                updated_ratings.set(loser, loser_updated);
            }
        }
    }

    return updated_ratings;
}
