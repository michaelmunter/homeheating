import Link from "next/link"
import { useState } from "react"
import { HiMenu, HiX } from "react-icons/hi"
import { useRouter } from "next/router"
import Image from "next/image"
import { SignInButton, UserButton, useUser } from "@clerk/nextjs"

export default function NavBar() {
  const { asPath } = useRouter()
  const { isSignedIn } = useUser()

  const [navbar, setNavbar] = useState(false)

  const navPage = [
    { name: "analyze", path: "/", access: true },
    { name: "saved", path: "/saved", access: isSignedIn },
    { name: "about", path: "/about", access: true },
  ]

  return (
    <nav className="w-full bg-slate-300 text-neutral-400">
      <div className="mx-auto justify-between px-4  md:flex md:items-center md:px-8 lg:max-w-7xl">
        <div className="flex items-center  justify-between  py-3 md:block md:py-5">
          <Link href="/" className="flex flex-row opacity-80 hover:opacity-90">
            <Image src="/logo.png" width={40} height={40} alt="" />
            <h2 className=" pl-4 text-3xl font-bold text-red-500">
              HomeHeating
            </h2>
          </Link>
          <ul
            className={`items-center justify-center  space-y-6   md:flex md:space-x-6 md:space-y-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            {navPage.map(
              ({ name, path, access }) =>
                access && (
                  <li key={name} className=" hover:text-neutral-100">
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
          <div>
            {isSignedIn ? (
              <UserButton afterSignOutUrl={asPath} />
            ) : (
              <SignInButton afterSignInUrl={asPath} />
            )}
          </div>

          <div className="md:hidden">
            <button
              className=" p-2   hover:text-neutral-100 "
              onClick={() => setNavbar(!navbar)}
            >
              {navbar ? <HiX size={"1.6em"} /> : <HiMenu size={"1.6em"} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
