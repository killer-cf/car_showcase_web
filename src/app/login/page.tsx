'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createClient } from '@/utils/supabase/client'

import { ResendButton } from './resend-button'

const signInFormSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .min(8, 'Senha é obrigatória, informe no mínimo 8 caracteres'),
})

type SignInForm = z.infer<typeof signInFormSchema>

export default function LoginPage() {
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInFormSchema),
  })

  const router = useRouter()

  async function signIn({ email, password }: SignInForm) {
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast.error(error.message)
    }

    router.push('/')
    router.refresh()
    toast.success('Login efetuado com sucesso!')
  }

  const email = form.watch('email')

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="font-bold text-3xl mt-10">Entrar</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(signIn)}
          className="space-y-5 w-[600px] p-16 rounded-xl"
        >
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Email</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Senha</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            variant="default"
          >
            Entrar
          </Button>
        </form>
      </Form>

      {email && <ResendButton email={email} />}

      <div className="flex flex-col items-center p-4">
        Não tem uma conta?{' '}
        <Link href="/signup">
          <Button variant={'link'}>Cadastrar-se</Button>
        </Link>
      </div>
    </div>
  )
}
