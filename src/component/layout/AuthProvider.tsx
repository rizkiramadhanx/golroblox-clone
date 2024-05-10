"use client"

import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"

export default function AuthProvider({ children }: {
  children: ReactNode
}) {

  const router = useRouter()

  useEffect(() => {

    if (router.pathname === '/register') {
      router.push('/')
    }
  }, [router])

  return (<div>{children}</div>)
}