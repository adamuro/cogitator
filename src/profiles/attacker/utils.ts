import { emptyNumberFieldValue } from "@/lib/form";
import { WEAPON_NAMES } from "./constants";
import type { Attacker, DiceValue, Weapon } from "./types";

export function randomWeaponName(attacker: Attacker): string {
	const usedNames = attacker.map(({ name }) => name);
	const unusedNames = WEAPON_NAMES.filter((name) => !usedNames.includes(name));
	const weapons = unusedNames.length > 0 ? unusedNames : WEAPON_NAMES;
	const index = Math.floor(Math.random() * weapons.length);
	const name = weapons[index];
	if (!name) throw new Error("Failed to select a random weapon name");

	return name;
}

export function newWeapon(attacker: Attacker): Weapon {
	return {
		name: randomWeaponName(attacker),
		attacks: "" as unknown as DiceValue,
		skill: emptyNumberFieldValue(),
		strength: emptyNumberFieldValue(),
		ap: emptyNumberFieldValue(),
		damage: "" as unknown as DiceValue,
		keywords: [],
		modifiers: [],
	};
}
