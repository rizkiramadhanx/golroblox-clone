import { Container, Flex, SimpleGrid } from "@mantine/core";
import styles from './benefit.module.css'
import { IconCash, IconShoppingCartPin, IconMedal2, IconUsers } from "@tabler/icons-react";

const dataBenefit = [{
  title: "Pengiriman Instant",
  icon: <IconShoppingCartPin size={60} color="#ff5722" />
},
{
  title: "Pembayaran Terlengkap",
  icon: <IconCash size={60} color="#ff5722" />
}, {
  title: "Mudah dan Bergaransi",
  icon: <IconMedal2 size={60} color="#ff5722" />
}, {
  title: "Pelayanan Terbaik",
  icon: <IconUsers size={60} color="#ff5722" />
}]

export default function Benefit() {
  return (
    <Container fluid
      px={{
        base: '20',
        sm: 50
      }}
      py={62}
      maw={1800}
      w='100%' >

      <div className={styles.title}>Yuk Beli di Website Golroblox</div>
      <SimpleGrid cols={{base: 1, xs: 2, lg: 4}} mt={30}>
        {dataBenefit.map((data, key) => <Flex justify='center'  p={10} align='center' key={key}>
          <div>
            <div className={styles.title_card}>{data.title}</div>
            <Flex justify='center' mt={16} className={styles.box_shadow} align='center'>
              {data.icon}
            </Flex>
          </div>
        </Flex>)}
      </SimpleGrid>
    </Container>
  )
}