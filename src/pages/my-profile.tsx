import { Navbar } from "@/component/layout";
import { baseUrlAxios } from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Flex, Grid, Modal, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { poppins } from "./_app";

const schema = z.object({
  fullName: z.string().min(5, { message: 'minimal 5 karakter' }),
  username: z.string().min(5, { message: 'minimal 5 karakter' }).refine(s => !s.includes(' '), 'Karakter tidak boleh berupa spasi'),
  email: z.string({ message: 'tidak boleh kosong' }).email({ message: 'harus berupa email' }),
  growId: z.string().min(3)
})



export default function MyProfile() {
  const router = useRouter()
  const idWorld = '6677b96939bb50eead6f114c'

  type editUser = z.infer<typeof schema>

  const [id, setId] = useState('')
  const [isOpen, setIsOpen] = useState<boolean>(false)


  const { data, isSuccess, refetch } = useQuery({
    queryKey: ['data-me'],
    queryFn: async () => {
      const url = '/api/v1/auth/me'
      const data = baseUrlAxios.request({
        url,
        headers: {
          Authorization: getCookie("access_token")
        }
      })
      return data
    },
  })

  const { data: dataWorld, isSuccess: isSuccessWorld } = useQuery({
    queryKey: ['data-world'],
    queryFn: async () => {
      const url = '/api/v1/end-user/deposit/' + idWorld
      const data = baseUrlAxios.request({
        url,
      })
      return data
    },
  })


  const { mutate } = useMutation({
    mutationFn: (data: editUser) => {
      const config: AxiosRequestConfig = {
        method: 'put',
        url: '/api/v1/end-user/edit-profile',
        data: data,
        headers: {
          Authorization: getCookie('access_token')
        }
      }

      return baseUrlAxios(config)
    }
  })

  const submitForm = (dataSubmit: editUser) => {
    mutate(dataSubmit, {
      onSuccess: () => {
        notifications.show({
          color: 'green',
          title: 'Edit data Berhasil',
          message: null
        })
      },
      onError: () => {
        notifications.show({
          color: 'red',
          title: 'Edit data Gagal',
          message: null
        })
      }
    })
  }

  const { register, setValue, handleSubmit, formState: {
    isValid,
    isLoading,
    errors
  } } = useForm<editUser>({
    mode: 'onChange',
    resolver: zodResolver(schema),

  })

  useEffect(() => {
    setValue('email', data?.data.user.email)
    setValue('fullName', data?.data.user.fullName)
    setValue('growId', data?.data.user.growId)
    setValue('username', data?.data.user.username)

  }, [data, setValue])

  const handleLogout = () => {
    deleteCookie('access_token')
    deleteCookie('refresh_token')
    router.push('/login')
  }

  return (<>
    <Head>
      <title>
        My Profile | Partridge Castle
      </title>
    </Head>
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
        <Stack mt={80} mb={30} display={{ md: 'none' }}>
            {isSuccessWorld && <Flex fw={600} color="green" justify='space-between' align={'center'} gap={20}>
              <div>Balance : {data?.data.user.balance}</div>
              <Button onClick={() => setIsOpen(true)}>Deposit</Button>
              <Modal opened={isOpen} withCloseButton={true} centered onClose={() => setIsOpen(false)}>
                <Text className={poppins.className} fz='xl' fw={600}>World : {dataWorld.data.data.owner}</Text>
                <Text className={poppins.className} fz='xl' fw={600}>Owner :  {dataWorld.data.data.world}</Text>
                <Text mt={20} className={poppins.className}>Dont forget to take screenshot</Text>
              </Modal>
            </Flex>}
        </Stack>
        <Stack gap={2} mt={{md:'90'}} >
          {isSuccess && <form
            onSubmit={handleSubmit(submitForm)}
          >
            <SimpleGrid cols={{ base: 1, md: 2 }}>
              <Stack gap={5}>
                <TextInput
                  label='Nama Lengkap'
                  error={errors.fullName?.message}
                  type="text"
                  placeholder="Nama Lengkap"
                  {...register('fullName')}
                />
                <TextInput
                  label='Email'
                  error={errors.email?.message}
                  type="text"
                  placeholder="Email"
                  {...register('email')}
                />

              </Stack>
              <Stack gap={5}>
                <TextInput
                  label='Username'
                  error={errors.username?.message}
                  type="text"
                  placeholder="Username"
                  {...register('username')}
                />
                <TextInput
                  label='Id Growtopia'
                  error={errors.growId?.message}
                  type="text"
                  placeholder="1233932"
                  {...register('growId')}
                />
              </Stack>
            </SimpleGrid>
            <Flex justify={{ base: 'end', md: 'space-between' }} mt={20}>
              {isSuccessWorld && <Flex fw={600} color="green" display={{ base: 'none', md: 'flex' }} gap={20} align={'center'}>
                <div>Balance : {data?.data.user.balance}</div>
                <Button onClick={() => setIsOpen(true)}>Deposit</Button>
                <Modal opened={isOpen} withCloseButton={true} centered onClose={() => setIsOpen(false)}>
                  <Text className={poppins.className} fz='xl' fw={600}>World : {dataWorld.data.data.owner}</Text>
                  <Text className={poppins.className} fz='xl' fw={600}>Owner :  {dataWorld.data.data.world}</Text>
                  <Text mt={20} className={poppins.className}>Dont forget to take screenshot</Text>
                </Modal>
              </Flex>}
              <Button loading={isLoading} disabled={!isValid} w={{ base: '100%', lg: '25%' }} type="submit">Simpan</Button>
            </Flex>
          </form>}
        </Stack>
      </Container>
    </div>
  </>)
}