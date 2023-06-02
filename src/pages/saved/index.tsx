import { type NextPage } from "next"
import { useUser } from "@clerk/nextjs"

const Saved: NextPage = () => {
  const user = useUser()
  if (!user.isSignedIn) {
    return null
  }
  return (
    <div className=" mx-auto my-8 max-w-2xl bg-slate-400 px-4">
      <p>Saved entries</p>
    </div>
  )
}

export default Saved
