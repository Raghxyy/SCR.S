import React, { useState, useEffect, useRef } from 'react';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from 'react-router-dom';
import {
    BookOpen,
    Calendar,
    ClipboardList,
    GraduationCap,
    HelpCircle,
    LogOut,
    Menu,
    Users,
    Bell,
    User,
    ShieldPlus,
    BarChart,
    Building
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"


import Sidebar from '../Sidebar';

const AdminLayout = ({ children }) => {
    const [activeUserProfile, setActiveUserProfile] = useState("https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=626&ext=jpg&ga=GA1.1.454232400.1727809163&semt=ais_hybrid");
    const sidebarItems = [
        {
            icon: BookOpen,
            label: "Courses",
            items: {
                // Manage and create new courses, edit handouts, and link to departments, specializations, prerequisites
                "Manage All Courses": "courses/manage",   // Admin: Manage all courses, regardless of creator
                "Add New Course": "courses/add",          // Admin: Create new courses
                "Course Categories & Prerequisites": "courses/categories" // Admin: Manage course categories & set prerequisites
            },
        },
        {
            icon: GraduationCap,
            label: "Academics",
            items: {
                // Manage departments, specializations, and batches
                "Manage Departments": "departments/manage",   // Admin: Create, edit departments
                "Manage Specializations": "specializations/manage", // Admin: Create, edit specializations
                "Manage Batches": "batches/manage",  // Admin: Create, edit batches for academic years (e.g., Y22, Y23, Y24)
            },
        },
        {
            icon: Calendar,
            label: "Scheduling",
            items: {
                // View and create schedules, manage clusters, and define section limits for students
                "View Schedules": "schedule/view",     // Admin: View all schedules
                "Create New Schedule": "schedule/create", // Admin: Create new schedules
                "Manage Time Slots": "schedule/time-slots", // Admin: Manage time slots
                "Create & Manage Clusters": "schedule/clusters" // Admin: Manage clusters and set section limits for students
            },
        },
        {
            icon: GraduationCap,
            label: "Students",
            items: {
                // Manage student accounts, registrations, and bulk upload
                "View All Students": "students/list",  // Admin: View list of all students
                "Add New Student": "students/add",     // Admin: Create new student accounts
                "Manage Student Registrations": "students/registrations", // Admin: Manage course registrations for students
                "Bulk Upload Students": "students/bulk-upload"  // Admin: Bulk upload student accounts via CSV
            },
        },
        {
            icon: Users,
            label: "Faculty",
            items: {
                // Manage faculty accounts and assign courses
                "View All Faculty": "faculty/list",    // Admin: View all faculty accounts
                "Add New Faculty": "faculty/add",      // Admin: Create new faculty accounts
                "Assign Courses to Faculty": "faculty/assign-courses" // Admin: Assign courses to faculty members
            },
        },
        {
            icon: ClipboardList,
            label: "Registration",
            items: {
                // Manage course registrations, registration periods, and waitlists
                "Initialize Course Registration": "registration/course", // Admin: Start course registration period
                "Manage Registration Periods": "registration/periods", // Admin: Manage registration periods
                "Waitlist & Conflict Management": "registration/waitlist", // Admin: Manage waitlists and resolve conflicts
                "Audit Logs": "registration/audit-logs" // Super Admin: View audit logs for tracking changes and updates
            },
        },
        {
            icon: Building,
            label: "Rooms",
            items: {
                // Manage room allocations and manually adjust assignments
                "View All Rooms": "rooms/list",  // Admin: View list of all rooms
                "Manage Room Allocations": "rooms/manage", // Admin: Allocate rooms to classes
                "Manual Adjustments": "rooms/manual-adjust" // Admin: Manually adjust room or faculty assignments in case of conflicts
            },
        },
    ];

    const initialItems = [
        // Notifications for admins regarding registration periods, missing data, or other important alerts
        { icon: Bell, label: "Notifications & Alerts", path: "notifs" },
        // Help and documentation for admins and super admins to resolve issues or get support
        { icon: HelpCircle, label: "Help & Support", path: "help" }
    ];

    const [singleItems, setSingleItems] = useState(initialItems);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [userRole, setUserRole] = useState("");

    const hasAddedAdmin = useRef(false); // Ref to track if "Create Admin" is added

    useEffect(() => {
        const role = sessionStorage.getItem("role");
        const userProfile = sessionStorage.getItem("dp");

        console.log("Current role from sessionStorage:", role);
        console.log("Current userProfile from sessionStorage:", userProfile);

        if (userProfile) {
            setActiveUserProfile(userProfile);
            console.log("Setting activeUserProfile to:", userProfile);
        }

        if (role) {
            if (role === "SUPER-ADMIN") {
                setUserRole("Owner");

                // Check if the "Create Admin" item has been added using the ref
                if (!hasAddedAdmin.current) {
                    console.log("Adding 'Create Admin' to singleItems");
                    setSingleItems(prevItems => [
                        ...prevItems,
                        { icon: ShieldPlus, label: "Create Admin", path: "create" }
                    ]);
                    hasAddedAdmin.current = true; // Mark it as added
                } else {
                    console.log("'Create Admin' already added, skipping.");
                }
            } else if (role === "ADMIN") {
                setUserRole("Admin");
                console.log("Setting userRole to Admin");
            }
        }
    }, []);// Empty dependency array to ensure this effect runs only once
    // Empty dependency array to run only once




    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar for larger screens */}
            <Sidebar className="hidden lg:block lg:w-64 w-[16rem]" sidebarItems={sidebarItems} singleItems={singleItems} />

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-4 border-b">
                    <h1 className="text-2xl font-bold">{userRole} Dashboard</h1>
                    <div className="self-end hidden lg:block">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer w-11 h-11">
                                    <AvatarImage src={activeUserProfile} alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Manage Profile</span>
                                </DropdownMenuItem>
                                <Link to="/logout">
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="lg:hidden">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64">
                            <Sidebar sidebarItems={sidebarItems} singleItems={singleItems} />
                        </SheetContent>
                    </Sheet>
                </header>
                <ScrollArea className="flex-1" >
                    {children}
                </ScrollArea>
            </div>
        </div>
    );
}

export default AdminLayout;