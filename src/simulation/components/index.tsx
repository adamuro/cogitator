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
import { Separator } from "@/components/ui/separator";

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
						className="flex items-center gap-2 translate-y-2 -translate-x-2"
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
				{simulation.error && (
					<div className="flex flex-col gap-1 text-destructive text-sm">
						<h3 className="font-semibold">Simulation error 😓</h3>
						<p>{simulation.error}</p>
					</div>
				)}
				{simulation.result && (
					<>
						<Separator />
						<h2 className="mt-4 mb-2 text-center font-semibold text-sm">
							Attacker Results
						</h2>
						<WeaponsResults
							results={simulation.result.attacker}
							runs={simulation.runs}
						/>
						<h2 className="mt-4 mb-2 text-center font-semibold text-sm">
							Defender Results
						</h2>
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
