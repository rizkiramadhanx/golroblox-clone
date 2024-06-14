"use client"

import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"

export default function AuthProvider({ children }: {
  children: ReactNode
}) {

  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true)
    }
    if (router.pathname === '/register') {
      router.push('/')
    }
    console.log(isClient)

  }, [router, isClient])


  return (<div>{isClient ? children : <div>Loading...</div>}</div>)
}