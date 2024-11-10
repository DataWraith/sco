type Rating = number;
type Rank = { player: string; rank: number };
type Ranking = Rank[];
type Outcome = [winner: string, loser: string];

export function sortRanking(ranking: Ranking): Ranking {
    return ranking.sort((a, b) => a.rank - b.rank);
}
