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
import { useAttacker } from "@/hooks/useAttacker";
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
import { WeaponForm } from "./weapon";

export function AttackerCard() {
	const weapons = useAttacker();
	const sensors = useSensors(useSensor(TouchSensor), useSensor(MouseSensor));

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (!over || active.id === over.id) return;
		if (typeof active.id !== "string" || typeof over.id !== "string") {
			throw new Error("Invalid drag item id type");
		}

		const fromIndex = weapons.findIndex(active.id);
		const toIndex = weapons.findIndex(over.id);
		weapons.drag(fromIndex, toIndex);
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
						<CardContent>
							<DndContext
								sensors={sensors}
								collisionDetection={closestCenter}
								onDragEnd={handleDragEnd}
							>
								<SortableContext
									items={weapons.all.map((weapon) => weapon.id)}
									strategy={verticalListSortingStrategy}
								>
									<ul className="divide-y-2">
										{weapons.all.map((weapon) => (
											<WeaponForm key={weapon.id} id={weapon.id} />
										))}
									</ul>
								</SortableContext>
							</DndContext>
						</CardContent>
						<CardFooter>
							<Field>
								<Button type="button" onClick={weapons.create}>
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
