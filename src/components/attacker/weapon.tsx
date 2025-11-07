"use client";

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group";
import { useProfilesFormContext } from "@/hooks/profiles";
import { processNumberFieldValue } from "@/lib/form";
import { randomWeaponName } from "@/profiles/attacker/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EllipsisVertical, Trash } from "lucide-react";
import { useMemo } from "react";
import { Controller } from "react-hook-form";
import {
	KEYWORD_SELECT_OPTIONS,
	MAX_SKILL,
	MIN_AP,
	MIN_SKILL,
	MIN_STRENGTH,
	MODIFIER_SELECT_OPTIONS,
} from "../../profiles/attacker/constants";
import { MultiSelect } from "../ui/multi-select";

interface WeaponProps {
	id: string;
	index: number;
	onRemove: () => void;
}

export function WeaponForm(props: WeaponProps) {
	const form = useProfilesFormContext();
	const placeholderName = useMemo(() => randomWeaponName(), []);

	/* DnD Kit Sortable */
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: props.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<li
			key={props.id}
			ref={setNodeRef}
			style={style}
			className="relative flex items-center space-x-4 space-y-6"
		>
			<FieldGroup
				key={props.id}
				className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5"
			>
				<Controller
					name={`attacker.${props.index}.attacks`}
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel>Attacks</FieldLabel>
							<Input
								{...field}
								aria-invalid={fieldState.invalid}
								placeholder="4, D6, 2D3"
								autoComplete="off"
								className="text-center"
								onChange={(e) => field.onChange(e.target.value)}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name={`attacker.${props.index}.skill`}
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel>BS/WS</FieldLabel>
							<InputGroup>
								<InputGroupInput
									{...field}
									aria-invalid={fieldState.invalid}
									type="number"
									autoComplete="off"
									className="text-center"
									onChange={(e) =>
										field.onChange(
											processNumberFieldValue(
												e.target.value,
												MIN_SKILL,
												MAX_SKILL,
											),
										)
									}
								/>
								<InputGroupAddon align="inline-start">
									<InputGroupButton
										onClick={() =>
											field.onChange(
												Math.max(MIN_SKILL, Number(field.value) - 1),
											)
										}
									>
										-
									</InputGroupButton>
								</InputGroupAddon>
								<InputGroupAddon align="inline-end">
									<InputGroupButton
										onClick={() =>
											field.onChange(
												Math.min(MAX_SKILL, Number(field.value) + 1),
											)
										}
									>
										+
									</InputGroupButton>
								</InputGroupAddon>
							</InputGroup>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name={`attacker.${props.index}.strength`}
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel>Strength</FieldLabel>
							<InputGroup>
								<InputGroupInput
									{...field}
									aria-invalid={fieldState.invalid}
									type="number"
									autoComplete="off"
									className="text-center"
									onChange={(e) =>
										field.onChange(
											processNumberFieldValue(e.target.value, MIN_STRENGTH),
										)
									}
								/>
								<InputGroupAddon align="inline-start">
									<InputGroupButton
										onClick={() =>
											field.onChange(
												Math.max(MIN_STRENGTH, Number(field.value) - 1),
											)
										}
									>
										-
									</InputGroupButton>
								</InputGroupAddon>
								<InputGroupAddon align="inline-end">
									<InputGroupButton
										onClick={() =>
											field.onChange(
												Math.min(MAX_SKILL, Number(field.value) + 1),
											)
										}
									>
										+
									</InputGroupButton>
								</InputGroupAddon>
							</InputGroup>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name={`attacker.${props.index}.ap`}
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel>AP</FieldLabel>
							<InputGroup>
								<InputGroupInput
									{...field}
									aria-invalid={fieldState.invalid}
									type="number"
									autoComplete="off"
									className="text-center"
									onChange={(e) =>
										field.onChange(
											processNumberFieldValue(e.target.value, MIN_AP),
										)
									}
								/>
								<InputGroupAddon align="inline-start">
									<InputGroupButton
										onClick={() =>
											field.onChange(Math.max(MIN_AP, Number(field.value) - 1))
										}
									>
										-
									</InputGroupButton>
								</InputGroupAddon>
								<InputGroupAddon align="inline-end">
									<InputGroupButton
										onClick={() => field.onChange(Number(field.value) + 1)}
									>
										+
									</InputGroupButton>
								</InputGroupAddon>
							</InputGroup>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name={`attacker.${props.index}.damage`}
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel>Damage</FieldLabel>
							<Input
								{...field}
								aria-invalid={fieldState.invalid}
								placeholder="4, D6, 2D3"
								autoComplete="off"
								className="text-center"
								onChange={(e) => field.onChange(e.target.value)}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name={`attacker.${props.index}.name`}
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid} className="lg:hidden">
							<FieldLabel>Name</FieldLabel>
							<Input
								{...field}
								aria-invalid={fieldState.invalid}
								placeholder={placeholderName}
								autoComplete="off"
								className="text-center"
								onChange={(e) => field.onChange(e.target.value)}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name={`attacker.${props.index}.keywords`}
					control={form.control}
					render={({ field, fieldState }) => (
						<Field
							data-invalid={fieldState.invalid}
							className="col-span-2 2xl:col-span-4"
						>
							<FieldLabel>Keywords</FieldLabel>
							<MultiSelect
								{...field}
								defaultValue={field.value}
								options={KEYWORD_SELECT_OPTIONS}
								onValueChange={(value) => field.onChange(value)}
								aria-invalid={fieldState.invalid}
								hideSelectAll
							/>
						</Field>
					)}
				/>
				<Controller
					name={`attacker.${props.index}.name`}
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid} className="hidden lg:flex">
							<FieldLabel>Name</FieldLabel>
							<Input
								{...field}
								aria-invalid={fieldState.invalid}
								placeholder={placeholderName}
								autoComplete="off"
								className="text-center"
								onChange={(e) => field.onChange(e.target.value)}
							/>
							{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
				<Controller
					name={`attacker.${props.index}.modifiers`}
					control={form.control}
					render={({ field, fieldState }) => (
						<Field
							data-invalid={fieldState.invalid}
							className="col-span-2 2xl:col-span-4"
						>
							<FieldLabel>Modifiers</FieldLabel>
							<MultiSelect
								{...field}
								defaultValue={field.value}
								options={MODIFIER_SELECT_OPTIONS}
								onValueChange={(value) => field.onChange(value)}
								aria-invalid={fieldState.invalid}
								hideSelectAll
							/>
						</Field>
					)}
				/>
				<Field className="col-span-2 lg:col-span-1">
					<FieldLabel className="h-0 lg:h-fit">&nbsp;</FieldLabel>
					<Button type="button" variant="destructive" onClick={props.onRemove}>
						<Trash /> Remove
					</Button>
				</Field>
			</FieldGroup>
			<Button
				type="button"
				variant="ghost"
				{...listeners}
				{...attributes}
				className="cursor-grab p-6"
			>
				<EllipsisVertical />
			</Button>
		</li>
	);
}
