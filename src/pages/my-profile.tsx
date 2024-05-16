import { Navbar } from "@/component/layout";
import { Button, Container, Grid } from "@mantine/core";
import { deleteCookie } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";

export default function MyProfile() {
  const router = useRouter()

  const handleLogout = () => {
    deleteCookie('access_token')
    deleteCookie('refresh_token')

    router.push('/login')
  }

  
  return (<>
    <Head>My Profile | {process.env.NEXT_PUBLIC_NAME_WEBSITE}</Head>
    <Navbar />
    <div className="wrapper">
      <Container fluid
        px={{
          base: '20',
          sm: 50
        }}
        py={24}
        maw={1800}
        w='100%' >
        
        <Grid mt={90}>
          <Grid.Col span={4} bg='gray.1'>
            Halo
          </Grid.Col>
          <Grid.Col span={8}>
            Hili
          </Grid.Col>
        </Grid>
      </Container>
    </div></>)
}