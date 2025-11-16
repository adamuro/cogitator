import { describe, expect, it } from "@jest/globals";
import { calculateMean, calculateMedian, calculateMode } from "../result";

describe("result calculation auxilliary functions", () => {
	it("calculateMean calculates the mean of an array of numbers", () => {
		expect(calculateMean([1, 2, 3, 4, 5])).toBe(3);
		expect(calculateMean([10, 20, 30])).toBe(20);
		expect(calculateMean([5, 15, 25, 35])).toBe(20);
		expect(calculateMean([0, 0, 0, 0])).toBe(0);
		expect(calculateMean([-5, 5, -10, 10])).toBe(0);
		expect(calculateMean([1])).toBe(1);
		expect(calculateMean([1, 2])).toBe(1.5);
	});

	it("calculateMedian calculates the median of an array of numbers", () => {
		expect(calculateMedian([1, 3, 3, 6, 7, 8, 9])).toBe(6);
		expect(calculateMedian([1, 2, 3, 4, 5, 6, 8, 9])).toBe(4);
		expect(calculateMedian([7, 1, 3, 6, 9, 8, 3])).toBe(6);
		expect(calculateMedian([1, 2, 3, 4, 5])).toBe(3);
		expect(calculateMedian([5, 4, 3, 2, 1])).toBe(3);
		expect(calculateMedian([1])).toBe(1);
	});

	it("calculateMode calculates the mode of an array of numbers", () => {
		expect(calculateMode([1, 2, 2, 3, 4])).toBe(2);
		expect(calculateMode([5, 5, 5, 1, 2, 3])).toBe(5);
		expect(calculateMode([1, 1, 2, 2, 3, 3])).toBe(1); // First mode in case of tie
		expect(calculateMode([10])).toBe(10);
		expect(calculateMode([-1, -1, -2, -2, -2])).toBe(-2);
	});
});
