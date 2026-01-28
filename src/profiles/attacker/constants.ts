import type { MultiSelectOption } from "@/components/ui/multi-select";
import { emptyNumberFieldValue } from "@/lib/form";
import type { DiceValue, Weapon } from "./types";
// import { randomWeaponName } from "./utils";

/* Value ranges */
export const MIN_SKILL = 1;
export const MAX_SKILL = 6;
export const MIN_STRENGTH = 1;
export const MIN_AP = 0;

/* Keywords and Modifiers */
export enum KeywordEnum {
	LethalHits = "LETHAL HITS",
	SustainedHits1 = "SUSTAINED HITS 1",
	SustainedHits2 = "SUSTAINED HITS 2",
	SustainedHitsD3 = "SUSTAINED HITS D3",
	DevastatingWounds = "DEVASTATING WOUNDS",
	TwinLinked = "TWIN-LINKED",
	Lance = "LANCE",
}

export const KEYWORDS = [
	KeywordEnum.LethalHits,
	KeywordEnum.SustainedHits1,
	KeywordEnum.SustainedHits2,
	KeywordEnum.SustainedHitsD3,
	KeywordEnum.DevastatingWounds,
	KeywordEnum.TwinLinked,
	KeywordEnum.Lance,
] as const;

export const KEYWORD_SELECT_OPTIONS: MultiSelectOption[] = KEYWORDS.map(
	(keyword) => ({
		label: keyword,
		value: keyword,
	}),
);

export enum ModifierEnum {
	HitsCritOn5 = "Hits crit on 5+",
	WoundsCritOn5 = "Wounds crit on 5+",
	ReRollOnesToHit = "Reroll 1 to hit",
	ReRollFailedHits = "Reroll failed hits",
	ReRollNonCritHits = "Reroll non-crit hits",
	ReRollOnesToWound = "Reroll 1 to wound",
	ReRollFailedWounds = "Reroll failed wounds",
	ReRollNonCritWounds = "Reroll non-crit wounds",
}

export const MODIFIERS = [
	ModifierEnum.HitsCritOn5,
	ModifierEnum.WoundsCritOn5,
	ModifierEnum.ReRollOnesToHit,
	ModifierEnum.ReRollFailedHits,
	ModifierEnum.ReRollNonCritHits,
	ModifierEnum.ReRollOnesToWound,
	ModifierEnum.ReRollFailedWounds,
	ModifierEnum.ReRollNonCritWounds,
] as const;

export const MODIFIER_SELECT_OPTIONS: MultiSelectOption[] = MODIFIERS.map(
	(modifier) => ({
		label: modifier,
		value: modifier,
	}),
);

/* Default values*/
export const DEFAULT_WEAPON_VALUES: Weapon = {
	name: "",
	attacks: "" as unknown as DiceValue,
	skill: emptyNumberFieldValue(),
	strength: emptyNumberFieldValue(),
	ap: emptyNumberFieldValue(),
	damage: "" as unknown as DiceValue,
	keywords: [],
	modifiers: [],
} as const;

/* Placeholders */
export const WEAPON_NAMES = [
	"Assault Cannon",
	"Boltgun",
	"Chainsword",
	"Heavy Bolter",
	"Laspistol",
	"Plasma Gun",
	"Power Fist",
	"Power Sword",
	"Shotgun",
	"Sniper Rifle",
	"Storm Bolter",
	"Twin Linked Bolter",
	"Vindicator",
	"Whirlwind",
	"Autocannon",
	"Meltagun",
	"Flamer",
	"Grenade Launcher",
	"Rocket Launcher",
	"Thunder Hammer",
	"Power Maul",
	"Bionic Arm",
	"Combat Knife",
	"Frag Grenade",
	"Krak Grenade",
	"Photon Grenade",
	"Melta Bomb",
	"Demonfire",
	"Inferno Bolt",
	"Hellfire Round",
] as const;
