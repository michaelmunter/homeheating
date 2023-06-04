import { type NextPage } from "next"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

const Saved: NextPage = () => {
  const user = useUser()
  if (!user.isSignedIn) {
    return null
  }
  return (
    <div className=" mx-auto my-8 max-w-2xl bg-slate-400 px-4">
      <nav className="flex w-full flex-row ">
        <div className="flex-grow p-3 pl-6 ">
          <Link
            href="/"
            className="items-right grid w-fit grid-flow-row auto-rows-min grid-cols-2 items-center bg-red-200"
          >
            <Image src="/logo.png" width={17} height={30} alt="logo" />
            <h2 className="bg-slate-300 pl-4 text-2xl font-bold text-red-400">
              HomeHeating
            </h2>
          </Link>
        </div>
      </nav>
      <p>Saved entries</p>
    </div>
  )
}

export default Saved
