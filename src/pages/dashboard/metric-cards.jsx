import { Card, CardContent } from "@/components/ui/card"


function MetricCard({ title, value, bgColor, textColor = "text-white" }) {
    return (
        <Card className={`${bgColor} border-0 shadow-sm`}>
            <CardContent className="p-2">
                <div>
                    <h3 className={`text-xl font-bold ${textColor}`}>{value}</h3>
                    <p className={`text-sm ${textColor} opacity-90`}>{title}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export function MetricCards() {
    const metrics = [
        {
            title: "Students",
            value: "124,684",
            bgColor: "bg-blue-500",
        },
        {
            title: "Units",
            value: "12,379",
            bgColor: "bg-lime-500",
        },
        {
            title: "Publications",
            value: "29,300",
            bgColor: "bg-cyan-500",
        },
        {
            title: "Enrollments",
            value: "95,800",
            bgColor: "bg-lime-400",
        },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {metrics.map((metric, index) => (
                <MetricCard key={index} title={metric.title} value={metric.value} bgColor={metric.bgColor} />
            ))}
        </div>
    )
}
