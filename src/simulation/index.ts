import type { Attacker, Weapon } from "@/profiles/attacker/types";
import type { Defender } from "@/profiles/defender/types";
import { getAttacksNumber } from "./attacks";
import { rollHits } from "./hits";
import type { SimulationResult } from "./types";
import {
	calculateAverages,
	initResult,
	updateSummaryResult,
	updateWeaponResult,
} from "./result";
import { rollWounds } from "./wounds";

export function simulate(
	attacker: Attacker,
	defender: Defender,
	times: number,
): SimulationResult {
	const result = initResult();
	console.log(attacker[0]);
	console.log(defender[0]);

	for (let i = 0; i < times; i++) {
		for (const weapon of attacker) {
			if (!defender[0]) break;

			const attacks = getAttacksNumber(weapon);
			const { hits, lethals } = rollHits(weapon, attacks);
			const { wounds, devs } = rollWounds(hits, weapon, defender[0]);

			updateSummaryResult(result, attacks, hits, lethals + wounds);
			updateWeaponResult(result, weapon, attacks, hits, lethals + wounds);
		}
	}

	calculateAverages(result, times);
	console.log(result);
	return result;
}
