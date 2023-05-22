import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const climateRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.climate.findMany()
  }),
})
