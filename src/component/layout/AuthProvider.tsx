"use client"

import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"
import Loading from "../page/Loading"

export default function AuthProvider({ children }: {
  children: ReactNode
}) {

  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true)
    }
  }, [router, isClient])


  return (<div>{isClient ? children : <Loading/>}</div>)
}