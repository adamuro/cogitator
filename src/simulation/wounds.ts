import { KeywordEnum, ModifierEnum } from "@/profiles/attacker/constants";
import type { Weapon } from "@/profiles/attacker/types";
import type { Defender, Unit } from "@/profiles/defender/types";
import { rollDie } from "./dice";

export function getWoundKeywords(weapon: Weapon) {
	const devWounds = weapon.keywords.includes(KeywordEnum.DevastatingWounds);
	const twinLinked = weapon.keywords.includes(KeywordEnum.TwinLinked);
	const lance = weapon.keywords.includes(KeywordEnum.Lance);

	return { devWounds, twinLinked, lance };
}

export function getWoundModifiers(weapon: Weapon) {
	const rerollOnes = weapon.modifiers.includes(ModifierEnum.ReRollOnesToWound);
	const rerollFailed = weapon.modifiers.includes(
		ModifierEnum.ReRollFailedWounds,
	);
	const rerollNonCrit = weapon.modifiers.includes(
		ModifierEnum.ReRollNonCritWounds,
	);

	return { rerollOnes, rerollFailed, rerollNonCrit };
}

export function getWoundMinRoll(weapon: Weapon, unit: Unit) {
	const { lance } = getWoundKeywords(weapon);

	if (weapon.strength >= unit.toughness * 2) return 2;
	if (weapon.strength > unit.toughness) return lance ? 2 : 3;
	if (weapon.strength === unit.toughness) return lance ? 3 : 4;
	if (weapon.strength * 2 <= unit.toughness) return lance ? 5 : 6;
	return lance ? 4 : 5;
}

export function getCriticalWoundMinRoll(weapon: Weapon) {
	return weapon.modifiers.includes(ModifierEnum.WoundsCritOn5) ? 5 : 6;
}

export function shouldRerollWound(
	roll: number,
	weapon: Weapon,
	woundOn: number,
) {
	const { rerollOnes, rerollFailed, rerollNonCrit } = getWoundModifiers(weapon);
	const { twinLinked } = getWoundKeywords(weapon);

	if (rerollOnes && roll === 1) return true;
	if ((rerollFailed || twinLinked) && roll < woundOn) return true;
	if (rerollNonCrit && roll < getCriticalWoundMinRoll(weapon)) return true;
	return false;
}

export function rollWounds(hits: number, weapon: Weapon, defender: Unit) {
	let wounds = 0;
	let devs = 0;

	const woundOn = getWoundMinRoll(weapon, defender);
	const critOn = getCriticalWoundMinRoll(weapon);
	const { devWounds } = getWoundKeywords(weapon);

	for (let i = 0; i < hits; i++) {
		let roll = rollDie(6);
		if (shouldRerollWound(roll, weapon, woundOn)) roll = rollDie(6);
		if (devWounds && roll >= critOn) devs++;
		else if (roll >= woundOn) wounds++;
	}

	return { wounds, devs };
}
