import { Calendar, Download } from 'lucide-react'
import { Button } from '../lib/shadcn/button'
import { channelData, kpis, orders, revenueData } from './data/mockData'
import { ChannelChart, RevenueChart } from './ui/DashboardCharts'
import { KpiCards } from './ui/KpiCards'
import { OrdersTable } from './ui/OrdersTable'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Overview of your store performance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Last 12 months
            </Button>
            <Button size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </header>

        <div className="mt-8 space-y-6">
          <KpiCards kpis={kpis} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <RevenueChart data={revenueData} />
            <ChannelChart data={channelData} />
          </div>

          <OrdersTable orders={orders} />
        </div>
      </div>
    </div>
  )
}
