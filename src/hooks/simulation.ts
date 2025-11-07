import { SimulationContext } from "@/context/simulation";
import type { Attacker } from "@/profiles/attacker/types";
import type { Defender } from "@/profiles/defender/types";
import { simulate } from "@/simulation";
import { useContext } from "react";

export function useSimulation() {
	const simulation = useContext(SimulationContext);

	function run(attacker: Attacker, defender: Defender) {
		const result = simulate(attacker, defender, simulation.runs);
		simulation.setResult(result);
	}

	return {
		runs: simulation.runs,
		setRuns: simulation.setRuns,
		run,
		result: simulation.result,
	};
}
