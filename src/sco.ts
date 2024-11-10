import { sigmoidLossGradient } from "./loss.ts";

export type Rating = number;
export type Ratings = Map<string, Rating>;
export type Rank = { player: string; rank: number };
export type Ranking = Rank[];
export type Outcome = [winner: string, loser: string];

export function sortRanking(ranking: Ranking): Ranking {
    return ranking.sort((a, b) => a.rank - b.rank);
}

function clamp(x: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, x));
}

export function updateRatings(
    winner: Rating,
    loser: Rating,
    lr: number = 0.5,
    tau: number = 1.0,
): [Rating, Rating] {
    const gradient = sigmoidLossGradient(winner, loser, tau);
    const winner_updated = winner - lr * gradient;
    const loser_updated = loser + lr * gradient;

    return [clamp(winner_updated, 0, 1), clamp(loser_updated, 0, 1)];
}
