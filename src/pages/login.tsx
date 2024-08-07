/* eslint-disable @next/next/no-img-element */
import { Navbar } from "@/component/layout";
import styles from '@/styles/login.module.css';
import { baseUrlAxios } from "@/utils/axios";
import ENV from "@/utils/env";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Flex, SimpleGrid, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { setCookie } from 'cookies-next';
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const schema = z.object({
  email: z.string({ message: 'tidak boleh kosong' }).email({ message: 'harus berupa email' }),
  password: z.string().min(8, { message: 'minimal 8 karakter' }),
})


export default function Login() {

  type LoginSchema = z.infer<typeof schema>

  const [disableSubmit, setDisableSubmit] = useState<boolean>(false)

  const { mutate } = useMutation({
    mutationFn: (registerData: LoginSchema) => {
      const config: AxiosRequestConfig = {
        method: 'post',
        data: registerData,
        url: '/api/v1/auth/login'
      }
      return baseUrlAxios(config)
    }
  })

  const router = useRouter()

  const formSubmit = (dataSubmit: LoginSchema) => {
    mutate(dataSubmit, {
      onSuccess: (config) => {
        notifications.show({
          color: 'green',
          title: 'Login Berhasil',
          message: null
        })

        const { token, refresh_token } = config.data.data
        localStorage.setItem('access_token', token)
        localStorage.setItem('refresh_token', refresh_token)
        setCookie('access_token', token)
        setCookie('refresh_token', refresh_token)

        setDisableSubmit(true)
        
        setTimeout(() => {
          router.push('/')
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

  const { register, handleSubmit, formState: {
    isValid,
    isLoading,
    errors
  } } = useForm<LoginSchema>({
    mode: 'onBlur',
    resolver: zodResolver(schema)
  })

  return (<>
    <Head>
      <title>
        Login | Partridge Castle
      </title>
    </Head>
    <Navbar />
    <div className="wrapper" >
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

            <Button type="submit"
              loading={isLoading}
              disabled={!isValid || isLoading}
              mt="sm">
              Submit
            </Button>
          </form>
          <Flex display={{ base: 'none', lg: 'flex' }} justify='end' align='center' pt='100'>
            <img style={{
              maxHeight: '400px'
            }} src="/img/goroblox.png" alt="hero" />
          </Flex>
        </SimpleGrid>
      </Container>
    </div>
  </>);
}