export function processNumberFieldValue(
	value: string | number,
	min?: number,
	max?: number,
): number {
	if (value === "") return emptyNumberFieldValue();

	const number = Math.round(Number(value));
	if (Number.isNaN(number)) return emptyNumberFieldValue();
	if (min !== undefined && number < min) return min;
	if (max !== undefined && number > max) return max;
	return number;
}

/**
 * Returns a default value for empty number fields.
 * The use of `"" as unknown as number` allows form inputs to remain empty without causing type errors,
 * while still being treated as numbers in the application logic.
 * @returns A number representing an empty field.
 */
export function emptyNumberFieldValue() {
	return "" as unknown as number;
}
