import { useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, ChevronsUpDown } from 'lucide-react'
import { Badge } from '../../lib/shadcn/badge'
import { Card, CardContent, CardHeader, CardTitle } from '../../lib/shadcn/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../lib/shadcn/table'
import { cn } from '../../lib/shadcn/utils'
import type { Order } from '../data/mockData'

const statusVariant: Record<Order['status'], 'success' | 'warning' | 'destructive'> = {
  Paid: 'success',
  Pending: 'warning',
  Refunded: 'destructive',
}

type SortKey = keyof Order
type SortDir = 'asc' | 'desc'

const parseAmount = (amount: string): number => Number(amount.replace(/[^0-9.-]/g, ''))

function sortValue(order: Order, key: SortKey): string | number {
  if (key === 'amount') return parseAmount(order.amount)
  return order[key]
}

export function OrdersTable({ orders }: { orders: Order[] }) {
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>('asc')

  const sortedOrders = useMemo(() => {
    if (!sortKey) return orders
    return [...orders].sort((a, b) => {
      const av = sortValue(a, sortKey)
      const bv = sortValue(b, sortKey)
      let cmp = 0
      if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv
      else cmp = String(av).localeCompare(String(bv))
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [orders, sortKey, sortDir])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const columns: { key: SortKey; label: string; align?: 'right' }[] = [
    { key: 'id', label: 'Order' },
    { key: 'customer', label: 'Customer' },
    { key: 'product', label: 'Product' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status' },
    { key: 'amount', label: 'Amount', align: 'right' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => {
                const active = sortKey === col.key
                return (
                  <TableHead
                    key={col.key}
                    className={cn(col.align === 'right' && 'text-right')}
                  >
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className={cn(
                        'inline-flex items-center gap-1 select-none transition-colors hover:text-foreground',
                        col.align === 'right' && 'flex-row-reverse',
                        active ? 'text-foreground' : 'text-muted-foreground',
                      )}
                    >
                      {col.label}
                      {active ? (
                        sortDir === 'asc' ? (
                          <ArrowUp className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowDown className="w-3.5 h-3.5" />
                        )
                      ) : (
                        <ChevronsUpDown className="w-3.5 h-3.5 opacity-50" />
                      )}
                    </button>
                  </TableHead>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs">{order.id}</TableCell>
                <TableCell className="font-medium">{order.customer}</TableCell>
                <TableCell className="text-muted-foreground">{order.product}</TableCell>
                <TableCell className="text-muted-foreground">{order.date}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-right font-medium">{order.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
