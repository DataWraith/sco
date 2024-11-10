import { Rating } from "./sco.ts";

function sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
}

export function sigmoidLoss(
    winner_rating: Rating,
    loser_rating: Rating,
    tau: number = 1.0,
): number {
    const z = (loser_rating - winner_rating) / tau;
    return sigmoid(z);
}

function sigmoidLossGradient(
    winner_rating: Rating,
    loser_rating: Rating,
    tau: number = 1.0,
): number {
    const s = sigmoidLoss(winner_rating, loser_rating, tau);
    return s * (1 - s);
}
