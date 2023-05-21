import { type NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { api } from "~/utils/api"
import { UserButton, UserProfile, useUser } from "@clerk/nextjs"

const TestPage: NextPage = () => {
  const { user } = useUser()

  return (
    <div>
      {!user && <h1>no user</h1>}
      {user && <h1>{UserProfile.name}</h1>}
    </div>
  )
}

export default TestPage
