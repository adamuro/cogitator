import type z from "zod";
import type { unitSchema } from "./schema";

export type Unit = z.infer<typeof unitSchema>;
export type Defender = Unit[];
