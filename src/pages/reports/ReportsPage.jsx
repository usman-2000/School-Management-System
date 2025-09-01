import { DynamicTable } from "@/components/shared/dynamic-table"


// Sample student data
const studentsData = [
    {
        id: "1",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
        name: "Leslie Alexander",
        studentId: "2016-01",
        class: "8",
        phoneNo: "(480) 555-0103",
        dob: "8/16/15",
        address: "2715 Ash Dr. San Jose...",
        gender: "Female",
        status: "Active",
    },
    {
        id: "2",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
        name: "Darrel Steward",
        studentId: "2016-01",
        class: "8",
        phoneNo: "(480) 555-0103",
        dob: "8/16/15",
        address: "2715 Ash Dr. San Jose...",
        gender: "Male",
        status: "Inactive",
    },
    {
        id: "3",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        name: "Albert Flores",
        studentId: "2016-01",
        class: "8",
        phoneNo: "(480) 555-0103",
        dob: "8/16/15",
        address: "2715 Ash Dr. San Jose...",
        gender: "Male",
        status: "Inactive",
    },
    {
        id: "4",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
        name: "Jane Cooper",
        studentId: "2016-01",
        class: "8",
        phoneNo: "(480) 555-0103",
        dob: "8/16/15",
        address: "2715 Ash Dr. San Jose...",
        gender: "Female",
        status: "Active",
    },
    {
        id: "5",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
        name: "Devon Lane",
        studentId: "2016-01",
        class: "8",
        phoneNo: "(480) 555-0103",
        dob: "8/16/15",
        address: "2715 Ash Dr. San Jose...",
        gender: "Male",
        status: "Inactive",
    },
    {
        id: "6",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face",
        name: "Courtney Henry",
        studentId: "2016-01",
        class: "8",
        phoneNo: "(480) 555-0103",
        dob: "8/16/15",
        address: "2715 Ash Dr. San Jose...",
        gender: "Female",
        status: "Active",
    },
    {
        id: "7",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face",
        name: "Jerome Bell",
        studentId: "2016-01",
        class: "8",
        phoneNo: "(480) 555-0103",
        dob: "8/16/15",
        address: "2715 Ash Dr. San Jose...",
        gender: "Male",
        status: "Active",
    },
    {
        id: "8",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face",
        name: "Floyd Miles",
        studentId: "2016-01",
        class: "8",
        phoneNo: "(480) 555-0103",
        dob: "8/16/15",
        address: "2715 Ash Dr. San Jose...",
        gender: "Female",
        status: "Inactive",
    },
    {
        id: "9",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
        name: "Kristin Watson",
        studentId: "2016-01",
        class: "8",
        phoneNo: "(480) 555-0103",
        dob: "8/16/15",
        address: "2715 Ash Dr. San Jose...",
        gender: "Male",
        status: "Inactive",
    },
    {
        id: "10",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
        name: "Dianne Russell",
        studentId: "2016-01",
        class: "8",
        phoneNo: "(480) 555-0103",
        dob: "8/16/15",
        address: "2715 Ash Dr. San Jose...",
        gender: "Female",
        status: "Active",
    },
    {
        id: "11",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        name: "Robert Fox",
        studentId: "2016-01",
        class: "8",
        phoneNo: "(480) 555-0103",
        dob: "8/16/15",
        address: "2715 Ash Dr. San Jose...",
        gender: "Male",
        status: "Active",
    },
    {
        id: "12",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
        name: "Annette Black",
        studentId: "2016-01",
        class: "4",
        phoneNo: "(480) 555-0103",
        dob: "8/16/15",
        address: "2715 Ash Dr. San Jose...",
        gender: "Male",
        status: "Active",
    },
]

const columns = [
    {
        key: "name",
        label: "Student Name",
        render: (value, row) => (
            <div className="flex items-center gap-3">
                <img src={row.avatar || "/placeholder.svg"} alt={value} className="w-8 h-8 rounded-full object-cover" />
                <span className="font-medium text-gray-900">{value}</span>
            </div>
        ),
    },
    { key: "studentId", label: "Student ID" },
    { key: "class", label: "Class" },
    { key: "phoneNo", label: "Phone No" },
    { key: "dob", label: "DOB" },
    { key: "address", label: "Address" },
    { key: "gender", label: "Gender" },
    { key: "status", label: "Status" },
]

const filters = [
    {
        key: "gender",
        label: "Gender",
        options: [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
        ],
    },
    {
        key: "status",
        label: "Status",
        options: [
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
        ],
    },
]
export default function ReportsPage() {
    const handleEdit = (student) => {
        console.log("Edit student:", student)
    }

    const handleView = (student) => {
        console.log("View student:", student)
    }

    const handleDelete = (student) => {
        console.log("Delete student:", student)
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <main className="flex-1 overflow-auto px-3 py-0">
                <DynamicTable
                    title="Report"
                    data={studentsData}
                    columns={columns}
                    filters={filters}
                    searchPlaceholder="Search by Name or ID"
                    // addButtonText="Add Student"
                    // addButtonUrl="/students/addnewstudent"
                    itemsPerPage={12}
                    onEdit={handleEdit}
                    onView={handleView}
                    onDelete={handleDelete}
                />
            </main>
        </div>
    )
}
