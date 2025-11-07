import type { Attacker } from "@/profiles/attacker/types";
import type { Defender } from "@/profiles/defender/types";
import { getAttacksNumber } from "./attacks";
import { rollHits } from "./hits";
import type { SimulationResult } from "./types";

export function simulate(
	attacker: Attacker,
	defender: Defender,
	times: number,
): SimulationResult {
	const result: SimulationResult = {
		weaponResults: {},
		summary: {
			attacks: 0,
			hits: 0,
			wounds: 0,
		},
	};

	for (let i = 0; i < times; i++) {
		for (const weapon of attacker) {
			const attacks = getAttacksNumber(weapon);
			const { hits, wounds } = rollHits(weapon, attacks);

			result.summary.attacks += attacks;
			result.summary.hits += hits;
			result.summary.wounds += wounds;
			const attacksSum =
				result.weaponResults[weapon.name]?.attacks ?? 0 + attacks;
			const hitsSum = result.weaponResults[weapon.name]?.hits ?? 0 + hits;
			const woundsSum = result.weaponResults[weapon.name]?.wounds ?? 0 + wounds;
			result.weaponResults[weapon.name] = {
				attacks: attacksSum,
				hits: hitsSum,
				wounds: woundsSum,
			};
		}
	}

	result.weaponResults = Object.fromEntries(
		Object.entries(result.weaponResults).map(([weaponName, weaponResult]) => [
			weaponName,
			{
				attacks: Math.round((weaponResult.attacks / times) * 100) / 100,
				hits: Math.round((weaponResult.hits / times) * 100) / 100,
				wounds: Math.round((weaponResult.wounds / times) * 100) / 100,
			},
		]),
	);
	result.summary = {
		attacks: Math.round((result.summary.attacks / times) * 100) / 100,
		hits: Math.round((result.summary.hits / times) * 100) / 100,
		wounds: Math.round((result.summary.wounds / times) * 100) / 100,
	};

	return result;
}
