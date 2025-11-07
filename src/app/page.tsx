"use client";

import { AttackerCard } from "@/components/attacker";
import { DefenderUnitCard } from "@/components/defender";
import { useProfilesForm } from "@/hooks/profiles";
import { useSimulation } from "@/hooks/simulation";
import { SimulationCard } from "@/simulation/components";
import Image from "next/image";
import type { FormEvent } from "react";
import { FormProvider } from "react-hook-form";

export default function Home() {
	const form = useProfilesForm();
	const simulation = useSimulation();

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		const attacker = form.getValues("attacker");
		const defender = form.getValues("defender");
		simulation.run(attacker, defender);
		form.handleSubmit(() => {});
	}

	return (
		<div>
			<nav className="flex h-10 items-center justify-center border-b bg-sidebar">
				<Image
					src="/logo.png"
					alt="Cogitator"
					height={18}
					width={72}
					priority
					className="h-18 w-auto translate-y-0.5"
				/>
			</nav>
			<FormProvider {...form}>
				<main>
					<form
						id="profiles"
						onSubmit={(e) => onSubmit(e)}
						className="grid h-full grid-cols-1 gap-2 p-2 md:grid-cols-2"
					>
						<div className="flex flex-col gap-2">
							<AttackerCard />
							<DefenderUnitCard />
						</div>
						<SimulationCard />
					</form>
				</main>
			</FormProvider>
		</div>
	);
}
