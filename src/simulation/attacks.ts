import type { Weapon } from "@/profiles/attacker/types";
import { diceRollSumStr } from "./dice";

export function getAttacksNumber(weapon: Weapon) {
	return weapon.attacks.includes("D")
		? diceRollSumStr(weapon.attacks)
		: Number(weapon.attacks);
}
