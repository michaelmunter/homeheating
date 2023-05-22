import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

import testCalc from "~/server/calculations/testCalc"

export const testRouter = createTRPCRouter({
  queryAdder: publicProcedure
    .input(z.object({ n1: z.number(), n2: z.number() }))
    .query(({ input }) => {
      return `Result: ${input.n1 + input.n2}`
    }),

  mutateAdder: publicProcedure
    .input(z.object({ n1: z.number(), n2: z.number() }))

    .mutation(({ input }) => {
      const result = testCalc(input.n1, input.n2)

      return result
    }),
})
