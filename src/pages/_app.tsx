import Provider from "@/component/layout/Provider";
import { Container, MantineProvider, createTheme, rem } from "@mantine/core";
import '@mantine/core/styles.css';
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";




const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
})


export default function App({ Component, pageProps }: AppProps) {

  return (<>
    <Head>
      <title>Mantine Template</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
      />
      <link rel="shortcut icon" href="/favicon.svg" />
    </Head>
    <div
      className={poppins.className}
    >
      <Provider>
        <Component  {...pageProps} />
      </Provider>
    </div>
  </>
  )
}
