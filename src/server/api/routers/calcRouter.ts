import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { z } from "zod"
import heatCalc from "~/server/calculations/heatCalc"
import { prisma } from "~/server/db"

const zHomeType = z.object({
  heatLossFactor: z.number(),
  area: z.number(),
  heatDist: z.string(),
  residents: z.number(),
  tempSetting: z.number(),
  systemType: z.string(),
  cop: z.number(),
  location: z.string(),
})

export const calcRouter = createTRPCRouter({
  calc: publicProcedure.input(zHomeType).mutation(async ({ input }) => {
    const climateData = await prisma.climate.findFirst({
      where: {
        location: input.location,
      },
    })
    if (!climateData) {
      throw new Error(`No climate data found for location ${input.location}`)
    }
    const result = heatCalc(input, climateData)
    return result
  }),
})
