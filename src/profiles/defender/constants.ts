import { emptyNumberFieldValue } from "@/lib/form";
import type { Defender, Unit } from "./types";

/* Value ranges */
export const MIN_MODELS = 1;
export const MIN_SKILL = 1;
export const MIN_TOUGHNESS = 1;
export const MIN_WOUNDS = 1;
export const MIN_SAVE = 2;
export const MAX_SAVE = 7;
export const MIN_INV_SAVE = 2;
export const MAX_INV_SAVE = 6;
export const MIN_FEEL_NO_PAIN = 2;
export const MAX_FEEL_NO_PAIN = 6;

/* Default values*/
export const DEFAULT_UNIT_VALUES: Unit = {
	name: "",
	models: emptyNumberFieldValue(),
	toughness: emptyNumberFieldValue(),
	wounds: emptyNumberFieldValue(),
	save: emptyNumberFieldValue(),
	invSave: emptyNumberFieldValue(),
	feelNoPain: emptyNumberFieldValue(),
} as const;

/* Placeholders */
export const UNIT_NAMES = [
	"Custodian Guards",
	"Terminator Squad",
	"Devastator Squad",
	"Tactical Squad",
	"Assault Squad",
	"Sternguard Veterans",
	"Vanguard Veterans",
	"Scout Squad",
	"Razorback",
	"Predator",
	"Land Raider",
	"Dreadnought",
	"Rhino",
	"Drop Pod",
	"Stormraven Gunship",
	"Vindicator",
	"Whirlwind",
	"Hammerhead Gunship",
	"Taurox Prime",
	"Scourges",
	"Dark Reapers",
	"Fire Dragons",
	"Pathfinders",
	"Broadside Battlesuits",
	"Riptide Battlesuit",
	"Ghostkeel Battlesuit",
	"Devilfish",
	"Skyray Gunship",
	"Stormsurge",
] as const;
