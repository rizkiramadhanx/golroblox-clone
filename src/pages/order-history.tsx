"use client"

import { Navbar } from "@/component/layout";
import { baseUrlAxios } from "@/utils/axios";
import { Button, Container, Flex, Pagination, Stack, Table, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";

export default function OrderHistory() {
  const { data, isSuccess } = useQuery({
    queryKey: ['pricing-data'],
    queryFn: async () => {
      const data = baseUrlAxios.get('/api/v1/order-history/me')
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
                  <Table.Th>Aksi</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {isSuccess ? data.data.data.map((e: any, index: number) =>
                  <Table.Tr key={index}>
                    <Table.Td>{index + 1}</Table.Td>
                    <Table.Td>{e.Product.name}</Table.Td>
                    <Table.Td>{e.Product.price} Token</Table.Td>
                    <Table.Td>{e.quantity}</Table.Td>
                    <Table.Td>{e.quantity * e.Product.price}</Table.Td>
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
          {/* TODO : make pagination */}
          <Pagination total={10} />
        </Stack>
      </Container>
    </div>
  </>)
}