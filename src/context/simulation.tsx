"use client";

import { DEFAULT_RUNS } from "@/simulation/constants";
import type { SimulationResult } from "@/simulation/types";
import type { SetStateType } from "@/types/state";
import { type PropsWithChildren, createContext, useState } from "react";

export interface SimulationContextValue {
	runs: number;
	setRuns: SetStateType<number>;
	result: SimulationResult | null;
	setResult: SetStateType<SimulationResult | null>;
}

const initialValue: SimulationContextValue = {
	runs: DEFAULT_RUNS,
	setRuns: () => {},
	result: null,
	setResult: () => {},
};

export const SimulationContext =
	createContext<SimulationContextValue>(initialValue);

export function SimulationProvider(props: PropsWithChildren) {
	const [runs, setRuns] = useState(DEFAULT_RUNS);
	const [result, setResult] = useState<SimulationResult | null>(null);

	const value: SimulationContextValue = {
		runs,
		setRuns,
		result,
		setResult,
	};

	return (
		<SimulationContext.Provider value={value}>
			{props.children}
		</SimulationContext.Provider>
	);
}
