import { MetricCards } from "./metric-cards"
import { DashboardWidgets } from "./dashboard-widgets"

export default function DashboardPage() {
    return (
        <div>
            {/* <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1> */}

            {/* Metric Cards */}
            <MetricCards />

            {/* Dashboard Widgets */}
            <DashboardWidgets />
        </div>
    )
}