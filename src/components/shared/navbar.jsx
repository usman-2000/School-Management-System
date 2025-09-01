"use client"

import { Search, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuth"

export function Header() {
    const { user } = useAuth()

    // Get initials for avatar fallback
    const getInitials = (name) => {
        return name
            ?.split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase() || 'U'
    }

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-2.5">
            <div className="flex items-center justify-between">
                {/* Search Section */}
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search students, invoices, reports..."
                            className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
                        />
                    </div>
                </div>

                {/* Profile Section */}
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                        <Bell className="h-5 w-5" />
                    </Button>

                    {user && (
                        <div className="flex items-center space-x-3">
                            <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                <p className="text-xs text-gray-500">{user.role}</p>
                            </div>
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="bg-cyan-500 text-white">
                                    {getInitials(user.name)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}