import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { z } from "zod"
import calcModel from "~/server/calculations/calcModel"
import { prisma } from "~/server/db"
import { Climate } from "@prisma/client"
import calcModelTest from "~/server/calculations/calcModelTest"

const zHomeType = z.object({
  heatLossFactor: z.number(),
  buildYear: z.number(),
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
    const climateData = await prisma.climate.findMany({
      where: {
        location: input.location,
      },
    })
    if (!climateData) {
      throw new Error(`No climate data found for location ${input.location}`)
    }
    const result = calcModelTest(input, climateData)
    return result
  }),
})
