import type { DiceValue } from "@/profiles/attacker/types";

export function rollDie(sides: number): number {
	return Math.floor(Math.random() * sides) + 1;
}

export function rollDice(dice: DiceValue): number {
	if (!dice.includes("D")) return Number(dice);

	const [times, sides] = dice.split("D").map(Number);
	if ((times && times <= 0) || !sides || sides <= 0) {
		throw new Error(`Invalid dice format: ${dice}`);
	}

	let result = 0;
	for (let i = 0; i < (times || 1); i++) result += rollDie(sides);
	return result;
}
