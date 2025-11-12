import type { Weapon } from "@/profiles/attacker/types";
import type { SimulationResult } from "./types";

export function initResult(): SimulationResult {
	return {
		weaponResults: {},
		summary: {
			attacks: 0,
			hits: 0,
			wounds: 0,
		},
	};
}

export function updateSummaryResult(
	result: SimulationResult,
	attacks: number,
	hits: number,
	wounds: number,
) {
	result.summary.attacks += attacks;
	result.summary.hits += hits;
	result.summary.wounds += wounds;
}

export function updateWeaponResult(
	result: SimulationResult,
	weapon: Weapon,
	attacks: number,
	hits: number,
	wounds: number,
) {
	const attacksSum =
		(result.weaponResults[weapon.name]?.attacks ?? 0) + attacks;
	const hitsSum = (result.weaponResults[weapon.name]?.hits ?? 0) + hits;
	const woundsSum = (result.weaponResults[weapon.name]?.wounds ?? 0) + wounds;

	result.weaponResults[weapon.name] = {
		attacks: attacksSum,
		hits: hitsSum,
		wounds: woundsSum,
	};
}

export function calculateAverages(result: SimulationResult, times: number) {
	result.weaponResults = Object.fromEntries(
		Object.entries(result.weaponResults).map(([weaponName, weaponResult]) => [
			weaponName,
			{
				attacks: Math.round((weaponResult.attacks / times) * 10) / 10,
				hits: Math.round((weaponResult.hits / times) * 10) / 10,
				wounds: Math.round((weaponResult.wounds / times) * 10) / 10,
			},
		]),
	);
	result.summary = {
		attacks: Math.round((result.summary.attacks / times) * 10) / 10,
		hits: Math.round((result.summary.hits / times) * 10) / 10,
		wounds: Math.round((result.summary.wounds / times) * 10) / 10,
	};
}
