import { type NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { api } from "~/utils/api"
import { UserButton } from "@clerk/nextjs"
import Calculator from "./calculator/Calculator"

const Home: NextPage = () => {
  //const { data, isLoading: postsLoading } = api.climate.getAll.useQuery()
  //console.log(data)

  // const result = api.test.add2numbers.useQuery({ n1: 7, n2: 3 })
  // console.log(result.data)

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <Calculator testValue="succesful test" />
        </div>
      </main>
    </div>
  )
}

export default Home
