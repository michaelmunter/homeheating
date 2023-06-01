import { type NextPage } from "next"
import { useRouter } from "next/router"
import { useUser } from "@clerk/nextjs"

const Saved: NextPage = () => {
  const router = useRouter()

  const user = useUser()
  console.log("user loaded", user.isLoaded)

  if ((!user.isLoaded && !user.isSignedIn) || !router.isReady) {
    return <p>loading...</p>
  } else if (user.isSignedIn) {
    return (
      <div>
        <h1>Saved</h1>
      </div>
    )
  } else {
    router.push("/")
    return <p>redirecting...</p>
  }
}

export default Saved
