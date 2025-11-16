import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { StatisticalResult, WeaponStatisticalResult } from "../types";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useState } from "react";

type TabValue = keyof StatisticalResult;

interface WeaponResultsProps {
	results: WeaponStatisticalResult[];
	runs: number;
}

export function WeaponsResults(props: WeaponResultsProps) {
	const [tab, setTab] = useState<TabValue>("mean");

	return (
		<>
			<Tabs
				value={tab}
				onValueChange={(value) => setTab(value as TabValue)}
				className="items-center py-2"
			>
				<TabsList>
					<TabsTrigger value="mean">Mean</TabsTrigger>
					<TabsTrigger value="median">Median</TabsTrigger>
					<TabsTrigger value="mode">Mode</TabsTrigger>
					<TabsTrigger value="min">Min</TabsTrigger>
					<TabsTrigger value="max">Max</TabsTrigger>
				</TabsList>
			</Tabs>
			<Table>
				<TableCaption>Simulated {props.runs} times</TableCaption>
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
					{props.results.map((result) => (
						<TableRow key={result.weapon.name}>
							<TableCell>{result.weapon.name}</TableCell>
							<TableCell>{result.attacks[tab]}</TableCell>
							<TableCell>{result.hits[tab]}</TableCell>
							<TableCell>{result.wounds[tab]}</TableCell>
							<TableCell>{result.failedSaves[tab]}</TableCell>
							<TableCell>{result.damage[tab]}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}
