import type { Weapon } from "@/profiles/attacker/types";

export interface WeaponResult {
	attacks: number;
	hits: number;
	wounds: number;
	failedSaves: number;
	damage: number;
}

export interface WeaponSimulationData {
	weapon: Weapon;
	results: WeaponResult[];
}

export interface SimulationData {
	weapons: WeaponSimulationData[];
}

export interface StatisticalResult {
	mean: number;
	median: number;
	mode: number;
	min: number;
	max: number;
}

export interface WeaponStatisticalResult {
	weapon: Weapon;
	attacks: StatisticalResult;
	hits: StatisticalResult;
	wounds: StatisticalResult;
	failedSaves: StatisticalResult;
	damage: StatisticalResult;
}

export interface SimulationResult {
	weapons: WeaponStatisticalResult[];
}
