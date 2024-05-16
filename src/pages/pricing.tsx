/* eslint-disable @next/next/no-img-element */
"use client"

import { Navbar } from "@/component/layout";
import useLogin from "@/hooks/useLogin";
import styles from '@/styles/pricing.module.css';
import RupiahFormatter from "@/utils/RupiahFormat";
import { baseUrlAxios } from "@/utils/axios";
import { Button, Container, Flex, Input, Modal, Stack, Table, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function Pricing() {

  // automaticly download txt, where buy is success

  const isLogin = useLogin()
  const router = useRouter()

  const [amount, setAmount] = useState<number>(0)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [errorAmount, setErrorAmount] = useState<string | null>(null)
  const [activeProductId, setActiveProductId] = useState<string | null>(null)
  const [activeStock, setActiveStock ] = useState(0)

  useEffect(() => {
    if (amount < 1 || activeStock < amount) {
      setErrorAmount('Jumlah tidak valid')
    }
    else {
      setErrorAmount(null)
    }
  }, [errorAmount, amount])


  const { data, isSuccess } = useQuery({
    queryKey: ['pricing-data'],
    queryFn: async () => {
      const data = baseUrlAxios.get('/api/v1/order/product')
      return data
    }
  })

  const { mutate } = useMutation({
    mutationFn: (data) => {
      const config: AxiosRequestConfig = {
        method: 'put',
        data: data,
        url: '/api/v1/order/sell-stock'
      }
      return baseUrlAxios(config)
    }
  })

  const handleClickRow = (id: string, stock: number) => {
    setActiveProductId(id)
    setActiveStock(stock)
    setIsOpen(true)
  }

  const handleSubmit = () => {
    const data = {
      productId: activeProductId,
      amount: parseInt(amount as unknown as string)
    }

    mutate(data as unknown as void, {
      onError: (err) => {
        notifications.show({
          style: {
            zIndex: 99999
          },
          color: 'red',
          title: 
            // @ts-ignore
            err.response.data.message
          ,
          message: null
        })
      },
      onSuccess: () => {
        notifications.show({
          color: 'green',
          title: `Anda berhasil membeli ${amount} item`,
          message: null
        })
      }
    })
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
        <div className={styles.wrapper_content}>
          <Text size="lg" fw={600} >Daftar Harga</Text>
          <Table.ScrollContainer minWidth={500} mt={20}>
            <Table stickyHeader striped stripedColor="brand.0" withTableBorder>
              <Table.Thead >
                <Table.Tr bg="gray.1">
                  <Table.Th>No</Table.Th>
                  <Table.Th>Nama Item</Table.Th>
                  <Table.Th>Deskripsi</Table.Th>
                  <Table.Th>Harga</Table.Th>
                  <Table.Th>Stok</Table.Th>
                  <Table.Th>Aksi</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {isSuccess ? data?.data.data.map((e: any, index: number) =>
                  <Table.Tr key={index}>
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>{e.name}</Table.Td>
                    <Table.Td>{e.description}</Table.Td>
                    <Table.Td>{RupiahFormatter(e.price)}</Table.Td>
                    <Table.Td>{e.stock.length}</Table.Td>
                    <Table.Td><Button color="green.4" onClick={() => handleClickRow(e.id, e.stock.length)}>Beli</Button></Table.Td>
                  </Table.Tr>
                ) :
                  <Table.Tr>
                    < Table.Td colSpan={6} >
                      <Flex justify='center'>
                        <Text>Data Kosong</Text>
                      </Flex>
                    </Table.Td>
                  </Table.Tr>}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </div>

        <Modal opened={isOpen} withCloseButton={true} centered onClose={() => setIsOpen(false)}>
          {isLogin ?
            <Stack py={20}>
              <Flex justify=''>
                <Text fw={600} fz={18} ta='center' w='fit-content'> Berapa jumlah yang item yang kamu beli ? </Text>
              </Flex>
              <Text fw={600} fz={18} ta='center' w='fit-content'> (stock : {activeStock}) </Text>
              <Flex mt={10} justify='center'>
                <Input.Wrapper error={errorAmount && errorAmount}>
                  <Input error={errorAmount} type="number" onChange={(e) => setAmount(e.target.value as unknown as number)} />
                </Input.Wrapper>
              </Flex>
              <Flex justify='center' gap={7} mt={10}>
                <Button color="green.7" disabled={errorAmount !== null} onClick={handleSubmit}>Submit</Button>
                <Button color="red.7" miw={83} onClick={() => {
                  setAmount(0)
                  setIsOpen(false)
                }} >Close</Button>
              </Flex>
            </Stack> :
            <Stack py={20}>
              <Flex justify='center'>
                <Text fw={600} fz={18} ta='center' w='fit-content'>Kamu belum login silahkan login terlebih dahulu</Text>
              </Flex>
              <Flex justify='center'>
                <img className={styles.img} src="https://w7.pngwing.com/pngs/754/929/png-transparent-growtopia-wiki-thumbnail-noob-rectangle-alarak-wiki.png" alt="sad" />
              </Flex>
              <Flex justify='center' gap={7} mt={10}>
                <Button color="green.7" onClick={() => router.push('/login')}>Ke Halaman Login</Button>
                <Button color="red.7" miw={83} onClick={() => {
                  setAmount(0)
                  setIsOpen(false)
                }} >Close</Button>
              </Flex>
            </Stack>
          }
        </Modal>
      </Container >
    </div >
  </>)
}