// components/Layout.tsx
import { SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Head from "next/head"
import { useRouter } from "next/router"

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useUser()
  const { asPath } = useRouter() // get the current path

  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>HomeHeating.App</title>
        <meta name="HomeHeating APP" content="analyze heating solutions" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <header className="flex flex-row items-end justify-center gap-5 bg-red-900 py-2 pr-4">
        <h1 className="text-stone-50">Header</h1>
        {user ? (
          <UserButton afterSignOutUrl={asPath} />
        ) : (
          <SignInButton afterSignInUrl={asPath} />
        )}
      </header>
      <main className="flex-grow  bg-gradient-to-b from-neutral-100 to-neutral-200">
        {children}
      </main>
    </div>
  )
}
