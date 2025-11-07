import { DICE_NUMBER_REGEX } from "@/lib/regex";
import z from "zod";
import {
	KEYWORDS,
	MAX_SKILL,
	MIN_AP,
	MIN_SKILL,
	MIN_STRENGTH,
	MODIFIERS,
} from "./constants";
import { maxMessage, minMessage } from "@/lib/schema";

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
	strength: z.coerce.number().min(MIN_STRENGTH, minMessage(MIN_STRENGTH)),
	ap: z.coerce.number().min(0, minMessage(MIN_AP)),
	damage: z
		.string()
		.regex(DICE_NUMBER_REGEX, "Enter a valid damage e.g. 4, D6, 2D3 (max 99)."),
	keywords: z.array(z.enum(KEYWORDS)),
	modifiers: z.array(z.enum(MODIFIERS)),
});
