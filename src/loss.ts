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

export function sigmoidLossGradient(
    winner_rating: Rating,
    loser_rating: Rating,
    tau: number = 1.0,
): number {
    const w_tau = Math.exp(winner_rating / tau);
    const l_tau = Math.exp(loser_rating / tau);
    const l_tau_neg = Math.exp(-loser_rating / tau);

    return -w_tau / (tau * l_tau + 2 * tau * w_tau + tau * l_tau_neg * Math.exp(2 * winner_rating / tau))
}
