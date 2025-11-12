import type { Attacker, DiceValue, Weapon } from "@/profiles/attacker/types";
import type { Defender } from "@/profiles/defender/types";
import { rollHits } from "./hits";
import type { SimulationResult } from "./types";
import { calculateAverages, initResult, updateResult } from "./result";
import { rollWounds } from "./wounds";
import { rollSaves } from "./saves";
import { SimDefender } from "./defender";
import { rollDice } from "./dice";

export function simulate(
	attacker: Attacker,
	defender: Defender,
	times: number,
): SimulationResult {
	const result = initResult(attacker);

	for (let i = 0; i < times; i++) {
		const simDefender = new SimDefender(defender);
		const totalDevs: DiceValue[] = [];

		for (const [index, weapon] of attacker.entries()) {
			const attacks = rollDice(weapon.attacks);
			const { hits, lethals } = rollHits(weapon, attacks);
			const { wounds, devs } = rollWounds(
				hits,
				weapon,
				simDefender.currentUnit,
			);
			totalDevs.push(...devs);

			const { failedSaves, damage } = rollSaves(
				wounds + lethals,
				weapon,
				simDefender,
			);

			updateResult(
				result,
				weapon,
				index,
				attacks,
				hits + lethals,
				lethals + wounds,
				failedSaves,
				damage,
			);
		}
	}

	calculateAverages(result, times);
	return result;
}
