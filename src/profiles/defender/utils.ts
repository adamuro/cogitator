import { emptyNumberFieldValue } from "@/lib/form";
import { UNIT_NAMES } from "./constants";
import type { Defender, Unit } from "./types";

export function randomUnitName(defender: Defender): string {
	const usedNames = defender.map(({ name }) => name);
	const unusedNames = UNIT_NAMES.filter((name) => !usedNames.includes(name));
	const units = unusedNames.length > 0 ? unusedNames : UNIT_NAMES;
	const index = Math.floor(Math.random() * units.length);
	const name = units[index];
	if (!name) throw new Error("Failed to select a random unit name");

	return name;
}

export function newUnit(defender: Defender): Unit {
	return {
		name: randomUnitName(defender),
		models: emptyNumberFieldValue(),
		toughness: emptyNumberFieldValue(),
		wounds: emptyNumberFieldValue(),
		save: emptyNumberFieldValue(),
		invSave: emptyNumberFieldValue(),
		feelNoPain: emptyNumberFieldValue(),
	};
}
