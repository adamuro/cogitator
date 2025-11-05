import { emptyNumberFieldValue } from "@/lib/form";
import { DICE_NUMBER_REGEX } from "@/lib/regex";
import { KEYWORDS } from "@/types/weapon";
import z from "zod";
import { maxMessage, minMessage } from "./utils";

export const MIN_SKILL = 1;
export const MAX_SKILL = 6;

export const MIN_STRENGTH = 1;

export const MIN_AP = 0;

export const weaponSchema = z.object({
	name: z.string(),
	attacks: z
		.string()
		.regex(
			DICE_NUMBER_REGEX,
			"Enter a valid number of attacks e.g. 4, D6, 2D3 (max 99).",
		),
	skill: z.coerce
		.number()
		.min(MIN_SKILL, minMessage(MIN_SKILL))
		.max(MAX_SKILL, maxMessage(MAX_SKILL)),
	strength: z.coerce.number().min(MIN_STRENGTH, minMessage(MIN_SKILL)),
	ap: z.coerce.number().min(0, minMessage(MIN_AP)),
	damage: z
		.string()
		.regex(DICE_NUMBER_REGEX, "Enter a valid damage e.g. 4, D6, 2D3 (max 99)."),
	keywords: z.array(
		z.object({
			type: z.enum(KEYWORDS),
			value: z
				.string()
				.regex(
					DICE_NUMBER_REGEX,
					"Enter a valid number e.g. 4, D6, 2D3 (max 99).",
				)
				.optional(),
		}),
	),
});

export type WeaponSchemaType = z.infer<typeof weaponSchema>;

export const DEFAULT_WEAPON_VALUES: WeaponSchemaType = {
	name: "",
	attacks: "",
	skill: emptyNumberFieldValue(),
	strength: emptyNumberFieldValue(),
	ap: emptyNumberFieldValue(),
	damage: "",
	keywords: [],
};
