// components/Layout.tsx
import Head from "next/head"
import NavBar from "./Navbar"
import { Nunito } from "next/font/google"

const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex min-h-screen w-screen flex-col  ${nunito.className}`}>
      <Head>
        <title>HomeHeating.App</title>
        <meta name="HomeHeating APP" content="analyze heating solutions" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <NavBar />

      <main className="mx-2 items-center">{children}</main>
    </div>
  )
}
