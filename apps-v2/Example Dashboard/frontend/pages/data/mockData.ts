export interface Kpi {
  label: string
  value: string
  delta: number
  trend: 'up' | 'down'
}

export const kpis: Kpi[] = [
  { label: 'Total Revenue', value: '$482,900', delta: 12.5, trend: 'up' },
  { label: 'New Customers', value: '1,284', delta: 8.2, trend: 'up' },
  { label: 'Active Orders', value: '342', delta: -3.1, trend: 'down' },
  { label: 'Conversion Rate', value: '4.7%', delta: 1.4, trend: 'up' },
]

export interface RevenuePoint {
  month: string
  revenue: number
  expenses: number
}

export const revenueData: RevenuePoint[] = [
  { month: 'Jan', revenue: 32000, expenses: 21000 },
  { month: 'Feb', revenue: 38000, expenses: 24000 },
  { month: 'Mar', revenue: 35000, expenses: 22000 },
  { month: 'Apr', revenue: 47000, expenses: 28000 },
  { month: 'May', revenue: 52000, expenses: 30000 },
  { month: 'Jun', revenue: 49000, expenses: 29000 },
  { month: 'Jul', revenue: 61000, expenses: 33000 },
  { month: 'Aug', revenue: 58000, expenses: 32000 },
  { month: 'Sep', revenue: 67000, expenses: 36000 },
  { month: 'Oct', revenue: 72000, expenses: 38000 },
  { month: 'Nov', revenue: 78000, expenses: 41000 },
  { month: 'Dec', revenue: 85000, expenses: 44000 },
]

export interface ChannelPoint {
  name: string
  value: number
}

export const channelData: ChannelPoint[] = [
  { name: 'Direct', value: 4200 },
  { name: 'Organic', value: 3100 },
  { name: 'Referral', value: 1800 },
  { name: 'Social', value: 2400 },
]

export interface Order {
  id: string
  customer: string
  product: string
  amount: string
  status: 'Paid' | 'Pending' | 'Refunded'
  date: string
}

export const orders: Order[] = [
  { id: 'ORD-7821', customer: 'Alice Chen', product: 'Pro Plan', amount: '$249.00', status: 'Paid', date: '2024-06-12' },
  { id: 'ORD-7820', customer: 'Marcus Reed', product: 'Team Plan', amount: '$599.00', status: 'Pending', date: '2024-06-12' },
  { id: 'ORD-7819', customer: 'Priya Nair', product: 'Starter Plan', amount: '$49.00', status: 'Paid', date: '2024-06-11' },
  { id: 'ORD-7818', customer: 'Tom Baker', product: 'Pro Plan', amount: '$249.00', status: 'Refunded', date: '2024-06-11' },
  { id: 'ORD-7817', customer: 'Sofia Rossi', product: 'Enterprise', amount: '$1,299.00', status: 'Paid', date: '2024-06-10' },
  { id: 'ORD-7816', customer: 'Liam Walsh', product: 'Team Plan', amount: '$599.00', status: 'Paid', date: '2024-06-10' },
  { id: 'ORD-7815', customer: 'Nina Petrova', product: 'Starter Plan', amount: '$49.00', status: 'Pending', date: '2024-06-09' },
]
