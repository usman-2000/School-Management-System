import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LineChart, Line, ResponsiveContainer } from "recharts"
import { useState } from "react"

// Students Donut Chart Data
const studentsData = [
    { name: "New/Total", value: 45414, color: "#84cc16" },
    { name: "Other", value: 40270, color: "#06b6d4" },
]

// Attendance Bar Chart Data
const attendanceData = [
    { day: "Mon", present: 65, absent: 35 },
    { day: "Tue", present: 70, absent: 30 },
    { day: "Wed", present: 95, absent: 5, highlight: true },
    { day: "Thu", present: 85, absent: 15 },
    { day: "Fri", present: 80, absent: 20 },
]

// Invoice Line Chart Data
const invoiceData = [
    { month: "Jan", paid: 600, unpaid: 400 },
    { month: "Feb", paid: 500, unpaid: 350 },
    { month: "Mar", paid: 400, unpaid: 300 },
    { month: "Apr", paid: 450, unpaid: 320 },
    { month: "May", paid: 500, unpaid: 380 },
    { month: "Jun", paid: 420, unpaid: 300 },
    { month: "Jul", paid: 550, unpaid: 400 },
    { month: "Aug", paid: 480, unpaid: 350 },
    { month: "Sep", paid: 600, unpaid: 450 },
    { month: "Oct", paid: 650, unpaid: 500 },
    { month: "Nov", paid: 580, unpaid: 420 },
    { month: "Dec", paid: 700, unpaid: 550 },
]

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-2 border border-gray-200 rounded shadow-lg">
                <p className="text-sm font-medium">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                        {entry.dataKey}: {entry.value}
                    </p>
                ))}
            </div>
        )
    }
    return null
}

export function DashboardWidgets() {
    const [date, setDate] = useState(new Date(2021, 10, 15)) // November 15, 2021

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Students Chart */}
            <Card className="bg-white shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-800">Students</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center">
                        <ChartContainer
                            config={{
                                newTotal: { label: "New/Total", color: "#84cc16" },
                                other: { label: "Other", color: "#06b6d4" },
                            }}
                            className="h-48 w-48"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={studentsData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {studentsData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <ChartTooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-lime-500 rounded-full"></div>
                            <span className="text-sm font-semibold text-gray-800">45,414</span>
                            <span className="text-xs text-gray-500">New/Total</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                            <span className="text-sm font-semibold text-gray-800">40,270</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Attendance Chart */}
            <Card className="bg-white shadow-sm">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg font-semibold text-gray-800">Attendance</CardTitle>
                        <div className="flex items-center space-x-4 text-xs">
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                                <span>Total Present</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-lime-500 rounded-full"></div>
                                <span>Total Absent</span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-4">
                    <ChartContainer
                        config={{
                            present: { label: "Present", color: "#06b6d4" },
                            absent: { label: "Absent", color: "#84cc16" },
                        }}
                        className="h-40 w-full"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={attendanceData}
                                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                                barCategoryGap="20%"
                            >
                                <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={12} />
                                <YAxis hide />
                                <ChartTooltip content={<CustomTooltip />} />
                                <Bar dataKey="present" fill="#06b6d4" radius={[2, 2, 0, 0]} maxBarSize={20} />
                                <Bar dataKey="absent" fill="#84cc16" radius={[2, 2, 0, 0]} maxBarSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                    <div className="text-center mt-2">
                        <span className="text-2xl font-bold text-gray-800">95%</span>
                    </div>
                </CardContent>
            </Card>

            {/* Calendar Widget */}
            <Card className="bg-white shadow-sm">
                <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-800">November 2021</CardTitle>
                </CardHeader>
                <CardContent className="px-3 py-2">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border-0 w-full"
                        classNames={{
                            months: "flex flex-col space-y-2",
                            month: "space-y-2",
                            caption: "flex justify-center pt-1 relative items-center",
                            caption_label: "text-sm font-medium",
                            nav: "space-x-1 flex items-center",
                            nav_button: "h-6 w-6 bg-transparent p-0 opacity-50 hover:opacity-100",
                            nav_button_previous: "absolute left-1",
                            nav_button_next: "absolute right-1",
                            table: "w-full border-collapse",
                            head_row: "flex",
                            head_cell: "text-muted-foreground rounded-md w-7 font-normal text-[0.7rem] flex-1 text-center",
                            row: "flex w-full mt-1",
                            cell: "text-center text-sm p-0 relative flex-1 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                            day: "h-7 w-7 p-0 font-normal text-xs aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md mx-auto",
                            day_selected:
                                "bg-cyan-500 text-white hover:bg-cyan-500 hover:text-white focus:bg-cyan-500 focus:text-white",
                            day_today: "bg-accent text-accent-foreground",
                            day_outside: "text-muted-foreground opacity-50",
                            day_disabled: "text-muted-foreground opacity-50",
                            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                            day_hidden: "invisible",
                        }}
                    />
                </CardContent>
            </Card>

            {/* Invoice Chart - Full Width */}
            <Card className="bg-white shadow-sm lg:col-span-3">
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-lg font-semibold text-gray-800">Invoice</CardTitle>
                        <div className="flex items-center space-x-4 text-xs">
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                                <span>Paid</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-lime-500 rounded-full"></div>
                                <span>Unpaid</span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-4 py-2">
                    <ChartContainer
                        config={{
                            paid: { label: "Paid", color: "#06b6d4" },
                            unpaid: { label: "Unpaid", color: "#84cc16" },
                        }}
                        className="h-48 w-full"
                    >
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={invoiceData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                                <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
                                <YAxis hide />
                                <ChartTooltip content={<CustomTooltip />} />
                                <Line
                                    type="monotone"
                                    dataKey="paid"
                                    stroke="#06b6d4"
                                    strokeWidth={2}
                                    dot={{ fill: "#06b6d4", strokeWidth: 2, r: 3 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="unpaid"
                                    stroke="#84cc16"
                                    strokeWidth={2}
                                    dot={{ fill: "#84cc16", strokeWidth: 2, r: 3 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
