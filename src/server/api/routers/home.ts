import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"

export const homeRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.climate.findMany()
  }),
})
