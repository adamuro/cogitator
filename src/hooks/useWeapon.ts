import { ProfilesContext } from "@/context/profiles";
import { processNumberFieldValue } from "@/lib/form";
import { MAX_SKILL, MIN_AP, MIN_SKILL, MIN_STRENGTH } from "@/schemas/weapon";
import type { Keyword, KeywordType, Weapon } from "@/types/weapon";
import { useContext } from "react";

export function useWeapon(id: Weapon["id"]) {
	const { weapons, setWeapons } = useContext(ProfilesContext);

	const values = weapons.find((weapon) => weapon.id === id);
	if (!values) throw new Error(`Weapon with id ${id} not found`);

	function update(data: Partial<Weapon>) {
		setWeapons(
			weapons.map((weapon) =>
				weapon.id === id ? { ...weapon, ...data } : weapon,
			),
		);
	}

	function updateName(name: string) {
		update({ name });
	}

	function updateAttacks(attacks: string) {
		update({ attacks });
	}

	function updateSkill(skill: string | number) {
		update({ skill: processNumberFieldValue(skill, MIN_SKILL, MAX_SKILL) });
	}

	function updateStrength(strength: string | number) {
		update({ strength: processNumberFieldValue(strength, MIN_STRENGTH) });
	}

	function updateAp(ap: string | number) {
		update({ ap: processNumberFieldValue(ap, MIN_AP) });
	}

	function updateDamage(damage: string) {
		update({ damage });
	}

	function addKeyword(keyword: Keyword) {
		update({ keywords: [...(values?.keywords ?? []), keyword] });
	}

	function removeKeyword(keyword: Keyword) {
		update({
			keywords: values?.keywords?.filter((k) => k !== keyword) ?? [],
		});
	}

	function updateKeywords(types: KeywordType[]) {
		update({ keywords: types.map((type) => ({ type })) });
	}

	function remove() {
		setWeapons(weapons.filter((weapon) => weapon.id !== id));
	}

	return {
		values,
		...values,
		update,
		updateName,
		updateAttacks,
		updateSkill,
		updateStrength,
		updateAp,
		updateDamage,
		addKeyword,
		updateKeywords,
		removeKeyword,
		remove,
	};
}
