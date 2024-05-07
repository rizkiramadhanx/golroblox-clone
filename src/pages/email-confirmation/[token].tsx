import { Flex, Paper, Text } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { InferGetServerSidePropsType } from "next"
import { notFound } from 'next/navigation'
import { useRouter } from "next/router";


export const getServerSideProps = (async (context: any) => {

  const { token } = context.query;
  // const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const res = await fetch(`http:/localhost:8000/api/v1/email-confirmation/${token}`)

  const errorCode = res.ok ? false : res.status

  if (!res.ok) {
    return {
      notFound: true,
    };
  }
  const repo = await res.json()

  return {
    props: {
      repo,
      status: { errorCode, isError: true }
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

