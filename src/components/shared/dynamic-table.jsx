
import { useState } from "react"
// import Link from "next/link"
import { Search, Edit, Eye, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"


export function DynamicTable({
    title,
    data,
    columns,
    filters = [],
    searchPlaceholder = "Search...",
    addButtonText,
    addButtonUrl,
    itemsPerPage = 10,
    onEdit,
    onView,
    onDelete,
}) {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterValues, setFilterValues] = useState({})
    const [selectedItems, setSelectedItems] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    // Filter and search data
    const filteredData = data.filter((item) => {
        // Search filter
        const matchesSearch =
            searchTerm === "" ||
            Object.values(item).some((value) => String(value).toLowerCase().includes(searchTerm.toLowerCase()))

        // Apply filters
        const matchesFilters = Object.entries(filterValues).every(([key, value]) => {
            if (!value || value === "all") return true
            return String(item[key]).toLowerCase() === value.toLowerCase()
        })

        return matchesSearch && matchesFilters
    })

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedItems(paginatedData.map((item) => item.id))
        } else {
            setSelectedItems([])
        }
    }

    const handleSelectItem = (itemId, checked) => {
        if (checked) {
            setSelectedItems([...selectedItems, itemId])
        } else {
            setSelectedItems(selectedItems.filter((id) => id !== itemId))
        }
    }

    const renderCell = (column, item) => {
        const value = item[column.key]

        if (column.render) {
            return column.render(value, item)
        }

        // Default rendering based on column key
        switch (column.key) {
            case "status":
                return (
                    <Badge variant={value === "Active" ? "default" : "destructive"} className="text-xs">
                        <div className={`w-2 h-2 rounded-full mr-1 ${value === "Active" ? "bg-green-500" : "bg-red-500"}`} />
                        {value}
                    </Badge>
                )
            case "avatar":
                return (
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={value || "/placeholder.svg"} />
                        <AvatarFallback>{item.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                )
            default:
                return <span className="text-sm">{value}</span>
        }
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder={searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-64"
                        />
                    </div>

                    {/* Filters */}
                    {filters.map((filter) => (
                        <Select
                            key={filter.key}
                            value={filterValues[filter.key] || "all"}
                            onValueChange={(value) => setFilterValues((prev) => ({ ...prev, [filter.key]: value }))}
                        >
                            <SelectTrigger className="w-32">
                                <SelectValue placeholder={filter.label} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All {filter.label}</SelectItem>
                                {filter.options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    ))}

                    {/* Add Button */}
                    {addButtonText && addButtonUrl && (
                        <Link to={addButtonUrl}>
                            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">{addButtonText}</Button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="border rounded-lg bg-white">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={selectedItems.length === paginatedData.length && paginatedData.length > 0}
                                    onCheckedChange={handleSelectAll}
                                />
                            </TableHead>
                            {columns.map((column) => (
                                <TableHead key={column.key} className="text-gray-600 font-medium">
                                    {column.label}
                                </TableHead>
                            ))}
                            <TableHead className="text-gray-600 font-medium">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.map((item) => (
                            <TableRow key={item.id} className="hover:bg-gray-50">
                                <TableCell>
                                    <Checkbox
                                        checked={selectedItems.includes(item.id)}
                                        onCheckedChange={(checked) => handleSelectItem(item.id, checked)}
                                    />
                                </TableCell>
                                {columns.map((column) => (
                                    <TableCell key={column.key}>{renderCell(column, item)}</TableCell>
                                ))}
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {onEdit && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onEdit(item)}
                                                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        )}
                                        {onView && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onView(item)}
                                                className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        )}
                                        {onDelete && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onDelete(item)}
                                                className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
                        {filteredData.length} entries
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Previous
                        </Button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setCurrentPage(page)}
                                    className="w-8 h-8 p-0"
                                >
                                    {page}
                                </Button>
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
