import { AttackerCard } from "@/components/attacker";

export default function Home() {
	return (
		<div>
			<nav className="flex h-10 items-center border-b bg-sidebar px-4">
				Cogitator
			</nav>
			<main className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2">
				<AttackerCard />
			</main>
		</div>
	);
}
