import type { AppProps } from "next/app";
import '@mantine/core/styles.css';
import { Container, MantineProvider, createTheme, rem } from "@mantine/core";
import Head from "next/head";
import { Poppins } from "next/font/google";


const CONTAINER_SIZES: Record<string, string> = {
  xxs: rem(300),
  xs: rem(400),
  sm: rem(500),
  md: rem(600),
  lg: rem(700),
  xl: rem(800),
  xxl: rem(900),
};

const theme = createTheme({
  components: {
    Container: Container.extend({
      vars: (_, { size, fluid }) => ({
        root: {
          '--container-size': fluid
            ? '100%'
            : size !== undefined && size in CONTAINER_SIZES
              ? CONTAINER_SIZES[size]
              : rem(size),
        },
      }),
    }),
  },
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400","500", "600", "700","800"],
})


export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
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
        <Component  {...pageProps} />
      </div>
    </MantineProvider>)
}
