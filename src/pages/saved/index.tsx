import { type NextPage } from "next"
import { useUser } from "@clerk/nextjs"

const Saved: NextPage = () => {
  const user = useUser()
  if (!user.isSignedIn) {
    return null
  }
  return <div>Saved entries</div>
}

export default Saved
