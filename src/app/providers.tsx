import { SimulationProvider } from "@/context/simulation";

export default function Providers({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return <SimulationProvider>{children}</SimulationProvider>;
}
