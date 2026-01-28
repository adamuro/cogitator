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
import {
	MAX_FEEL_NO_PAIN,
	MAX_INV_SAVE,
	MIN_FEEL_NO_PAIN,
	MIN_INV_SAVE,
	MIN_MODELS,
	MIN_SAVE,
	MIN_TOUGHNESS,
	MIN_WOUNDS,
} from "@/profiles/defender/constants";
import { randomUnitName } from "@/profiles/defender/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Copy, EllipsisVertical, Trash } from "lucide-react";
import { useMemo } from "react";
import { Controller } from "react-hook-form";

interface DefenderProps {
	id: string;
	index: number;
	onCopy: () => void;
	onRemove: () => void;
}

export function UnitForm(props: DefenderProps) {
	const form = useProfilesFormContext();
	const units = form.watch("defender");
	const placeholderName = useMemo(() => randomUnitName(units), [units]);

	/* DnD Kit Sortable */
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: props.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<li
			ref={setNodeRef}
			style={style}
			className="relative flex items-center space-x-4 space-y-6 py-0"
		>
			<FieldGroup className="grid grid-cols-2 gap-y-3 lg:grid-cols-3 2xl:grid-cols-5">
				<Controller
					name={`defender.${props.index}.models`}
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel>Models</FieldLabel>
							<InputGroup>
								<InputGroupInput
									{...field}
									aria-invalid={fieldState.invalid}
									autoComplete="off"
									className="text-center"
									onChange={(e) =>
										field.onChange(
											processNumberFieldValue(e.target.value, MIN_MODELS),
										)
									}
								/>
								<InputGroupAddon align="inline-start">
									<InputGroupButton
										onClick={() =>
											field.onChange(
												Math.max(MIN_MODELS, Number(field.value) - 1),
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
												Math.min(Number(field.value) + 1, MIN_MODELS),
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
					name={`defender.${props.index}.toughness`}
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel>Toughness</FieldLabel>
							<InputGroup>
								<InputGroupInput
									{...field}
									aria-invalid={fieldState.invalid}
									type="number"
									autoComplete="off"
									className="text-center"
									onChange={(e) =>
										field.onChange(
											processNumberFieldValue(e.target.value, MIN_TOUGHNESS),
										)
									}
								/>
								<InputGroupAddon align="inline-start">
									<InputGroupButton
										onClick={() =>
											field.onChange(
												Math.max(MIN_TOUGHNESS, Number(field.value) - 1),
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
												Math.max(Number(field.value) + 1, MIN_TOUGHNESS),
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
					name={`defender.${props.index}.wounds`}
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel>Wounds</FieldLabel>
							<InputGroup>
								<InputGroupInput
									{...field}
									aria-invalid={fieldState.invalid}
									type="number"
									autoComplete="off"
									className="text-center"
									onChange={(e) =>
										field.onChange(
											processNumberFieldValue(e.target.value),
											MIN_WOUNDS,
										)
									}
								/>
								<InputGroupAddon align="inline-start">
									<InputGroupButton
										onClick={() =>
											field.onChange(
												Math.max(MIN_WOUNDS, Number(field.value) - 1),
											)
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
					name={`defender.${props.index}.name`}
					control={form.control}
					render={({ field, fieldState }) => (
						<Field
							data-invalid={fieldState.invalid}
							className="col-span-2 hidden 2xl:flex"
						>
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
					name={`defender.${props.index}.save`}
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel>Save</FieldLabel>
							<InputGroup>
								<InputGroupInput
									{...field}
									aria-invalid={fieldState.invalid}
									type="number"
									autoComplete="off"
									className="text-center"
									onChange={(e) =>
										field.onChange(
											processNumberFieldValue(e.target.value),
											MIN_SAVE,
										)
									}
								/>
								<InputGroupAddon align="inline-start">
									<InputGroupButton
										onClick={() =>
											field.onChange(
												Math.max(MIN_SAVE, Number(field.value) - 1),
											)
										}
									>
										-
									</InputGroupButton>
								</InputGroupAddon>
								<InputGroupAddon align="inline-end">
									<InputGroupButton
										onClick={() =>
											field.onChange(Number(field.value) + 1, MIN_SAVE)
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
					name={`defender.${props.index}.invSave`}
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel className="text-nowrap">Invulnerable Save</FieldLabel>
							<InputGroup>
								<InputGroupInput
									{...field}
									aria-invalid={fieldState.invalid}
									autoComplete="off"
									className="text-center"
									onChange={(e) =>
										field.onChange(
											processNumberFieldValue(
												e.target.value,
												MIN_INV_SAVE,
												MAX_INV_SAVE,
											),
										)
									}
									required={false}
								/>
								<InputGroupAddon align="inline-start">
									<InputGroupButton
										onClick={() =>
											field.onChange(
												Math.max(MIN_INV_SAVE, Number(field.value) - 1),
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
												Math.min(MAX_INV_SAVE, Number(field.value) + 1),
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
					name={`defender.${props.index}.feelNoPain`}
					control={form.control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<FieldLabel>Feel No Pain</FieldLabel>
							<InputGroup>
								<InputGroupInput
									{...field}
									aria-invalid={fieldState.invalid}
									autoComplete="off"
									className="text-center"
									onChange={(e) =>
										field.onChange(
											processNumberFieldValue(
												e.target.value,
												MIN_FEEL_NO_PAIN,
												MAX_FEEL_NO_PAIN,
											),
										)
									}
								/>
								<InputGroupAddon align="inline-start">
									<InputGroupButton
										onClick={() =>
											field.onChange(
												Math.max(MIN_FEEL_NO_PAIN, Number(field.value) - 1),
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
												Math.min(MAX_FEEL_NO_PAIN, Number(field.value) + 1),
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
					name={`defender.${props.index}.name`}
					control={form.control}
					render={({ field, fieldState }) => (
						<Field
							data-invalid={fieldState.invalid}
							className="col-span-2 lg:col-span-1 2xl:hidden"
						>
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
				<Field className="col-span-2 lg:col-span-1">
					<FieldLabel>&nbsp;</FieldLabel>
					<Button type="button" onClick={props.onCopy}>
						<Copy /> Copy
					</Button>
				</Field>
				<Field className="col-span-2 lg:col-span-1">
					<FieldLabel className="h-0 lg:h-fit">&nbsp;</FieldLabel>
					<Button type="button" variant="destructive" onClick={props.onRemove}>
						<Trash /> Remove
					</Button>
				</Field>
			</FieldGroup>
			<Button
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
