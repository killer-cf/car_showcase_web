'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/data/api'
import { env } from '@/env'
import { formatCPForCNPJ } from '@/utils/format-cpf-cnpj'
import { createClient } from '@/utils/supabase/client'

const signUpFormSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Nome é obrigatório, informe no mínimo 3 caracteres'),
    tax_id: z
      .string()
      .transform((data) => data.replace(/[^\d]/g, ''))
      .refine((data) => {
        if (data.length !== 11 && data.length !== 14) {
          return {
            message:
              data.length < 11
                ? 'CPF deve ter 11 caracteres.'
                : 'CNPJ deve ter 14 caracteres.',
          }
        }
        return true
      }),
    email: z.string().email('Email inválido'),
    password: z
      .string()
      .min(8, 'Senha é obrigatória, informe no mínimo 8 caracteres'),
    password_confirmation: z
      .string()
      .min(
        8,
        'Confirmação de senha é obrigatória, informe no mínimo 8 caracteres',
      ),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'As senhas devem ser iguais.',
    path: ['password_confirmation'],
  })

type SignUpForm = z.infer<typeof signUpFormSchema>

export default function SignUpPage() {
  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      tax_id: '',
    },
  })

  const supabase = createClient()

  async function createUser({ email, name, password, tax_id }: SignUpForm) {
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })

    console.log('data', data)

    if (error) {
      toast.error(error.message)
      return
    }

    const res = await api('/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          email,
          name,
          tax_id,
          supabase_id: data.user?.id,
        },
      }),
    })

    form.reset()

    console.log('res', res)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="font-bold text-3xl mt-10">Cadastro</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(createUser)}
          className="space-y-5 w-[600px] p-16 rounded-xl"
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Nome</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
            name="tax_id"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF/CNPJ</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    value={formatCPForCNPJ(field.value)}
                    onChange={(e) => {
                      field.onChange(formatCPForCNPJ(e.target.value))
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Insira apenas números, formatação automática
                </FormDescription>
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

          <FormField
            name="password_confirmation"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Confirme a senha</FormLabel>
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
            Cadastrar
          </Button>
        </form>
      </Form>

      {form.formState.isSubmitSuccessful && (
        <div>
          <p className="font-bold">
            Cheque seu email para confirmar o cadastro
          </p>
        </div>
      )}

      <div className="flex flex-col items-center p-4">
        Já tem uma conta?{' '}
        <Link href="/login">
          <Button variant={'link'}>Entrar</Button>
        </Link>
      </div>
    </div>
  )
}
