"use client"

import { Navbar } from "@/component/layout";
import { baseUrlAxios } from "@/utils/axios";
import { Button, Container, Flex, Pagination, Stack, Table, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import { parseAsInteger, useQueryState } from 'nuqs'
import { useState } from "react";
import { format } from 'date-fns'
import { id } from 'date-fns/locale'


export default function OrderHistory() {

  const [skip, setSkip] = useQueryState('skip',
    parseAsInteger.withDefault(0)
  )
  const [take, setTake] = useQueryState('take',
    parseAsInteger.withDefault(10)
  )

  const [page, setPage] = useQueryState('page',
    parseAsInteger.withDefault(1)
  )

  const handleChangePagination = (page: number) => {
    setSkip((page - 1) * 10)
    setPage(page)
  }

  const { data, isSuccess } = useQuery({
    queryKey: ['pricing-data', skip, take],
    queryFn: async () => {
      const data = baseUrlAxios.get('/api/v1/order-history/me', {
        params: {
          skip: skip || 0,
          take: take || 10
        }
      })
      return data
    }
  })

  const downloadTxtFile = (text: string, nameFile: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'order-' + nameFile + '.txt');

    link.click();

    window.URL.revokeObjectURL(url);
  }

  const formatDateHistoryOrder = (date: string) => {
    const targetDate = new Date(date)

    const formattedDate = format(targetDate, 'PP', { locale: id })
    
    const formateTimer = format(targetDate, 'p', { locale: id })

    return formattedDate + ', Pukul ' + formateTimer
  }


  return (<>
    <Head>
      <title>
        {process.env.NEXT_PUBLIC_NAME_WEBSITE}
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
        <Stack mt={90}>
          <Text size="lg" fw={600} >
            History Pesanan
          </Text>
          <Table.ScrollContainer minWidth={700} mt={10}>
            <Table stickyHeader striped stripedColor="brand.0" withTableBorder>
              <Table.Thead >
                <Table.Tr bg="gray.1">
                  <Table.Th>No</Table.Th>
                  <Table.Th>Nama Item</Table.Th>
                  <Table.Th>Harga</Table.Th>
                  <Table.Th>Jumlah Beli</Table.Th>
                  <Table.Th>Total Pengeluaran</Table.Th>
                  <Table.Th>Waktu Tranksaksi</Table.Th>

                  <Table.Th>Aksi</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {isSuccess ? data.data.data.map((e: any, index: number) =>
                  <Table.Tr key={index}>
                    <Table.Td>{(((page - 1) < 0 ? page : page - 1) * 10) + index + 1}</Table.Td>
                    <Table.Td>{e.Product.name}</Table.Td>
                    <Table.Td>{e.Product.price} Token</Table.Td>
                    <Table.Td>{e.quantity}</Table.Td>
                    <Table.Td>{e.quantity * e.Product.price}</Table.Td>
                    <Table.Td> {formatDateHistoryOrder(e.createdAt)}</Table.Td>
                    <Table.Td>
                      <Button onClick={() => downloadTxtFile(e.items.join("\n"), e.createdAt)} fz={11} color="green" variant="filled">Download Data</Button >
                    </Table.Td>
                  </Table.Tr>
                ) :
                  <Table.Tr>
                    <Table.Td colSpan={6} >
                      <Flex justify='center'>
                        <Text>Data Kosong</Text>
                      </Flex>
                    </Table.Td>
                  </Table.Tr>
                }
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
          <Pagination
            onChange={(e) => handleChangePagination(e)}
            value={page}
            total={(data?.data.pagination.total / (data?.data.pagination.take)) + 1}
          />
        </Stack>
      </Container>
    </div>
  </>)
}