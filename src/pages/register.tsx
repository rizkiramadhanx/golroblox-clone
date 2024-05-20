"use client"
/* eslint-disable @next/next/no-img-element */
import { Navbar } from "@/component/layout";
import styles from '@/styles/register.module.css';
import { baseUrlAxios } from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Flex, Notification, SimpleGrid, TextInput, em } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { notifications } from '@mantine/notifications';
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";

const schema = z.object({
  fullName: z.string().min(5, { message: 'minimal 5 karakter' }),
  username: z.string().min(5, { message: 'minimal 5 karakter' }).refine(s => !s.includes(' '), 'Karakter tidak boleh berupa spasi'),
  email: z.string({ message: 'tidak boleh kosong' }).email({ message: 'harus berupa email' }),
  password: z.string().min(8, { message: 'minimal 8 karakter' }),
  confirmPassword: z.string().min(8, { message: 'minimal 8 karakter' })
}).refine((data) => data.password === data.confirmPassword, {
  message: "password tidak sama, periksa ulang",
  path: ["confirmPassword"]
})

export default function Register() {

  type RegisterSchema = z.infer<typeof schema>;

  const [disableSubmit, setDisableSubmit] = useState<boolean>(false)

  const { mutate } = useMutation({
    mutationFn: (registerData: RegisterSchema) => {
      const config: AxiosRequestConfig = {
        method: 'post',
        data: registerData,
        url: '/api/v1/auth/register'
      }
      return baseUrlAxios(config)
    }
  })

  const { register, handleSubmit, formState: {
    isValid,
    isLoading,
    errors
  } } = useForm<RegisterSchema>({
    mode: 'onBlur',
    resolver: zodResolver(schema)
  })

  const router = useRouter()

  const formSubmit = (dataSubmit: RegisterSchema) => {
    mutate(dataSubmit, {
      onSuccess: () => {
        notifications.show({
          color: 'green',
          title: 'Register Berhasil',
          message: null
        })

        setDisableSubmit(true)

        setTimeout(() => {
          router.push('/login')
        }, 1000)
      },
      onError: () => {
        notifications.show({
          color: 'red',
          title: 'Register Gagal',
          message: null
        })
      }
    })
  }


  return (<>
    <Head>
      <title>
        Register | Partridge Castle
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
        <SimpleGrid cols={{ base: 1, lg: 2 }}>
          <form
            className={styles.wrapper_form}
            onSubmit={handleSubmit(formSubmit)}
          >
            <Flex gap={10} >
              <TextInput
                label='Nama Lengkap'
                placeholder="John Doe"
                w='100%'
                error={errors.fullName?.message}
                {...register('fullName')}
              />
              <TextInput
                label='Username'
                error={errors.username?.message}
                // @ts-ignore
                onInput={(e) => e.target.value = ("" + e.target.value).toLowerCase()}
                placeholder="johndoe"
                w='100%'

                {...register('username')}
              />
            </Flex>
            <TextInput
              label='Email'
              error={errors.email?.message}
              type="email"
              placeholder="email@gmail.com"
              {...register('email')}
            />
            <TextInput
              label='Password'
              error={errors.password?.message}
              type="password"
              placeholder="p@assW0rd123"
              {...register('password')}

            />
            <TextInput
              label='Konfirmasi Password'
              placeholder="p@assW0rd123"
              type="password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}

            />
            <Button type="submit"
              loading={isLoading || disableSubmit}
              disabled={!isValid || isLoading}
              mt="sm">
              Submit
            </Button>
          </form>
          <Flex display={{ base: 'none', lg: 'flex' }} justify='end' align='center' pt='100'>
            <img style={{
              maxHeight: '500px'
            }} src="/img/goroblox.png" alt="hero" />
          </Flex>
        </SimpleGrid>
      </Container>
    </div>
  </>)
}