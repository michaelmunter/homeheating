import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const testRouter = createTRPCRouter({
  add2numbers: publicProcedure
    .input(z.object({ n1: z.number(), n2: z.number() }))
    .query(({ input }) => {
      return `Result: ${input.n1 + input.n2}`
    }),
})
