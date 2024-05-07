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
        position="top-right" zIndex={1000}
      />
      {children}
    </MantineProvider>
  </QueryClientProvider>);
}