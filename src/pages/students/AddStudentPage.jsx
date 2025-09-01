"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function AddStudentForm() {
    const router = useNavigate()
    const [monthlyFees, setMonthlyFees] = useState([{ id: "1", feeType: "", amount: "" }])
    const [installments, setInstallments] = useState([
        { id: "1", installmentNumber: "", feeType: "", amount: "", installmentMonths: "" },
    ])
    const [oneTimeCharges, setOneTimeCharges] = useState([{ id: "1", feeType: "", amount: "" }])

    const addMonthlyFee = () => {
        const newId = Date.now().toString()
        setMonthlyFees([...monthlyFees, { id: newId, feeType: "", amount: "" }])
    }

    const removeMonthlyFee = (id) => {
        if (monthlyFees.length > 1) {
            setMonthlyFees(monthlyFees.filter((fee) => fee.id !== id))
        }
    }

    const addInstallment = () => {
        const newId = Date.now().toString()
        setInstallments([
            ...installments,
            { id: newId, installmentNumber: "", feeType: "", amount: "", installmentMonths: "" },
        ])
    }

    const removeInstallment = (id) => {
        if (installments.length > 1) {
            setInstallments(installments.filter((inst) => inst.id !== id))
        }
    }

    const addOneTimeCharge = () => {
        const newId = Date.now().toString()
        setOneTimeCharges([...oneTimeCharges, { id: newId, feeType: "", amount: "" }])
    }

    const removeOneTimeCharge = (id) => {
        if (oneTimeCharges.length > 1) {
            setOneTimeCharges(oneTimeCharges.filter((charge) => charge.id !== id))
        }
    }

    const handleSave = () => {
        // Handle form submission logic here
        console.log("Form saved")
    }

    const handleBackToList = () => {
        router("/students")
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">

            <Accordion
                type="multiple"
                defaultValue={["basic-info", "monthly-fee", "installments", "one-time"]}
                className="space-y-4"
            >
                {/* Basic Information */}
                <AccordionItem value="basic-info">
                    <AccordionTrigger className="text-lg font-semibold">Basic Information</AccordionTrigger>
                    <AccordionContent>
                        <Card className="bg-white shadow-sm">
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" placeholder="Enter Name" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="father-guardian">Father/Guardian Name</Label>
                                        <Input id="father-guardian" placeholder="Enter Father/Guardian Name" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="parent-guardian">Parent/Guardian</Label>
                                        <Input id="parent-guardian" placeholder="Enter Parent/Guardian" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="mobile">Mobile Number</Label>
                                        <Input id="mobile" placeholder="+XXX-XXXXXXX" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="parent-cell">Parent Cell</Label>
                                        <Input id="parent-cell" placeholder="XXXX-XXXXXXX-X" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="class">Class</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Class" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">Class 1</SelectItem>
                                                <SelectItem value="2">Class 2</SelectItem>
                                                <SelectItem value="3">Class 3</SelectItem>
                                                <SelectItem value="4">Class 4</SelectItem>
                                                <SelectItem value="5">Class 5</SelectItem>
                                                <SelectItem value="6">Class 6</SelectItem>
                                                <SelectItem value="7">Class 7</SelectItem>
                                                <SelectItem value="8">Class 8</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="father-percentage">Father/Percentage</Label>
                                        <Input id="father-percentage" placeholder="Enter Percentage" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="date-month">Date/Month</Label>
                                        <Input id="date-month" placeholder="Select Date" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input id="address" placeholder="Enter Address" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select City" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="karachi">Karachi</SelectItem>
                                                <SelectItem value="lahore">Lahore</SelectItem>
                                                <SelectItem value="islamabad">Islamabad</SelectItem>
                                                <SelectItem value="rawalpindi">Rawalpindi</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="district">District</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select District" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="central">Central</SelectItem>
                                                <SelectItem value="east">East</SelectItem>
                                                <SelectItem value="west">West</SelectItem>
                                                <SelectItem value="south">South</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Gender</Label>
                                        <div className="flex gap-4">
                                            <label className="flex items-center space-x-2">
                                                <input type="radio" name="gender" value="male" className="text-cyan-500" />
                                                <span>Male</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="radio" name="gender" value="female" className="text-cyan-500" />
                                                <span>Female</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </AccordionContent>
                </AccordionItem>

                {/* Monthly Fee */}
                <AccordionItem value="monthly-fee">
                    <AccordionTrigger className="text-lg font-semibold">Monthly Fee</AccordionTrigger>
                    <AccordionContent>
                        <Card className="bg-white shadow-sm">
                            <CardContent className="p-6 space-y-4">
                                {monthlyFees.map((fee, index) => (
                                    <div key={fee.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                        <div className="space-y-2">
                                            <Label>Fee Type</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Fee Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="tuition">Tuition Fee</SelectItem>
                                                    <SelectItem value="transport">Transport Fee</SelectItem>
                                                    <SelectItem value="library">Library Fee</SelectItem>
                                                    <SelectItem value="lab">Lab Fee</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Amount</Label>
                                            <Input placeholder="5,000.00" />
                                        </div>
                                        <div className="flex gap-2">
                                            {index === monthlyFees.length - 1 && (
                                                <Button onClick={addMonthlyFee} className="bg-cyan-500 hover:bg-cyan-600">
                                                    <Plus className="h-4 w-4 mr-1" />
                                                    Add more
                                                </Button>
                                            )}
                                            {monthlyFees.length > 1 && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => removeMonthlyFee(fee.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </AccordionContent>
                </AccordionItem>

                {/* Installments */}
                <AccordionItem value="installments">
                    <AccordionTrigger className="text-lg font-semibold">Installments</AccordionTrigger>
                    <AccordionContent>
                        <Card className="bg-white shadow-sm">
                            <CardContent className="p-6 space-y-4">
                                {installments.map((installment, index) => (
                                    <div key={installment.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                                        <div className="space-y-2">
                                            <Label>Installment</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Installment no." />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">1st Installment</SelectItem>
                                                    <SelectItem value="2">2nd Installment</SelectItem>
                                                    <SelectItem value="3">3rd Installment</SelectItem>
                                                    <SelectItem value="4">4th Installment</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Fee Type</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Fee Type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="tuition">Tuition Fee</SelectItem>
                                                    <SelectItem value="admission">Admission Fee</SelectItem>
                                                    <SelectItem value="annual">Annual Fee</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Amount</Label>
                                            <Input placeholder="5,000.00" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Installment Months</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="2 Months" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">1 Month</SelectItem>
                                                    <SelectItem value="2">2 Months</SelectItem>
                                                    <SelectItem value="3">3 Months</SelectItem>
                                                    <SelectItem value="6">6 Months</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="flex gap-2">
                                            {index === installments.length - 1 && (
                                                <Button onClick={addInstallment} className="bg-cyan-500 hover:bg-cyan-600">
                                                    <Plus className="h-4 w-4 mr-1" />
                                                    Add more
                                                </Button>
                                            )}
                                            {installments.length > 1 && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => removeInstallment(installment.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </AccordionContent>
                </AccordionItem>

                {/* One Time Charges */}
                <AccordionItem value="one-time">
                    <AccordionTrigger className="text-lg font-semibold">One Time Charges</AccordionTrigger>
                    <AccordionContent>
                        <Card className="bg-white shadow-sm">
                            <CardContent className="p-6 space-y-4">
                                {oneTimeCharges.map((charge, index) => (
                                    <div key={charge.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                                        <div className="space-y-2">
                                            <Label>Fee Type</Label>
                                            <Select>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Registration Fee" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="registration">Registration Fee</SelectItem>
                                                    <SelectItem value="admission">Admission Fee</SelectItem>
                                                    <SelectItem value="security">Security Deposit</SelectItem>
                                                    <SelectItem value="uniform">Uniform Fee</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Amount</Label>
                                            <Input placeholder="5,000.00" />
                                        </div>
                                        <div className="flex gap-2">
                                            {index === oneTimeCharges.length - 1 && (
                                                <Button onClick={addOneTimeCharge} className="bg-cyan-500 hover:bg-cyan-600">
                                                    <Plus className="h-4 w-4 mr-1" />
                                                    Add more
                                                </Button>
                                            )}
                                            {oneTimeCharges.length > 1 && (
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => removeOneTimeCharge(charge.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={handleBackToList} className="px-8 bg-transparent">
                    Back to List
                </Button>
                <Button onClick={handleSave} className="bg-cyan-500 hover:bg-cyan-600 px-8">
                    Save
                </Button>
            </div>
        </div>
    )
}
