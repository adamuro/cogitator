import type z from "zod";
import type { KEYWORDS, MODIFIERS } from "./constants";
import type { weaponSchema } from "./schema";

export type Keyword = (typeof KEYWORDS)[number];
export type Modifier = (typeof MODIFIERS)[number];
export type Weapon = z.infer<typeof weaponSchema>;
export type Attacker = Weapon[];
