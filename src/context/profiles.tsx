import type { Defender } from "@/types/defender";
import type { Weapon } from "@/types/weapon";
import {
	createContext,
	useEffect,
	useState,
	type PropsWithChildren,
} from "react";

interface ProfilesContextType {
	weapons: Weapon[];
	setWeapons: (weapons: Weapon[]) => void;
	defenders: Defender[];
	setDefenders: (defenders: Defender[]) => void;
}

const initialState: ProfilesContextType = {
	weapons: [],
	setWeapons: () => null,
	defenders: [],
	setDefenders: () => null,
};

export const ProfilesContext = createContext(initialState);

export const ProfilesProvider = (props: PropsWithChildren) => {
	const [weapons, setWeapons] = useState<Weapon[]>(() => {
		if (typeof window === "undefined") return [];
		const saved = localStorage.getItem("weapons");
		if (!saved) return [];

		try {
			return JSON.parse(saved) as Weapon[];
		} catch {
			return [];
		}
	});
	const [defenders, setDefenders] = useState<Defender[]>([]);

	useEffect(() => {
		if (typeof window === "undefined") return;
		localStorage.setItem("weapons", JSON.stringify(weapons));
	}, [weapons]);

	const value: ProfilesContextType = {
		weapons,
		setWeapons,
		defenders,
		setDefenders,
	};

	return (
		<ProfilesContext.Provider value={value}>
			{props.children}
		</ProfilesContext.Provider>
	);
};
