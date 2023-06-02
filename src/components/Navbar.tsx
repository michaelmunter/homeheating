import Link from "next/link"
import { useState } from "react"
import { HiMenu, HiX } from "react-icons/hi"
import { useRouter } from "next/router"
import Image from "next/image"
import { SignInButton, UserButton, useUser } from "@clerk/nextjs"

export default function NavBar() {
  const { asPath } = useRouter()
  const { isSignedIn } = useUser()

  const [showMenu, setShowMenu] = useState(true)

  const menuItems = [
    { name: "analyze", path: "/", access: true },
    { name: "saved", path: "/saved", access: isSignedIn },
    { name: "about", path: "/about", access: true },
  ]

  return (
    <nav className="flex w-full flex-row bg-neutral-200 text-neutral-500">
      <div className="flex-grow p-3 pl-6">
        <Link
          href="/"
          className="flex w-fit flex-row opacity-80 hover:opacity-90"
        >
          <Image src="/logo.png" width={50} height={30} alt="logo" />
          <h2 className="pl-4 text-2xl font-bold text-red-500">HomeHeating</h2>
        </Link>
      </div>
      <div className="flex flex-row items-center ">
        <ul
          className={`flex flex-wrap items-center ${
            showMenu ? "block" : "hidden"
          }`}
        >
          {menuItems.map(
            ({ name, path, access }) =>
              access && (
                <li key={name} className=" mr-5 hover:text-neutral-800">
                  <Link
                    key={name}
                    href={path}
                    className={`${
                      asPath === path ? "font-bold text-[#d94740]" : ""
                    }`}
                  >
                    {name}
                  </Link>
                </li>
              )
          )}
        </ul>
        <div className="pr-4">
          {isSignedIn ? (
            <UserButton afterSignOutUrl={asPath} />
          ) : (
            <SignInButton afterSignInUrl={asPath} />
          )}
        </div>

        <div className="h-fit pr-4 md:hidden">
          <button
            className="text-center align-middle hover:text-neutral-800"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <HiMenu size={"2em"} /> : <HiX size={"2em"} />}
          </button>
        </div>
      </div>
    </nav>
  )
}
