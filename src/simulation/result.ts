import type {
	SimulationData,
	SimulationResult,
	StatisticalResult,
} from "./types";

export function calculateSimulationResult(
	data: SimulationData,
): SimulationResult {
	const result: SimulationResult = {
		attacker: [],
		defender: [],
	};

	for (const weaponData of data.attacker) {
		const weaponResult = {
			weapon: weaponData.weapon,
			attacks: calculateStatisticalResult(
				weaponData.results.map((r) => r.attacks),
			),
			hits: calculateStatisticalResult(weaponData.results.map((r) => r.hits)),
			wounds: calculateStatisticalResult(
				weaponData.results.map((r) => r.wounds),
			),
			failedSaves: calculateStatisticalResult(
				weaponData.results.map((r) => r.failedSaves),
			),
			damage: calculateStatisticalResult(
				weaponData.results.map((r) => r.damage),
			),
		};
		result.attacker.push(weaponResult);
	}

	for (const unitData of data.defender) {
		const unitResult = {
			unit: unitData.unit,
			modelsRemaining: calculateStatisticalResult(
				unitData.results.map((r) => r.modelsRemaining),
			),
			woundsRemaining: calculateStatisticalResult(
				unitData.results.map((r) => r.woundsRemaining),
			),
			modelsLost: calculateStatisticalResult(
				unitData.results.map((r) => r.modelsLost),
			),
			woundsLost: calculateStatisticalResult(
				unitData.results.map((r) => r.woundsLost),
			),
		};
		result.defender.push(unitResult);
	}

	return result;
}

export function calculateStatisticalResult(
	values: number[],
): StatisticalResult {
	const mean = Math.round(calculateMean(values) * 10) / 10;
	const median = Math.round(calculateMedian(values) * 10) / 10;
	const mode = Math.round(calculateMode(values) * 10) / 10;
	const min = Math.min(...values);
	const max = Math.max(...values);

	return {
		mean,
		median,
		mode,
		min,
		max,
	};
}

export function calculateMean(values: number[]): number {
	const total = values.reduce((sum, val) => sum + val, 0);
	return total / values.length;
}

export function calculateMedian(values: number[]): number {
	const sorted = [...values].sort((a, b) => a - b);
	const midIndex = Math.floor(values.length / 2 - (values.length % 2 ? 0 : 1));
	const midValue = sorted[midIndex];
	if (midValue === undefined)
		throw new Error("Cannot calculate median of empty array");

	return midValue;
}

export function calculateMode(values: number[]): number {
	const frequencyMap: Map<number, number> = new Map();

	for (const value of values) {
		const count = (frequencyMap.get(value) || 0) + 1;
		frequencyMap.set(value, count);
	}

	const mode = Array.from(frequencyMap.entries()).reduce(
		({ v, c }, [value, count]) =>
			count > c ? { v: value, c: count } : { v, c },
		{ v: 0, c: 0 },
	);

	return mode.v;
}
