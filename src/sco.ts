export type Rating = number;
export type Rank = { player: string; rank: number };
export type Ranking = Rank[];
export type Outcome = [winner: string, loser: string];

export function sortRanking(ranking: Ranking): Ranking {
    return ranking.sort((a, b) => a.rank - b.rank);
}

