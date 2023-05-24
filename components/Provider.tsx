"use client";

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"


const Provider = ({children,session}:{children:JSX.Element,session?:Session | null | undefined}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider