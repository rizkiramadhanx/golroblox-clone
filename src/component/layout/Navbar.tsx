import { Burger, Container, Flex } from "@mantine/core";
import styles from '@/component/layout/css/navbar.module.css'
import { useEffect, useState } from "react";
import { Drawer } from '@mantine/core';
import { useViewportSize, useWindowScroll } from "@mantine/hooks";
import { Poppins } from "next/font/google";
import clsx from "clsx";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})

export default function Navbar() {

  const [toggle, setToggle] = useState(false)
  const { width } = useViewportSize();

  useEffect(() => {
    if (width > 575) {
      setToggle(false)
    }
  }, [toggle, width])

  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Container className={clsx((scroll.y !== 0 || width < 575) && styles.shadow)} pos='fixed' bg='white' style={{ zIndex: 9999 }} fluid py={{ base: 12, sm: 16 }}
      px={{
        base: '20',
        sm: 100
      }}
      w='100%' >

      <Flex justify='space-between' align='center' >
        <img className={styles.img_logo} src="https://storage.googleapis.com/komerce/assets/LP-Komerce/komplace.svg" />
        <Flex gap='32' display={{ base: 'none', sm: 'flex' }} >
          <div className={styles.navlink}>
            Home
          </div>
          <div className={styles.navlink}>Beli Robux</div>
          <div className={styles.navlink}>Cek Pesanan</div>
        </Flex>
        <Burger onClick={() => setToggle(!toggle)} opened={toggle} display={{ base: 'block', sm: 'none' }} />
      </Flex>
      <Drawer pt={10} position="left" size="100%" opened={toggle} onClose={() => { }}>
        <div className={clsx(poppins.className, styles.mt_2, styles.navlink)}>
          Home
        </div>
        <div className={clsx(poppins.className, styles.navlink)}>Beli Robux</div>
        <div className={clsx(poppins.className, styles.navlink)}>Cek Pesanan</div>
      </Drawer>

    </Container>
  )
}