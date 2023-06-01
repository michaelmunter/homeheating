// components/Layout.tsx
import { SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Head from "next/head"
import { useRouter } from "next/router"
import NavBar from "./Navbar"
import { Nunito } from "next/font/google"

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex min-h-screen flex-col ${nunito.className}`}>
      <Head>
        <title>HomeHeating.App</title>
        <meta name="HomeHeating APP" content="analyze heating solutions" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <NavBar />

      <main className="flex-grow  bg-gradient-to-b from-neutral-100 to-neutral-200">
        {children}
      </main>
    </div>
  )
}
