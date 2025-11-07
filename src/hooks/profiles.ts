import { DEFAULT_PROFILES_VALUES } from "@/profiles/constants";
import { type ProfilesSchemaType, profilesSchema } from "@/profiles/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
	useFieldArray,
	useForm,
	useFormContext,
	useFormState,
} from "react-hook-form";

export function useProfilesForm() {
	const form = useForm<ProfilesSchemaType>({
		resolver: zodResolver(profilesSchema),
		mode: "all",
		defaultValues: async (): Promise<ProfilesSchemaType> => {
			const stored = localStorage.getItem("profiles");
			if (!stored) return DEFAULT_PROFILES_VALUES;
			return JSON.parse(stored) as ProfilesSchemaType;
		},
	});

	const values = form.watch();
	useEffect(() => {
		localStorage.setItem("profiles", JSON.stringify(values));
	}, [values]);

	return form;
}

export function useProfilesFormState() {
	const form = useProfilesFormContext();
	return useFormState<ProfilesSchemaType>({
		control: form.control,
	});
}

export function useAttackerFieldArray() {
	const form = useProfilesFormContext();
	const attacker = useFieldArray<ProfilesSchemaType>({
		control: form.control,
		name: "attacker",
	});

	return attacker;
}

export function useDefenderFieldArray() {
	const form = useProfilesFormContext();
	const defender = useFieldArray<ProfilesSchemaType>({
		control: form.control,
		name: "defender",
	});

	return defender;
}

export function useProfilesFormContext() {
	return useFormContext<ProfilesSchemaType>();
}
