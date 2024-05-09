import { Flex, Paper, Text } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";


export const getServerSideProps = (async (context: any) => {

  const { token } = context.query;
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/email-confirmation/${token}`)

  if (!res.ok) {
    return {
      notFound: true,
    };
  }
  const repo = await res.json()

  return {
    props: {
      repo,
    },
  }
})

export default function EmailConfirmation({ repo }: InferGetServerSidePropsType<any>) {

  const router = useRouter()

  return (
    <Flex mih='100vh' justify='center' align='center'>
      <Paper shadow="xs" p="xl" maw='400px'>
        <Flex justify='center'>
          <IconCircleCheck size={70} color="green" />
        </Flex>
        <Text>Email, <b>{repo.data.email}</b>  Telah terverifikasi</Text>
        <Text mt={10}>
          Silahkan login, ke halaman <span style={{ color: 'orange', cursor: 'pointer' }} onClick={() => router.replace('/login')}>disini</span>
        </Text>
      </Paper>
    </Flex>
  )
}

