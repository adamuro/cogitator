import { z } from "zod";

import { profilesSchema } from "@/profiles/schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { simulate } from "@/simulation";

export const simulationRouter = createTRPCRouter({
	run: publicProcedure
		.input(
			z.object({
				profiles: profilesSchema,
				runs: z.number().min(1).max(100000),
			}),
		)
		.mutation(async ({ input }) => {
			const result = simulate(
				input.profiles.attacker,
				input.profiles.defender,
				input.runs,
			);

			return result;
		}),
});
