import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { z } from "zod"
import analyzer from "~/server/analyzer/analyzer"
import { prisma } from "~/server/db"
import { type Climate } from "@prisma/client"

const zodUserSpecs = z.object({
  heatLossFactor: z.number(),
  buildYear: z.number(),
  area: z.number(),
  heatDist: z.string(),
  residents: z.number(),
  tempSetting: z.number(),
  location: z.string(),
  systems: z.array(
    z.object({
      type: z.string(),
      COP: z.number(),
    })
  ),
})

export const calcRouter = createTRPCRouter({
  calc: publicProcedure.input(zodUserSpecs).mutation(async ({ input }) => {
    const climate: Climate[] = await prisma.climate.findMany({
      where: {
        location: input.location,
      },
    })

    if (!(climate.length > 0)) {
      throw new Error("No climate data found for this location")
    }
    const result = analyzer(input, climate)
    return result
  }),
})
