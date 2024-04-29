/* eslint-disable @next/next/no-img-element */
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, Flex, SimpleGrid, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from '@/styles/register.module.css'
import { Navbar } from "@/component/layout";

const schema = z.object({
  firstName: z.string().min(5, { message: 'minimal 5 karakter' }),
  lastName: z.string().min(5, { message: 'minimal 5 karakter' }),
  telephone: z.number({ message: 'harus berupa angka' }),
  password: z.string().min(8, { message: 'minimal 8 karakter' }),
  confirmPassword: z.string().min(8, { message: 'minimal 8 karakter' })
}).refine((data) => data.password === data.confirmPassword, {
  message: "password tidak sama, periksa ulang",
  path: ["confirmPassword"]
})

export default function Register() {

  type RegisterSchema = z.infer<typeof schema>;

  const { register, handleSubmit, formState: {
    errors
  } } = useForm<RegisterSchema>({
    mode: 'onBlur',
    resolver: zodResolver(schema)
  })


  return (<>
    <Navbar />
    <div className="wrapper">
      <Container fluid
        px={{
          base: '20',
          sm: 50
        }}
        py={24}
        maw={1800}
        w='100%' >
        <SimpleGrid cols={{ base: 1, lg: 2 }}>
          <form
            className={styles.wrapper_form}
            onSubmit={handleSubmit((d) => console.log(d))}
          >
            <Flex gap={10}

            >
              <TextInput
                label='Nama Depan'
                placeholder="John"
                w='100%'
                error={errors.firstName?.message}
                {...register('firstName')}
              />
              <TextInput
                label='Nama Belakang'
                error={errors.lastName?.message}

                placeholder="Doe"
                w='100%'

                {...register('lastName')}
              />
            </Flex>
            <TextInput
              label='Nomor Telepon'
              error={errors.telephone?.message}

              placeholder="628xxxxxxxx"
              {...register('telephone')}

            />
            <TextInput
              label='Password'
              error={errors.password?.message}

              placeholder="p@assW0rd123"
              {...register('password')}

            />
            <TextInput
              label='Konfirmasi Password'
              placeholder="p@assW0rd123"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}

            />
            <Button type="submit"

              mt="sm">
              Submit
            </Button>
          </form>
          <Flex display={{ base: 'none', lg: 'flex' }} justify='end' align='center' pt='100'>
            <img style={{
              maxHeight: '500px'
            }} src="/img/goroblox.png" alt="hero" />
          </Flex>
        </SimpleGrid>

      </Container>
    </div>
  </>)
}