import { maxMessage, minMessage } from "@/lib/schema";
import z from "zod";
import {
	MAX_SAVE,
	MIN_MODELS,
	MIN_SAVE,
	MIN_TOUGHNESS,
	MIN_WOUNDS,
} from "./constants";

export const unitSchema = z.object({
	name: z.string(),
	models: z.coerce.number().min(MIN_MODELS, minMessage(MIN_MODELS)),
	toughness: z.coerce.number().min(MIN_TOUGHNESS, minMessage(MIN_TOUGHNESS)),
	wounds: z.coerce.number().min(MIN_WOUNDS, minMessage(MIN_WOUNDS)),
	save: z.coerce
		.number()
		.min(MIN_SAVE, minMessage(MIN_SAVE))
		.max(MAX_SAVE, maxMessage(MAX_SAVE)),
	invSave: z.union([
		z.literal(""),
		z.coerce
			.number()
			.min(MIN_SAVE, minMessage(MIN_SAVE))
			.max(MAX_SAVE, maxMessage(MAX_SAVE)),
	]),
	feelNoPain: z.union([
		z.literal(""),
		z.coerce
			.number()
			.min(MIN_SAVE, minMessage(MIN_SAVE))
			.max(MAX_SAVE, maxMessage(MAX_SAVE)),
	]),
});
