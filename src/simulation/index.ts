import type { Attacker, DiceValue, Weapon } from "@/profiles/attacker/types";
import type { Defender } from "@/profiles/defender/types";
import { rollHits } from "./hits";
import type { SimulationResult } from "./types";
import { rollWounds } from "./wounds";
import { rollSaves } from "./saves";
import { SimDefender } from "./defender";
import { rollDice } from "./dice";
import { initData, updateData } from "./data";
import { calculateSimulationResult } from "./result";

export function simulate(
	attacker: Attacker,
	defender: Defender,
	runs: number,
): SimulationResult {
	const data = initData(attacker);

	for (let i = 0; i < runs; i++) {
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

			updateData(
				data,
				index,
				attacks,
				hits + lethals,
				wounds + lethals,
				failedSaves,
				damage,
			);
		}
	}

	const result = calculateSimulationResult(data, runs);
	return result;
}
