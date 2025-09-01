import { Outlet } from 'react-router-dom'
import { Sidebar } from '../shared/sidebar'
import { Header } from '../shared/navbar'

export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <Header />

                {/* Page Content */}
                <main className="flex-1 p-6">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}