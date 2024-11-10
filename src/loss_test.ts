import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";

import { sigmoidLoss } from "./loss.ts";

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