export type WeaponsSimulationResults = Record<string, WeaponSimulationResult>;

export interface WeaponSimulationResult {
	attacks: number;
	hits: number;
	wounds: number;
}

export interface SimulationResult {
	weaponResults: WeaponsSimulationResults;
	summary: {
		attacks: number;
		hits: number;
		wounds: number;
	};
}
