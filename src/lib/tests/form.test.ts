import { describe, expect, it } from "@jest/globals";
import { processNumberFieldValue } from "../form";

describe("processNumberFieldValue function", () => {
	it("returns min when value is string and below min", () => {
		expect(processNumberFieldValue("3", 5)).toBe(5);
		expect(processNumberFieldValue("-1", 0)).toBe(0);
		expect(processNumberFieldValue("-3", 1)).toBe(1);
		expect(processNumberFieldValue("0", 7)).toBe(7);
		expect(processNumberFieldValue("0", 2)).toBe(2);
	});

	it("returns max when value is string and above max", () => {
		expect(processNumberFieldValue("10", undefined, 5)).toBe(5);
		expect(processNumberFieldValue("20", 0, 15)).toBe(15);
		expect(processNumberFieldValue("100", 1, 50)).toBe(50);
		expect(processNumberFieldValue("200", -10, 150)).toBe(150);
		expect(processNumberFieldValue("999", -100, 500)).toBe(500);
		expect(processNumberFieldValue("5", 0, 0)).toBe(0);
		expect(processNumberFieldValue("0", -50, -10)).toBe(-10);
		expect(processNumberFieldValue("-5", -100, -21)).toBe(-21);
	});

	it("returns min when value is number and below min", () => {
		expect(processNumberFieldValue(3, 5)).toBe(5);
		expect(processNumberFieldValue(-1, 0)).toBe(0);
		expect(processNumberFieldValue(-3, 1)).toBe(1);
		expect(processNumberFieldValue(0, 7)).toBe(7);
		expect(processNumberFieldValue(0, 2)).toBe(2);
	});

	it("returns max when value is number and above max", () => {
		expect(processNumberFieldValue(10, undefined, 5)).toBe(5);
		expect(processNumberFieldValue(20, 0, 15)).toBe(15);
		expect(processNumberFieldValue(100, 1, 50)).toBe(50);
		expect(processNumberFieldValue(200, -10, 150)).toBe(150);
		expect(processNumberFieldValue(999, -100, 500)).toBe(500);
		expect(processNumberFieldValue(5, 0, 0)).toBe(0);
		expect(processNumberFieldValue(0, -50, -10)).toBe(-10);
		expect(processNumberFieldValue(-5, -100, -21)).toBe(-21);
	});

	it("returns the same number when value is string and within range", () => {
		expect(processNumberFieldValue("7", 5, 10)).toBe(7);
		expect(processNumberFieldValue("0", -5, 5)).toBe(0);
		expect(processNumberFieldValue("-3", -10, 0)).toBe(-3);
		expect(processNumberFieldValue("15", 10, 20)).toBe(15);
	});

	it("returns the same number when value is number and within range", () => {
		expect(processNumberFieldValue(7, 5, 10)).toBe(7);
		expect(processNumberFieldValue(0, -5, 5)).toBe(0);
		expect(processNumberFieldValue(-3, -10, 0)).toBe(-3);
		expect(processNumberFieldValue(15, 10, 20)).toBe(15);
	});

	it("returns emptyNumberFieldValue when value is empty string", () => {
		expect(processNumberFieldValue("")).toBe("" as unknown as number);
	});
});
