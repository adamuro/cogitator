import { SimulationContext } from "@/context/simulation";
import type { Attacker } from "@/profiles/attacker/types";
import type { Defender } from "@/profiles/defender/types";
import { api } from "@/trpc/react";
import { useContext } from "react";

export function useSimulation() {
	const simulation = useContext(SimulationContext);
	const runSimulation = api.simulation.run.useMutation({
		onSuccess: (result) => {
			simulation.setError(null);
			simulation.setResult(result);
		},
		onError: (err) => simulation.setError(err.message),
	});

	function run(attacker: Attacker, defender: Defender) {
		runSimulation.mutate({
			profiles: { attacker, defender },
			runs: simulation.runs,
		});
	}

	return {
		runs: simulation.runs,
		setRuns: simulation.setRuns,
		run,
		result: simulation.result,
		error: simulation.error,
	};
}
