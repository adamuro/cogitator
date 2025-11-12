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

export function SimulationCard() {
	const simulation = useSimulation();
	const { isValid } = useProfilesFormState();

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
				{simulation.result?.weaponResults && (
					<div>
						<p>Simulated {simulation.runs} times</p>
						<p>Average attacks: {simulation.result.summary.attacks}</p>
						<p>Average hits: {simulation.result.summary.hits}</p>
						<p>Average wounds: {simulation.result.summary.wounds}</p>
					</div>
				)}
				{simulation.result?.weaponResults &&
					Object.entries(simulation.result.weaponResults).map(([name, res]) => (
						<div key={name} className="mt-4">
							<h3 className="font-semibold">{name}</h3>
							<p>Average attacks: {res.attacks}</p>
							<p>Average hits: {res.hits}</p>
							<p>Average wounds: {res.wounds}</p>
						</div>
					))}
			</CardContent>
		</Card>
	);
}
