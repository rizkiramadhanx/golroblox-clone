import { Button } from "@mantine/core";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";

export default function MyProfile() {
  const router = useRouter()

  const handleLogout = () => {
    deleteCookie('access_token')
    deleteCookie('refresh_token')
    
    router.push('/login')
  }
  return (<div>
    <Button color="red" onClick={handleLogout}>Logout</Button>
  </div>)
}