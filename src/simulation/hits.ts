import type { Weapon } from "@/profiles/attacker/types";
import { rollDie } from "./dice";
import { KeywordEnum, ModifierEnum } from "@/profiles/attacker/constants";

export function getHitKeywords(weapon: Weapon) {
	const lethals = weapon.keywords.includes(KeywordEnum.LethalHits);
	const sustained1 = weapon.keywords.includes(KeywordEnum.SustainedHits1);
	const sustained2 = weapon.keywords.includes(KeywordEnum.SustainedHits2);
	const sustainedD3 = weapon.keywords.includes(KeywordEnum.SustainedHitsD3);

	return { lethals, sustained1, sustained2, sustainedD3 };
}

export function getHitModifiers(weapon: Weapon) {
	const rerollOnes = weapon.modifiers.includes(ModifierEnum.ReRollOnesToHit);
	const rerollFailed = weapon.modifiers.includes(ModifierEnum.ReRollFailedHits);
	const rerollNonCrit = weapon.modifiers.includes(
		ModifierEnum.ReRollNonCritHits,
	);

	return { rerollOnes, rerollFailed, rerollNonCrit };
}

export function getCriticalHitMinRoll(weapon: Weapon) {
	return weapon.modifiers.includes(ModifierEnum.HitsCritOn5) ? 5 : 6;
}

export function rerollsHits(weapon: Weapon) {
	return (
		weapon.modifiers.includes(ModifierEnum.ReRollOnesToHit) ||
		weapon.modifiers.includes(ModifierEnum.ReRollFailedHits) ||
		weapon.modifiers.includes(ModifierEnum.ReRollNonCritHits)
	);
}

export function shouldRerollHit(roll: number, weapon: Weapon) {
	const { rerollOnes, rerollFailed, rerollNonCrit } = getHitModifiers(weapon);
	if (rerollOnes && roll === 1) return true;
	if (rerollFailed && roll < weapon.skill) return true;
	if (rerollNonCrit && roll < getCriticalHitMinRoll(weapon)) return true;
	return false;
}

export function rollHits(weapon: Weapon, attacks: number) {
	let hits = 0;
	let wounds = 0;

	const critOn = getCriticalHitMinRoll(weapon);
	const { lethals, sustained1, sustained2, sustainedD3 } =
		getHitKeywords(weapon);

	for (let i = 0; i < attacks; i++) {
		let roll = rollDie(6);
		if (shouldRerollHit(roll, weapon)) roll = rollDie(6);
		if (roll >= weapon.skill && roll < critOn) {
			hits++;
		} else if (roll >= critOn) {
			if (!lethals && !sustained1 && !sustained2 && !sustainedD3) {
				hits++;
			} else {
				if (lethals) wounds++;
				if (sustained1) hits++;
				if (sustained2) hits += 2;
				if (sustainedD3) hits += rollDie(3);
			}
		}
	}

	return { hits, wounds };
}
