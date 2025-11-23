import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useProfilesFormState } from "@/hooks/profiles";
import { useSimulation } from "@/hooks/simulation";
import { Play } from "lucide-react";
import { WeaponsResults } from "./weapon";
import { UnitsResults } from "./unit";

export function SimulationCard() {
	const simulation = useSimulation();
	const { isValid } = useProfilesFormState();
	console.log(simulation.result?.defender);

	return (
		<Card className="h-fit gap-2 pt-3 pb-4">
			<CardHeader className="gap-0 pr-3">
				<CardTitle className="flex w-full items-center justify-between py-0">
					<span className="text-sm">Simulation Results</span>
					<Button
						form="profiles"
						size="sm"
						className="flex items-center gap-2"
						disabled={!isValid}
					>
						<Play />
						Run Simulation
					</Button>
				</CardTitle>
				<CardDescription>
					Here are the results of your simulation.
				</CardDescription>
			</CardHeader>
			<CardContent>
				{simulation.result && (
					<>
						<WeaponsResults
							results={simulation.result.attacker}
							runs={simulation.runs}
						/>
						<UnitsResults
							results={simulation.result.defender}
							runs={simulation.runs}
						/>
					</>
				)}
			</CardContent>
		</Card>
	);
}
