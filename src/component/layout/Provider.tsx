import { Container, MantineProvider, createTheme, rem } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import '@mantine/notifications/styles.css';

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
  colors: {
    'brand': [
      "#ffece4",
      "#ffd9cc",
      "#ffb29a",
      "#ff8963",
      "#ff6636",
      "#ff4f18",
      "#ff4307",
      "#e43400",
      "#cc2c00",
      "#b22100"
    ],
  },
  primaryColor: 'brand',
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

export default function Provider({ children }: { children: React.ReactNode }) {

  const [queryClient] = useState(() => new QueryClient());

  return (<QueryClientProvider client={queryClient}>
    <MantineProvider theme={theme}>
      <Notifications
        position="top-right" zIndex={10000000}
      />
      {children}
    </MantineProvider>
  </QueryClientProvider>);
}