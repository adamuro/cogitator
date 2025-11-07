import { emptyNumberFieldValue } from "@/lib/form";
import type { Weapon } from "./types";
import { WEAPON_NAMES } from "./constants";

export function randomWeaponName() {
	const index = Math.floor(Math.random() * WEAPON_NAMES.length);
	const name = WEAPON_NAMES[index];
	if (!name) throw new Error("Failed to select a random weapon name");

	return name;
}

export function newWeapon(): Weapon {
	return {
		name: randomWeaponName(),
		attacks: "",
		skill: emptyNumberFieldValue(),
		strength: emptyNumberFieldValue(),
		ap: emptyNumberFieldValue(),
		damage: "",
		keywords: [],
		modifiers: [],
	};
}
