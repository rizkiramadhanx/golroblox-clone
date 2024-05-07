import { Burger, Container, Flex, Modal } from "@mantine/core";
import styles from './navbar.module.css'
import { useEffect, useState } from "react";
import { Drawer } from '@mantine/core';
import { useViewportSize, useWindowScroll } from "@mantine/hooks";
import { Poppins } from "next/font/google";
import clsx from "clsx";
import { modals } from "@mantine/modals";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})




export default function Navbar() {

  const [openModal,setOpenModal] = useState<boolean>(false)

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
        <Flex gap='32' display={{ base: 'none', sm: 'flex' }} >
          <div className={styles.navlink}>
            Home
          </div>
          <div onClick={() => setOpenModal(!openModal)} className={styles.navlink}>Beli Robux</div>
          <div className={styles.navlink}>Cek Pesanan</div>
        </Flex>
        <Burger onClick={() => setToggle(!toggle)} opened={toggle} display={{ base: 'block', sm: 'none' }} />
      </Flex>
      <Drawer pt={10}  position="left" size="100%" opened={toggle} onClose={() => { }}>
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