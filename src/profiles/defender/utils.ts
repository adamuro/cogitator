import { emptyNumberFieldValue } from "@/lib/form";
import { UNIT_NAMES } from "./constants";
import type { Unit } from "./types";

export function randomUnitName() {
	const index = Math.floor(Math.random() * UNIT_NAMES.length);
	const name = UNIT_NAMES[index];
	if (!name) throw new Error("Failed to select a random unit name");

	return name;
}

export function newUnit(): Unit {
	return {
		name: randomUnitName(),
		models: emptyNumberFieldValue(),
		toughness: emptyNumberFieldValue(),
		wounds: emptyNumberFieldValue(),
		save: emptyNumberFieldValue(),
		invSave: emptyNumberFieldValue(),
		feelNoPain: emptyNumberFieldValue(),
	};
}
