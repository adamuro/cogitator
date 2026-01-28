"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import {
	useAttackerFieldArray,
	useProfilesFormContext,
} from "@/hooks/profiles";
import { getDragIndices } from "@/lib/dnd";
import { newWeapon, randomWeaponName } from "@/profiles/attacker/utils";
import {
	DndContext,
	type DragEndEvent,
	MouseSensor,
	TouchSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../../components/ui/accordion";
import { WeaponForm } from "./weapon";

export function AttackerCard() {
	const attacker = useAttackerFieldArray();
	const form = useProfilesFormContext();
	const weapons = form.watch("attacker");

	/* DnD Kit */
	const sensors = useSensors(useSensor(TouchSensor), useSensor(MouseSensor));
	function handleDragEnd(event: DragEndEvent) {
		const indices = getDragIndices(attacker, event);
		if (!indices) return;

		attacker.move(indices.from, indices.to);
	}

	return (
		<Accordion type="multiple" className="w-full">
			<AccordionItem value="attacker">
				<Card className="gap-2 pb-4">
					<CardHeader>
						<AccordionTrigger className="items-center py-0">
							<div className="flex flex-col gap-2">
								<CardTitle className="py-0">Attacker</CardTitle>
								<CardDescription>
									Enter all weapon profiles of the attacking unit.
								</CardDescription>
							</div>
						</AccordionTrigger>
					</CardHeader>
					<AccordionContent>
						<CardContent className="px-0">
							<DndContext
								sensors={sensors}
								collisionDetection={closestCenter}
								onDragEnd={handleDragEnd}
							>
								<SortableContext
									items={attacker.fields.map((weapon) => weapon.id)}
									strategy={verticalListSortingStrategy}
								>
									<ul className="divide-y *:not-first:pt-4 *:pr-4 *:pl-6 *:last:bg-linear-to-b *:last:from-90% *:last:to-card *:even:bg-background/40">
										{attacker.fields.map((weapon, index) => (
											<WeaponForm
												key={weapon.id}
												id={weapon.id}
												index={index}
												onRemove={() => attacker.remove(index)}
												onCopy={() =>
													attacker.insert(index + 1, {
														...weapon,
														name: randomWeaponName(weapons),
													})
												}
											/>
										))}
									</ul>
								</SortableContext>
							</DndContext>
						</CardContent>
						<CardFooter>
							<Field>
								<Button
									type="button"
									onClick={() => attacker.append(newWeapon(weapons))}
								>
									<Plus />
									Add Weapon
								</Button>
							</Field>
						</CardFooter>
					</AccordionContent>
				</Card>
			</AccordionItem>
		</Accordion>
	);
}
