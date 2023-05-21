import { type NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { api } from "~/utils/api"
import { UserButton } from "@clerk/nextjs"

const Home: NextPage = () => {
  const data = api.climate.getAll.useQuery()
  console.log(data)

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            some text
          </h1>
        </div>
      </main>
    </div>
  )
}

export default Home
