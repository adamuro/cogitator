import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import type { StatisticalResultEntry, UnitStatisticalResult } from "../types";

interface UnitResultsProps {
	results: UnitStatisticalResult[];
	runs: number;
}

export function UnitsResults(props: UnitResultsProps) {
	const [tab, setTab] = useState<StatisticalResultEntry>("mean");

	return (
		<>
			<Tabs
				value={tab}
				onValueChange={(value) => setTab(value as StatisticalResultEntry)}
				className="items-center py-2"
			>
				<TabsList>
					<TabsTrigger value="mean">Mean</TabsTrigger>
					<TabsTrigger value="median">Median</TabsTrigger>
					<TabsTrigger value="mode">Mode</TabsTrigger>
				</TabsList>
			</Tabs>
			<Table>
				<TableCaption>Simulated {props.runs} times</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Unit</TableHead>
						<TableHead>Models Lost</TableHead>
						<TableHead>Wounds Lost</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="border-b">
					{props.results.map((result) => (
						<TableRow key={result.unit.name}>
							<TableCell>{result.unit.name}</TableCell>
							<TableCell>{result.modelsLost[tab]}</TableCell>
							<TableCell>{result.woundsLost[tab]}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}
