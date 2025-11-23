import type { Attacker } from "@/profiles/attacker/types";
import type { SimulationData, UnitResult } from "./types";
import type { Defender } from "@/profiles/defender/types";

export function initData(
	attacker: Attacker,
	defender: Defender,
): SimulationData {
	return {
		attacker: attacker.map((weapon) => ({
			weapon,
			results: [],
		})),
		defender: defender.map((unit) => ({
			unit,
			results: [],
		})),
	};
}

export function updateWeaponData(
	data: SimulationData,
	index: number,
	attacks: number,
	hits: number,
	wounds: number,
	failedSaves: number,
	damage: number,
) {
	if (!data.attacker[index]) throw new Error("Weapon index out of bounds");

	data.attacker[index].results.push({
		attacks,
		hits,
		wounds,
		failedSaves,
		damage,
	});
}

export function updateDefenderData(data: SimulationData, result: UnitResult[]) {
	data.defender.forEach((unitData, index) => {
		if (!result[index]) throw new Error("Unit index out of bounds");

		unitData.results.push(result[index]);
	});
}
