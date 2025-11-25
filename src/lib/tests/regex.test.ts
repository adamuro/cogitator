import { describe, expect, it, test } from "@jest/globals";
import { DICE_NUMBER_REGEX } from "../regex";

describe("dice number regex", () => {
	it("matches a positive number number between 1 and 99", () => {
		expect(DICE_NUMBER_REGEX.test("1")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("2")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("6")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("10")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("24")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("99")).toBeTruthy();
	});

	it("matches a single die", () => {
		expect(DICE_NUMBER_REGEX.test("D3")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("D6")).toBeTruthy();
	});

	it("matches a positive number of dice between 1 and 99", () => {
		expect(DICE_NUMBER_REGEX.test("2D6")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("10D6")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("13D6")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("99D6")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("6D3")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("66D3")).toBeTruthy();
	});

	it("matches a single die with added flat bonus", () => {
		expect(DICE_NUMBER_REGEX.test("D6+1")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("D6+3")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("D3+5")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("D3+1")).toBeTruthy();
	});

	it("matches multiple dice with added flat bonus", () => {
		expect(DICE_NUMBER_REGEX.test("2D6+1")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("10D6+5")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("13D6+3")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("99D6+10")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("2D6+33")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("10D6+99")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("6D3+2")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("66D3+7")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("33D3+33")).toBeTruthy();
		expect(DICE_NUMBER_REGEX.test("2D3+99")).toBeTruthy();
	});

	it("fails on numbers from outside the scope", () => {
		expect(DICE_NUMBER_REGEX.test("0")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("-1")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("-33")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("-1")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("100")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("123")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("9472")).toBeFalsy();
	});

	it("fails on unsupported dice", () => {
		expect(DICE_NUMBER_REGEX.test("D2")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("D4")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("D5")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("D8")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("D20")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("D0")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("D-3")).toBeFalsy();
	});

	it("fails on dice number from outside the scope", () => {
		expect(DICE_NUMBER_REGEX.test("0D3")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("-1D3")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("-16D3")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("100D3")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("485D3")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("0D6")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("-1D6")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("-16D6")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("100D6")).toBeFalsy();
		expect(DICE_NUMBER_REGEX.test("485D6")).toBeFalsy();
	});
});
