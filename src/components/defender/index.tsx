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
	useDefenderFieldArray,
	useProfilesFormContext,
} from "@/hooks/profiles";
import { getDragIndices } from "@/lib/dnd";
import { newUnit, randomUnitName } from "@/profiles/defender/utils";
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
} from "../ui/accordion";
import { UnitForm } from "./unit";

export function DefenderUnitCard() {
	const defender = useDefenderFieldArray();
	const form = useProfilesFormContext();
	const units = form.watch("defender");

	/* DnD Kit */
	const sensors = useSensors(useSensor(TouchSensor), useSensor(MouseSensor));
	function handleDragEnd(event: DragEndEvent) {
		const indices = getDragIndices(defender, event);
		if (!indices) return;

		defender.move(indices.from, indices.to);
	}

	return (
		<Accordion type="multiple" className="w-full">
			<AccordionItem value="attacker">
				<Card className="gap-2 pb-4">
					<CardHeader>
						<AccordionTrigger className="items-center py-0">
							<div className="flex flex-col gap-2">
								<CardTitle className="py-0">Defender</CardTitle>
								<CardDescription>
									Enter all defensive profiles of the defending unit.
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
									items={defender.fields.map((unit) => unit.id)}
									strategy={verticalListSortingStrategy}
								>
									<ul className="divide-y *:not-first:pt-4 *:pr-4 *:pl-6 *:last:bg-linear-to-b *:last:from-90% *:last:to-card *:even:bg-background/40">
										{defender.fields.map((unit, index) => (
											<UnitForm
												key={unit.id}
												id={unit.id}
												index={index}
												onRemove={() => defender.remove(index)}
												onCopy={() =>
													defender.insert(index + 1, {
														...unit,
														name: randomUnitName(units),
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
									onClick={() => defender.append(newUnit(units))}
								>
									<Plus />
									Add Defender
								</Button>
							</Field>
						</CardFooter>
					</AccordionContent>
				</Card>
			</AccordionItem>
		</Accordion>
	);
}
