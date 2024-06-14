import { Stack } from "@mantine/core";
import { IconLoader2 } from "@tabler/icons-react";

export default function Loading() {
  return (
    <Stack mih='100vh' display='flex' justify='center' align='center'>
      <Stack >
        <IconLoader2 size='70' color="#ff8963" />
        <Stack color="brand.4">Loading ....</Stack>
      </Stack>
    </Stack>
  )
}