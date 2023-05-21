import { createTRPCRouter } from "~/server/api/trpc"
import { exampleRouter } from "~/server/api/routers/example"
import { climateRouter } from "~/server/api/routers/climate"
import { homeRouter } from "./routers/home"
import { testRouter } from "./routers/test"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  climate: climateRouter,
  home: homeRouter,
  test: testRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
