import type { Attacker } from "@/profiles/attacker/types";
import type { SimulationData } from "./types";

export function initData(attacker: Attacker): SimulationData {
	return {
		weapons: attacker.map((weapon) => ({
			weapon,
			results: [],
		})),
	};
}

export function updateData(
	data: SimulationData,
	index: number,
	attacks: number,
	hits: number,
	wounds: number,
	failedSaves: number,
	damage: number,
) {
	if (!data.weapons[index]) throw new Error("Weapon index out of bounds");

	data.weapons[index].results.push({
		attacks,
		hits,
		wounds,
		failedSaves,
		damage,
	});
}
