import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";

import { sigmoidLoss, sigmoidLossGradient } from "./loss.ts";

describe("sigmoidLoss", () => {
    it("should compute the sigmoid loss for equal ratings", () => {
        const loss = sigmoidLoss(0.5, 0.5, 1.0);
        expect(loss).toBeCloseTo(0.5);
    });

    describe("should compute the sigmoid loss for different ratings", () => {
        it("when the winner has the lower rating", () => {
            const loss = sigmoidLoss(0.25, 0.75, 0.5);
            expect(loss).toBeCloseTo(0.73105);
        });

        it("when the loser has the lower rating", () => {
            const loss = sigmoidLoss(0.75, 0.25, 0.5);
            expect(loss).toBeCloseTo(0.26894);
        });
    });

    describe("should be inverse if the ratings are inverted", () => {
        const loss1 = sigmoidLoss(0.5, 0.55, 1.0);
        const loss2 = sigmoidLoss(0.55, 0.5, 1.0);
        expect(loss1).toBeCloseTo(1 - loss2);
    });
});

describe("sigmoidLossGradient", () => {
    const test_cases = [
        { winner: 0.5, loser: 0.5, tau: 1.0, expected: -0.25 },
        { winner: 0.75, loser: 0.25, tau: 0.9, expected: -0.2574 },
        { winner: 0.25, loser: 0.75, tau: 0.37, expected: -0.441507 },
        { winner: 0.3066, loser: 0.5412, tau: 0.5783, expected: -0.414992 },
        { winner: 0.4306, loser: 0.2068, tau: 0.5601, expected: -0.428996 },
        { winner: 0.9916, loser: 0.092, tau: 0.9586, expected: -0.210862 },
        { winner: 0.9673, loser: 0.8424, tau: 0.641, expected: -0.386336 },
        { winner: 0.9711, loser: 0.8425, tau: 0.071, expected: -1.700689 },
        { winner: 0.8818, loser: 0.8499, tau: 0.0669, expected: -3.532304 },
        { winner: 0.3798, loser: 0.298, tau: 0.7144, expected: -0.348799 },
        { winner: 0.6829, loser: 0.7009, tau: 0.2023, expected: -1.233345 },
        { winner: 0.5331, loser: 0.722, tau: 0.5618, expected: -0.432653 },
        { winner: 0.3208, loser: 0.3424, tau: 0.2365, expected: -1.054881 },
    ];

    for (const test_case of test_cases) {
        it(`should compute the gradient of the sigmoid loss for winner=${test_case.winner}, loser=${test_case.loser}, tau=${test_case.tau}`, () => {
            const gradient = sigmoidLossGradient(test_case.winner, test_case.loser, test_case.tau);
            expect(gradient).toBeCloseTo(test_case.expected);
        });
    }
});
