"use client"

import { Burger, Button, Container, Drawer, Flex, Modal } from "@mantine/core";
import { useViewportSize, useWindowScroll } from "@mantine/hooks";
import clsx from "clsx";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from './navbar.module.css';
import { IconUserCircle } from "@tabler/icons-react";
import useLogin from "@/hooks/useLogin";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})


export default function Navbar() {

  const router = useRouter()
  const isLogin = useLogin()


  const [openModal, setOpenModal] = useState<boolean>(false)

  const [toggle, setToggle] = useState(false)
  const { width } = useViewportSize();

  useEffect(() => {
    if (width > 575) {
      setToggle(false)
    }
  }, [toggle, width])

  const [scroll] = useWindowScroll();

  return (
    <Container className={clsx((scroll.y !== 0 || width < 575) && styles.shadow)} pos='fixed' bg='white' style={{ zIndex: (width > 575) || openModal ? 10 : 9999 }} fluid py={{ base: 12, sm: 16 }}
      px={{
        base: '20',
        sm: 50
      }}
      w='100%' >
      <Flex justify='space-between' align='center' >
        <img className={styles.img_logo} src="https://storage.googleapis.com/komerce/assets/LP-Komerce/komplace.svg" />
        <Flex gap='32' align='center' display={{ base: 'none', sm: 'flex' }} >
          <div onClick={() => router.push('/')} className={styles.navlink}>
            Home
          </div>
          <div onClick={() => router.push('/pricing')} className={styles.navlink}>Beli Robux</div>
          {isLogin ?
            <>
              <div className={styles.navlink}>Cek Pesanan</div>
              <div><IconUserCircle onClick={() => router.push('/my-profile')} className={styles.navlink} /></div>
            </> : <Flex align='center' gap={10}>
              <Button onClick={() => router.push('/login')} >Login</Button>
              <Button onClick={() => router.push('/register')} variant="outline">Register</Button>
            </Flex>}

        </Flex>
        <Burger onClick={() => setToggle(!toggle)} opened={toggle} display={{ base: 'block', sm: 'none' }} />
      </Flex>
      <Drawer pt={10} position="left" size="100%" opened={toggle} onClose={() => { }}>
        <div className={clsx(poppins.className, styles.mt_2, styles.navlink)}>
          Home
        </div>
        <div onClick={() => setOpenModal(!openModal)} className={clsx(poppins.className, styles.navlink)}>Beli Robux</div>
        <div className={clsx(poppins.className, styles.navlink)}>Cek Pesanan</div>
      </Drawer>
      <Modal opened={openModal} onClose={() => setOpenModal(false)} withCloseButton={false} style={{ zIndex: 11 }} title="Authentication">

      </Modal>
    </Container>
  )
}