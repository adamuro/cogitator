import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
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
				{simulation.result && (
					<Table>
						<TableCaption>Simulated {simulation.runs} times</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Weapon</TableHead>
								<TableHead>Attacks</TableHead>
								<TableHead>Hits</TableHead>
								<TableHead>Wounds</TableHead>
								<TableHead>Failed Saves</TableHead>
								<TableHead>Damage</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{simulation.result.weapons.map((result) => (
								<TableRow key={result.weapon.name}>
									<TableCell>{result.weapon.name}</TableCell>
									<TableCell>{result.attacks}</TableCell>
									<TableCell>{result.hits}</TableCell>
									<TableCell>{result.wounds}</TableCell>
									<TableCell>{result.failedSaves}</TableCell>
									<TableCell>{result.damage}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</CardContent>
		</Card>
	);
}
