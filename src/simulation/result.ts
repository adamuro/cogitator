import type { Attacker, Weapon } from "@/profiles/attacker/types";
import type { SimulationResult } from "./types";

export function initResult(attacker: Attacker): SimulationResult {
	return {
		weapons: attacker.map((weapon) => ({
			weapon,
			attacks: 0,
			hits: 0,
			wounds: 0,
			failedSaves: 0,
			damage: 0,
		})),
		summary: {
			attacks: 0,
			hits: 0,
			wounds: 0,
			failedSaves: 0,
			damage: 0,
		},
	};
}

export function updateResult(
	result: SimulationResult,
	weapon: Weapon,
	index: number,
	attacks: number,
	hits: number,
	wounds: number,
	failedSaves: number,
	damage: number,
) {
	if (!result.weapons[index]) throw new Error("Weapon index out of bounds");

	const attacksSum = result.weapons[index].attacks + attacks;
	const hitsSum = result.weapons[index].hits + hits;
	const woundsSum = result.weapons[index].wounds + wounds;
	const failedSavesSum = result.weapons[index].failedSaves + failedSaves;
	const damageSum = result.weapons[index].damage + damage;

	result.weapons[index] = {
		weapon: weapon,
		attacks: attacksSum,
		hits: hitsSum,
		wounds: woundsSum,
		failedSaves: failedSavesSum,
		damage: damageSum,
	};

	result.summary.attacks += attacks;
	result.summary.hits += hits;
	result.summary.wounds += wounds;
	result.summary.failedSaves += failedSaves;
	result.summary.damage += damage;
}

export function updateWeaponResult(
	result: SimulationResult,
	weapon: Weapon,
	index: number,
	attacks: number,
	hits: number,
	wounds: number,
	failedSaves: number,
	damage: number,
) {
	if (!result.weapons[index]) throw new Error("Weapon index out of bounds");

	const attacksSum = result.weapons[index].attacks + attacks;
	const hitsSum = result.weapons[index].hits + hits;
	const woundsSum = result.weapons[index].wounds + wounds;
	const failedSavesSum = result.weapons[index].failedSaves + failedSaves;
	const damageSum = result.weapons[index].damage + damage;

	result.weapons[index] = {
		weapon: weapon,
		attacks: attacksSum,
		hits: hitsSum,
		wounds: woundsSum,
		failedSaves: failedSavesSum,
		damage: damageSum,
	};
}

export function calculateAverages(result: SimulationResult, times: number) {
	result.weapons = result.weapons.map((result) => ({
		weapon: result.weapon,
		attacks: Math.round((result.attacks / times) * 10) / 10,
		hits: Math.round((result.hits / times) * 10) / 10,
		wounds: Math.round((result.wounds / times) * 10) / 10,
		failedSaves: Math.round((result.failedSaves / times) * 10) / 10,
		damage: Math.round((result.damage / times) * 10) / 10,
	}));

	result.summary = {
		attacks: Math.round((result.summary.attacks / times) * 10) / 10,
		hits: Math.round((result.summary.hits / times) * 10) / 10,
		wounds: Math.round((result.summary.wounds / times) * 10) / 10,
		failedSaves: Math.round((result.summary.failedSaves / times) * 10) / 10,
		damage: Math.round((result.summary.damage / times) * 10) / 10,
	};
}
