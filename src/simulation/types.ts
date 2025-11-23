import type { Weapon } from "@/profiles/attacker/types";
import type { Unit } from "@/profiles/defender/types";

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

export interface UnitResult {
	modelsRemaining: number;
	woundsRemaining: number;
	modelsLost: number;
	woundsLost: number;
}

export interface UnitSimulationData {
	unit: Unit;
	results: UnitResult[];
}

export interface SimulationData {
	attacker: WeaponSimulationData[];
	defender: UnitSimulationData[];
}

export interface StatisticalResult {
	mean: number;
	median: number;
	mode: number;
	min: number;
	max: number;
}

export type StatisticalResultEntry = keyof StatisticalResult;

export interface WeaponStatisticalResult {
	weapon: Weapon;
	attacks: StatisticalResult;
	hits: StatisticalResult;
	wounds: StatisticalResult;
	failedSaves: StatisticalResult;
	damage: StatisticalResult;
}

export interface UnitStatisticalResult {
	unit: Unit;
	modelsRemaining: StatisticalResult;
	woundsRemaining: StatisticalResult;
	modelsLost: StatisticalResult;
	woundsLost: StatisticalResult;
}

export interface SimulationResult {
	attacker: WeaponStatisticalResult[];
	defender: UnitStatisticalResult[];
}
