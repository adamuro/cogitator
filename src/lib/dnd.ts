import type { UseFieldArrayReturn } from "react-hook-form";
import type { DragEndEvent } from "@dnd-kit/core";
import type { ProfilesSchemaType } from "@/profiles/schema";

export function getDragIndices<
	T extends UseFieldArrayReturn<ProfilesSchemaType>,
>(array: T, event: DragEndEvent) {
	const { active, over } = event;
	if (!over || active.id === over.id) return;
	if (typeof active.id !== "string" || typeof over.id !== "string") {
		throw new Error("Invalid drag item id type");
	}

	const fromIndex = array.fields.findIndex((d) => d.id === active.id);
	const toIndex = array.fields.findIndex((d) => d.id === over.id);

	return { from: fromIndex, to: toIndex };
}
