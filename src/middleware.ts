//FORCE ALL PAGES TO BE AUTHENTICATED

import { authMiddleware } from "@clerk/nextjs"
export default authMiddleware()
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
