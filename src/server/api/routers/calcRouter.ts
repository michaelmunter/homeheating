import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { z } from "zod"
import calcModel from "~/server/calculations/calcModel"
import { prisma } from "~/server/db"
import { type Climate } from "@prisma/client"

const clientData = z.object({
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
  calc: publicProcedure.input(clientData).mutation(async ({ input }) => {
    const climate: Climate[] = await prisma.climate.findMany({
      where: {
        location: input.location,
      },
    })

    if (!(climate.length > 0)) {
      throw new Error("No climate data found for this location")
    }
    const result = calcModel(input, climate)
    return result
  }),
})
