import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const testRouter = createTRPCRouter({
  mutateAdder: publicProcedure
    .input(z.object({ n1: z.number(), n2: z.number() }))
    .mutation(({ input }) => {
      return input.n1 + input.n2
    }),
})
