import z from "zod";
import { weaponSchema } from "./attacker/schema";
import { unitSchema } from "./defender/schema";

export const profilesSchema = z.object({
	attacker: z.array(weaponSchema),
	defender: z.array(unitSchema),
});

export type ProfilesSchemaType = z.infer<typeof profilesSchema>;
