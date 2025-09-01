"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
// import { useRouter } from "next/navigation"

export function InvoiceForm() {
    const router = useNavigate()
    const [formData, setFormData] = useState({
        studentId: "",
        totalAmount: "",
        amountMonthDues: "",
        expiry: "",
        dueDate: "",
        voucherMonth: "",
        voucherYear: "",
        field: "",
        head1: "",
        amount: "",
    })

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSave = () => {
        console.log("Invoice saved:", formData)
        // Handle form submission logic here
    }

    const handleBackToList = () => {
        router("/invoice")
    }

    const handleRequestInvoice = () => {
        console.log("Invoice requested")
        // Handle invoice request logic here
    }

    return (
        <Card className="bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold text-gray-900">Invoice Form (#321545)</CardTitle>
                <Button onClick={handleRequestInvoice} className="bg-cyan-500 hover:bg-cyan-600 text-white">
                    Request Invoice
                </Button>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="student-id">Student ID</Label>
                        <Input
                            id="student-id"
                            placeholder="2016-01-001"
                            value={formData.studentId}
                            onChange={(e) => handleInputChange("studentId", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="due-date">Due Date</Label>
                        <Input
                            id="due-date"
                            placeholder="Sep 14 2020"
                            value={formData.dueDate}
                            onChange={(e) => handleInputChange("dueDate", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="total-amount">Total Amount</Label>
                        <Input
                            id="total-amount"
                            placeholder="5000.00"
                            value={formData.totalAmount}
                            onChange={(e) => handleInputChange("totalAmount", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry</Label>
                        <Input
                            id="expiry"
                            placeholder="Sep 14 2020"
                            value={formData.expiry}
                            onChange={(e) => handleInputChange("expiry", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount-month-dues">Amount/Month/Dues</Label>
                        <Input
                            id="amount-month-dues"
                            placeholder="5000.00"
                            value={formData.amountMonthDues}
                            onChange={(e) => handleInputChange("amountMonthDues", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="voucher-month">Voucher Month</Label>
                        <Select value={formData.voucherMonth} onValueChange={(value) => handleInputChange("voucherMonth", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="September" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="january">January</SelectItem>
                                <SelectItem value="february">February</SelectItem>
                                <SelectItem value="march">March</SelectItem>
                                <SelectItem value="april">April</SelectItem>
                                <SelectItem value="may">May</SelectItem>
                                <SelectItem value="june">June</SelectItem>
                                <SelectItem value="july">July</SelectItem>
                                <SelectItem value="august">August</SelectItem>
                                <SelectItem value="september">September</SelectItem>
                                <SelectItem value="october">October</SelectItem>
                                <SelectItem value="november">November</SelectItem>
                                <SelectItem value="december">December</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="voucher-year">Voucher Year</Label>
                        <Select value={formData.voucherYear} onValueChange={(value) => handleInputChange("voucherYear", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="2020" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="2020">2020</SelectItem>
                                <SelectItem value="2021">2021</SelectItem>
                                <SelectItem value="2022">2022</SelectItem>
                                <SelectItem value="2023">2023</SelectItem>
                                <SelectItem value="2024">2024</SelectItem>
                                <SelectItem value="2025">2025</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="field">Field</Label>
                        <Input
                            id="field"
                            placeholder="Field"
                            value={formData.field}
                            onChange={(e) => handleInputChange("field", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="head1">Head1</Label>
                        <Input
                            id="head1"
                            placeholder="Head1"
                            value={formData.head1}
                            onChange={(e) => handleInputChange("head1", e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            placeholder="Amount"
                            value={formData.amount}
                            onChange={(e) => handleInputChange("amount", e.target.value)}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between pt-6">
                    <Button variant="outline" onClick={handleBackToList} className="px-8 bg-transparent">
                        Back to List
                    </Button>
                    <Button onClick={handleSave} className="bg-cyan-500 hover:bg-cyan-600 px-8">
                        Save
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
