/* eslint-disable @next/next/no-img-element */
import styles from './hero.module.css';
import { Button, Container, Flex, SimpleGrid } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { useRouter } from 'next/router';

export default function Hero() {

  const router = useRouter()
  return (
    <Container fluid
      px={{
        base: '20',
        sm: 50
      }}
      maw={1800}
      pt={{
        base: 50,
        sm: 0
      }}
      w='100%' >
      <SimpleGrid cols={{ base: 1, lg: 2 }} className={styles.grid_styles} >
        <Flex direction='column' gap='15' justify='center'>
          <div className={styles.title}>Upgrade Akun Roblox Kamu di Golroblox</div>
          <div className={styles.description}>Miliki Robux dengan biaya termurah dan terhemat hanya di Golroblox, proses instan dan verifikasi pembayaran otomatis.</div>
          <Flex gap='15'>
            <Button fz='16' color="#ff5722" fw={400} size='lg' onClick={() => router.push('/pricing')} >Beli Robux</Button>
            <Button fz='16'
              leftSection={<IconShoppingCart size={20} />}
              fw={400} color="white" className={styles.right_button} size='lg'>Cara Membeli</Button>
          </Flex>
        </Flex>
        <Flex justify={{ base: 'center', xl: 'end' }}
          display={{ base: 'none', sm: 'flex' }}
          pt={100}
        >
          <img style={{
            maxHeight: '500px'
          }} src="/img/goroblox.png" alt="hero" />
        </Flex>
      </SimpleGrid>
    </Container>
  )
}