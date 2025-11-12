import type { Weapon } from "@/profiles/attacker/types";

export interface WeaponSimulationResult {
	weapon: Weapon;
	attacks: number;
	hits: number;
	wounds: number;
	failedSaves: number;
	damage: number;
}

export interface SimulationResult {
	weapons: WeaponSimulationResult[];
	summary: {
		attacks: number;
		hits: number;
		wounds: number;
		failedSaves: number;
		damage: number;
	};
}
