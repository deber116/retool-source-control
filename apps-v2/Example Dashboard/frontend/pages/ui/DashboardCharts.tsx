import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '../../lib/shadcn/card'
import type { ChannelPoint, RevenuePoint } from '../data/mockData'
import './chartColors.css'

const CHANNEL_COLORS = [
  'hsl(var(--series-channel-1))',
  'hsl(var(--series-channel-2))',
  'hsl(var(--series-channel-3))',
  'hsl(var(--series-channel-4))',
]

export function RevenueChart({ data }: { data: RevenuePoint[] }) {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Revenue vs Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ left: -12, right: 8, top: 4 }}>
            <defs>
              <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--series-revenue))" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(var(--series-revenue))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--series-expenses))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--series-expenses))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={(v: number) => `$${v / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 8,
                color: 'hsl(var(--popover-foreground))',
              }}
              formatter={(v) => `$${Number(v).toLocaleString()}`}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(var(--series-revenue))"
              strokeWidth={2}
              fill="url(#revFill)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="hsl(var(--series-expenses))"
              strokeWidth={2}
              fill="url(#expFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function ChannelChart({ data }: { data: ChannelPoint[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Traffic by Channel</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={CHANNEL_COLORS[index % CHANNEL_COLORS.length] ?? 'hsl(var(--chart-1))'}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--popover))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 8,
                color: 'hsl(var(--popover-foreground))',
              }}
              formatter={(v) => Number(v).toLocaleString()}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
