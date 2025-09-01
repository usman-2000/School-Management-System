
import { Badge } from "@/components/ui/badge"
import { InvoiceForm } from "./InvoiceForm"
import { DynamicTable } from "@/components/shared/dynamic-table"
import { Header } from "@/components/shared/navbar"
import { Sidebar } from "@/components/shared/sidebar"

// Sample invoice data
const invoiceData = [
    {
        id: "1",
        invoiceNo: "#21145",
        studentId: "2016-01",
        studentName: "Current Bank",
        dueDate: "8/16/15",
        expiryDate: "8/16/15",
        amount: "5000 PKR",
        afterDueDate: "5500 PKR",
        status: "Unpaid",
        monthOfFee: "October",
    },
    {
        id: "2",
        invoiceNo: "#21145",
        studentId: "2016-01",
        studentName: "Current Bank",
        dueDate: "8/16/15",
        expiryDate: "8/16/15",
        amount: "5000 PKR",
        afterDueDate: "5500 PKR",
        status: "Paid",
        monthOfFee: "October",
    },
    {
        id: "3",
        invoiceNo: "#21145",
        studentId: "2016-01",
        studentName: "Current Bank",
        dueDate: "8/16/15",
        expiryDate: "8/16/15",
        amount: "5000 PKR",
        afterDueDate: "5500 PKR",
        status: "Unpaid",
        monthOfFee: "October",
    },
    {
        id: "4",
        invoiceNo: "#21145",
        studentId: "2016-01",
        studentName: "Current Bank",
        dueDate: "8/16/15",
        expiryDate: "8/16/15",
        amount: "5000 PKR",
        afterDueDate: "5500 PKR",
        status: "Paid",
        monthOfFee: "October",
    },
]

const columns = [
    { key: "invoiceNo", label: "Invoice No" },
    { key: "studentId", label: "Student ID" },
    { key: "studentName", label: "Student Name" },
    { key: "dueDate", label: "Due Date" },
    { key: "expiryDate", label: "Expiry Date" },
    { key: "amount", label: "Amount" },
    { key: "afterDueDate", label: "After Due Date" },
    {
        key: "status",
        label: "Status",
        render: (value) => (
            <Badge variant={value === "Paid" ? "default" : "destructive"} className="text-xs">
                <div className={`w-2 h-2 rounded-full mr-1 ${value === "Paid" ? "bg-green-500" : "bg-red-500"}`} />
                {value}
            </Badge>
        ),
    },
    { key: "monthOfFee", label: "Month of Fee" },
]

const filters = [
    {
        key: "status",
        label: "Status",
        options: [
            { value: "paid", label: "Paid" },
            { value: "unpaid", label: "Unpaid" },
        ],
    },
    {
        key: "monthOfFee",
        label: "Month",
        options: [
            { value: "january", label: "January" },
            { value: "february", label: "February" },
            { value: "march", label: "March" },
            { value: "april", label: "April" },
            { value: "may", label: "May" },
            { value: "june", label: "June" },
            { value: "july", label: "July" },
            { value: "august", label: "August" },
            { value: "september", label: "September" },
            { value: "october", label: "October" },
            { value: "november", label: "November" },
            { value: "december", label: "December" },
        ],
    },
]

export default function InvoicePage() {
    const handleEdit = (invoice) => {
        console.log("Edit invoice:", invoice)
    }

    const handleView = (invoice) => {
        console.log("View invoice:", invoice)
    }

    const handleDelete = (invoice) => {
        console.log("Delete invoice:", invoice)
    }

    return (
        // <div className="flex h-screen bg-gray-50">

        <main className="flex-1 overflow-auto p-3 space-y-6">
            {/* Invoice Form */}
            <InvoiceForm />

            {/* Invoice Table */}
            <DynamicTable
                title="Invoice of Previous Arrears"
                data={invoiceData}
                columns={columns}
                filters={filters}
                searchPlaceholder="Search invoices..."
                itemsPerPage={10}
                onEdit={handleEdit}
                onView={handleView}
                onDelete={handleDelete}
            />
        </main>
        // </div>
    )
}
