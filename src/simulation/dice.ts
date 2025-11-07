export function rollDie(sides: number): number {
	return Math.floor(Math.random() * sides) + 1;
}

export function diceRollSumStr(dice: string): number {
	const [times, sides] = dice.split("D").map(Number);
	if ((times && times <= 0) || !sides || sides <= 0) {
		throw new Error(`Invalid dice format: ${dice}`);
	}

	let result = 0;
	console.log(times);
	for (let i = 0; i < (times || 1); i++) {
		result += rollDie(sides);
	}
	return result;
}

export function diceRollSumInt(times: number, sides: number): number {
	if (times <= 0 || sides <= 0) {
		throw new Error(`Invalid dice parameters: ${times}D${sides}`);
	}

	let result = 0;
	for (let i = 0; i < times; i++) result += rollDie(sides);
	return result;
}
