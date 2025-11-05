import type { MultiSelectOption } from "@/components/ui/multi-select";

export const KEYWORDS = [
	"LETHAL HITS",
	"SUSTAINED HITS 1",
	"SUSTAINED HITS 2",
	"SUSTAINED HITS D3",
	"DEVASTATING WOUNDS",
	"TWIN-LINKED",
	"LANCE",
	"BLAST",
] as const;

export type KeywordType = (typeof KEYWORDS)[number];

export interface Keyword {
	type: KeywordType;
	value?: string;
}

export interface Weapon {
	name: string;
	id: string;
	attacks: string;
	skill: number;
	strength: number;
	ap: number;
	damage: string;
	keywords: Keyword[];
}

export const KEYWORD_SELECT_OPTIONS: MultiSelectOption[] = KEYWORDS.map(
	(type) => ({
		label: type,
		value: type,
	}),
);
