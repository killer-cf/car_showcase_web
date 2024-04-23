'use client'

import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { MoreHorizontal } from 'lucide-react'
import { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Brand } from '@/data/types/brand'

const Header = ({ children }: { children: ReactNode }) => (
  <div className="text-center font-bold">{children}</div>
)

export const brandsColumns: ColumnDef<Brand>[] = [
  {
    accessorKey: 'name',
    header: () => <Header>Nome</Header>,
  },
  {
    accessorKey: 'id',
    header: () => <Header>ID</Header>,
  },
  {
    accessorKey: 'created_at',
    header: () => <Header>Criado em</Header>,
    cell: ({ row }) => {
      const fDate = format(new Date(row.getValue('created_at')), 'dd/MM/yyyy')
      return <div>{fDate}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copiar ID
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem>Ver carros</DropdownMenuItem>
            <DropdownMenuItem>Ver modelos</DropdownMenuItem>
            <DropdownMenuItem>Excluir</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
