import { ProfilesContext } from "@/context/profiles";
import { emptyNumberFieldValue } from "@/lib/form";
import { randomWeaponName } from "@/lib/weapon";
import type { Weapon } from "@/types/weapon";
import { useContext } from "react";

export function useAttacker() {
	const { weapons, setWeapons } = useContext(ProfilesContext);

	function create() {
		const newWeapon: Weapon = {
			id: crypto.randomUUID(),
			name: randomWeaponName(),
			attacks: "",
			skill: emptyNumberFieldValue(),
			strength: emptyNumberFieldValue(),
			ap: emptyNumberFieldValue(),
			damage: "",
			keywords: [],
		};
		setWeapons([...weapons, newWeapon]);
	}

	function update(id: Weapon["id"], data: Partial<Weapon>) {
		setWeapons(
			weapons.map((weapon) =>
				weapon.id === id ? { ...weapon, ...data } : weapon,
			),
		);
	}

	function remove(id: Weapon["id"]) {
		setWeapons(weapons.filter((weapon) => weapon.id !== id));
	}

	function findIndex(id: Weapon["id"]) {
		return weapons.findIndex((weapon) => weapon.id === id);
	}

	function drag(fromIndex: number, toIndex: number) {
		const updatedWeapons = [...weapons];
		const [movedWeapon] = updatedWeapons.splice(fromIndex, 1);
		if (!movedWeapon) {
			throw new Error("Weapon not found during drag operation");
		}

		updatedWeapons.splice(toIndex, 0, movedWeapon);
		setWeapons(updatedWeapons);
	}

	return {
		all: weapons,
		create,
		update,
		remove,
		drag,
		findIndex,
	};
}
