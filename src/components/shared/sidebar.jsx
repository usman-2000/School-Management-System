"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useNavigate, useLocation } from "react-router-dom"
import {
    LayoutDashboard,
    Users,
    FileText,
    UserCheck,
    BarChart3,
    DollarSign,
    User,
    Settings,
    LogOut,
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

const navigationItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Students", icon: Users, path: "/students" },
    { name: "Invoice", icon: FileText, path: "/invoice" },
    { name: "Role & User", icon: UserCheck, path: "/role-user" },
    { name: "Reports", icon: BarChart3, path: "/reports" },
    { name: "Fee Structure", icon: DollarSign, path: "/fee-structure" },
]

const bottomItems = [
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Setting", icon: Settings, path: "/settings" },
]

export function Sidebar({ className }) {
    const navigate = useNavigate()
    const location = useLocation()
    const { logout, user } = useAuth()

    const handleNavigation = (path) => {
        navigate(path)
    }

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    const isActive = (path) => location.pathname === path

    return (
        <div className={cn("w-64 bg-white border-r border-gray-200 flex flex-col h-full", className)}>
            {/* Logo Section */}
            <div className="p-3 border-b border-gray-200">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">N</span>
                    </div>
                    <span className="text-xl font-bold text-gray-800">NEXUS</span>
                </div>
            </div>

            {/* User Info Section */}
            {/* {user && (
                <div className="p-4 border-b border-gray-200">
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.role}</p>
                    </div>
                </div>
            )} */}

            {/* Navigation Items */}
            <div className="flex-1 py-4">
                <nav className="space-y-1 px-3">
                    {navigationItems.map((item) => (
                        <Button
                            key={item.name}
                            variant={isActive(item.path) ? "default" : "ghost"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                isActive(item.path)
                                    ? "bg-cyan-500 text-white hover:bg-cyan-600"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                            )}
                            onClick={() => handleNavigation(item.path)}
                        >
                            <item.icon className="mr-3 h-4 w-4" />
                            {item.name}
                        </Button>
                    ))}
                </nav>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-200 p-3">
                <div className="space-y-1">
                    {bottomItems.map((item) => (
                        <Button
                            key={item.name}
                            variant="ghost"
                            className="w-full justify-start text-left font-normal text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                            onClick={() => handleNavigation(item.path)}
                        >
                            <item.icon className="mr-3 h-4 w-4" />
                            {item.name}
                        </Button>
                    ))}

                    {/* Logout Button */}
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-left font-normal text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={handleLogout}
                    >
                        <LogOut className="mr-3 h-4 w-4" />
                        Log out
                    </Button>
                </div>
            </div>
        </div>
    )
}