import type { Defender, Unit } from "@/profiles/defender/types";
import { th } from "zod/v4/locales";
import type { UnitResult } from "./types";

export class SimDefender {
	private originalDefender: Defender;
	private defender: Defender;
	private currentUnitIndex = 0;

	constructor(defender: Defender) {
		if (defender.length === 0) {
			throw new Error("Defender must have at least one unit.");
		}

		this.originalDefender = structuredClone(defender);
		this.defender = structuredClone(defender);
	}

	private get currentUnitMaxWounds(): number {
		const unit = this.originalDefender[this.currentUnitIndex];
		if (!unit) throw new Error("No current unit available.");

		return unit.wounds;
	}

	public get units(): Defender {
		return this.defender;
	}

	public get currentUnit(): Unit {
		const unit = this.defender[this.currentUnitIndex] ?? this.defender[0];
		if (!unit) throw new Error("No current unit available.");

		return unit;
	}

	public get isDefeated(): boolean {
		return this.defender.every((unit) => unit.models === 0);
	}

	public get summary(): UnitResult[] {
		return this.defender.map((unit, index) => {
			const originalUnit = this.originalDefender[index];
			if (!originalUnit) throw new Error("Original unit not found.");

			return {
				modelsRemaining: unit.models,
				woundsRemaining: unit.models * originalUnit.wounds + unit.wounds,
				modelsLost: originalUnit.models - unit.models,
				woundsLost:
					(originalUnit.models - unit.models) * originalUnit.wounds +
					(originalUnit.wounds - unit.wounds) * (unit.models > 0 ? 1 : 0),
			};
		});
	}

	public takeDamage(damage: number): number {
		if (this.isDefeated) return 0;

		const wounds = this.currentUnit.wounds;
		this.currentUnit.wounds = Math.max(0, wounds - damage);
		if (this.currentUnit.wounds > 0) return damage;

		this.currentUnit.models -= 1;
		if (this.isDefeated) return wounds;
		if (this.currentUnit.models === 0) this.currentUnitIndex++;
		this.currentUnit.wounds = this.currentUnitMaxWounds;

		return wounds;
	}
}
