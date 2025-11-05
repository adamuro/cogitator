import { Button } from "@/components/ui/button";
import {
	Field,
	FieldDescription,
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
import { useWeapon } from "@/hooks/useWeapon";
import { emptyNumberFieldValue } from "@/lib/form";
import { randomWeaponName } from "@/lib/weapon";
import {
	DEFAULT_WEAPON_VALUES,
	weaponSchema,
	type WeaponSchemaType,
} from "@/schemas/weapon";
import {
	KEYWORD_SELECT_OPTIONS,
	type Keyword,
	type KeywordType,
	type Weapon,
} from "@/types/weapon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { EllipsisVertical, Trash } from "lucide-react";
import { useMemo } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { MultiSelect } from "../ui/multi-select";
import { Badge } from "../ui/badge";

interface WeaponProps {
	id: Weapon["id"];
}

export function WeaponForm(props: WeaponProps) {
	const weapon = useWeapon(props.id);
	const placeholderName = useMemo(() => randomWeaponName(), []);
	const form = useForm<WeaponSchemaType>({
		resolver: zodResolver(weaponSchema),
		mode: "onBlur",
		values: weapon.values,
		defaultValues: DEFAULT_WEAPON_VALUES,
		resetOptions: { keepErrors: true },
	});

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
			className="relative flex items-center space-x-4 py-4"
		>
			<form onSubmit={form.handleSubmit(() => null)} className="flex w-full">
				<FieldGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
					<Controller
						name="attacks"
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
									onChange={(e) => weapon.updateAttacks(e.target.value)}
								/>
								<FieldDescription>
									Enter the number of attacks of this weapon.
								</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="skill"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel>BS/WS</FieldLabel>
								<InputGroup>
									<InputGroupInput
										{...field}
										aria-invalid={fieldState.invalid}
										type="number"
										placeholder="3+"
										autoComplete="off"
										className="text-center"
										onChange={(e) => weapon.updateSkill(e.target.value)}
									/>
									<InputGroupAddon align="inline-start">
										<InputGroupButton
											onClick={() => weapon.updateSkill(field.value - 1)}
										>
											-
										</InputGroupButton>
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										<InputGroupButton
											onClick={() => weapon.updateSkill(field.value + 1)}
										>
											+
										</InputGroupButton>
									</InputGroupAddon>
								</InputGroup>
								<FieldDescription>
									Enter the BS or WS of this weapon.
								</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="strength"
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
										onChange={(e) => weapon.updateStrength(e.target.value)}
									/>
									<InputGroupAddon align="inline-start">
										<InputGroupButton
											onClick={() => weapon.updateStrength(field.value - 1)}
										>
											-
										</InputGroupButton>
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										<InputGroupButton
											onClick={() => weapon.updateStrength(field.value + 1)}
										>
											+
										</InputGroupButton>
									</InputGroupAddon>
								</InputGroup>
								<FieldDescription>
									Enter the strength of this weapon.
								</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="ap"
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
										onChange={(e) => weapon.updateAp(e.target.value)}
									/>
									<InputGroupAddon align="inline-start">
										<InputGroupButton
											onClick={() => weapon.updateAp(field.value - 1)}
										>
											-
										</InputGroupButton>
									</InputGroupAddon>
									<InputGroupAddon align="inline-end">
										<InputGroupButton
											onClick={() => weapon.updateAp(field.value + 1)}
										>
											+
										</InputGroupButton>
									</InputGroupAddon>
								</InputGroup>
								<FieldDescription>
									Enter the AP of this weapon.
								</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="damage"
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
									onChange={(e) => weapon.updateDamage(e.target.value)}
								/>
								<FieldDescription>
									Enter damage of this weapon.
								</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Controller
						name="name"
						control={form.control}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid}>
								<FieldLabel>Name</FieldLabel>
								<Input
									{...field}
									aria-invalid={fieldState.invalid}
									placeholder={placeholderName}
									autoComplete="off"
									className="text-center"
									onChange={(e) => weapon.updateName(e.target.value)}
								/>
								<FieldDescription>
									Enter the name of this weapon.
								</FieldDescription>
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}
					/>
					<Field className="sm:col-span-2 2xl:col-span-3">
						<FieldLabel>Keywords</FieldLabel>
						<MultiSelect
							options={KEYWORD_SELECT_OPTIONS}
							onValueChange={(value) =>
								weapon.updateKeywords(value as KeywordType[])
							}
							maxCount={2}
							hideSelectAll
						/>
						<FieldDescription>
							Select keywords for this weapon.
						</FieldDescription>
					</Field>
					<Field className="sm:col-span-2 lg:col-span-1">
						<FieldLabel>&nbsp;</FieldLabel>
						<Button variant="destructive" onClick={() => weapon.remove()}>
							<Trash /> Remove
						</Button>
					</Field>
				</FieldGroup>
			</form>
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
