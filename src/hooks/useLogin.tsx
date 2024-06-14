import { useEffect, useState } from "react"
import { getCookie, hasCookie } from 'cookies-next'

const useLogin = () => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    if (hasCookie('access_token') || localStorage.getItem('access_token')) {
      setIsLogin(true)
    }
  }, [])

  return isLogin
}

export default useLogin