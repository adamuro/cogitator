import type { Weapon } from "@/profiles/attacker/types";
import type { Unit } from "@/profiles/defender/types";
import { rollDice, rollDie } from "./dice";
import type { SimDefender } from "./defender";

export function getSaveMinRoll(weapon: Weapon, defender: Unit) {
	return Math.min(defender.save + (weapon.ap ?? 0), defender.invSave || 7);
}

export function rollSaves(
	wounds: number,
	weapon: Weapon,
	defender: SimDefender,
) {
	let failedSaves = 0;
	let damage = 0;

	for (let i = 0; i < wounds; i++) {
		const savesOn = getSaveMinRoll(weapon, defender.currentUnit);
		if (rollDie(6) >= savesOn) continue;

		const rolledDamage = rollDice(weapon.damage);
		failedSaves++;
		damage += defender.takeDamage(rolledDamage);
	}

	return { failedSaves, damage };
}
