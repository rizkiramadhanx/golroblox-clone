/* eslint-disable @next/next/no-img-element */
import { Container, Flex } from "@mantine/core";
import { Grid } from '@mantine/core';
import { IconBrandInstagram, IconBrandYoutube } from "@tabler/icons-react";
import styles from '@/component/layout/css/footer.module.css'

export default function Footer() {
  return (<Container fluid
    px={{
      base: '20',
      sm: 100
    }}
    className={styles.container_footer}
    py={64}
    maw={1800}
    w='100%' >
    <Grid>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Grid >
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Flex direction='column' gap={16}>
              <Flex>
                <img className={styles.logo_footer} src="https://storage.googleapis.com/komerce/assets/LP-Komerce/komplace.svg" alt="logo" />
              </Flex>
              <div className={styles.text_golroblox}>Golroblox.com merupakan website tempat beli robux roblox murah dengan fitur proses instant dan verifikasi pembayaran otomatis.</div>
            </Flex>
            <div className={styles.since}>@Since 2020.</div>
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <div className={styles.title_section}>Sosial Media</div>
            <Flex mt={10} gap={10}>
              <IconBrandInstagram color="#ff5722" size={30} />
              <IconBrandYoutube color="#ff5722" size={30} />
            </Flex>
          </Grid.Col>
        </Grid>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <div className={styles.title_section}>Produk</div>
            <Flex mt={10} direction='column' >
              <div className={styles.text_list}>Beli Robux</div>
              <div className={styles.text_list}>Cara Membeli</div>
              <div className={styles.text_list}>Lihat Ranking</div>
            </Flex>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <div className={styles.title_section}>Bantuan</div>
            <Flex mt={10} direction='column'>
              <div className={styles.text_list}>Kontak Bantuan</div>
              <div className={styles.text_list}>FAQs</div>
            </Flex>
          </Grid.Col> <Grid.Col span={{ base: 12, md: 4 }}>
            <div className={styles.title_section}>Panduan</div>
            <Flex mt={10} direction='column'>
              <div className={styles.text_list}>Syarat dan Kebijakan</div>
              <div className={styles.text_list}>Privasi</div>
            </Flex>
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>

  </Container>)
}