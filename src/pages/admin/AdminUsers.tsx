import AdminLayout from "@/components/layout/AdminLayout";
import TripStatusBadge from "@/components/dashboard/TripStatusBadge";
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  MoreHorizontal,
  Mail,
  Phone,
  Filter,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type UserRole = "student" | "driver";

interface MockUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: "active" | "inactive";
  joinDate: string;
  avatar: string;
}

const mockUsers: MockUser[] = [
  { id: "U-001", name: "Sara Ahmed", email: "sara@uni.edu", phone: "+962 79 123 4567", role: "student", status: "active", joinDate: "Jan 15, 2026", avatar: "S" },
  { id: "U-002", name: "Ahmad Hassan", email: "ahmad.h@smartbus.com", phone: "+962 79 234 5678", role: "driver", status: "active", joinDate: "Dec 3, 2025", avatar: "A" },
  { id: "U-003", name: "Lina Khalil", email: "lina.k@uni.edu", phone: "+962 79 345 6789", role: "student", status: "active", joinDate: "Jan 20, 2026", avatar: "L" },
  { id: "U-004", name: "Omar Khalil", email: "omar.k@smartbus.com", phone: "+962 79 456 7890", role: "driver", status: "active", joinDate: "Nov 12, 2025", avatar: "O" },
  { id: "U-005", name: "Noor Mansour", email: "noor.m@uni.edu", phone: "+962 79 567 8901", role: "student", status: "inactive", joinDate: "Feb 1, 2026", avatar: "N" },
  { id: "U-006", name: "Yusuf Nasser", email: "yusuf.n@smartbus.com", phone: "+962 79 678 9012", role: "driver", status: "active", joinDate: "Oct 8, 2025", avatar: "Y" },
  { id: "U-007", name: "Hana Tariq", email: "hana.t@uni.edu", phone: "+962 79 789 0123", role: "student", status: "active", joinDate: "Jan 28, 2026", avatar: "H" },
  { id: "U-008", name: "Ali Mahmoud", email: "ali.m@smartbus.com", phone: "+962 79 890 1234", role: "driver", status: "inactive", joinDate: "Sep 15, 2025", avatar: "M" },
];

const AdminUsers = () => {
  const [activeTab, setActiveTab] = useState<"all" | UserRole>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesTab = activeTab === "all" || user.role === activeTab;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const tabs: { key: "all" | UserRole; label: string; count: number }[] = [
    { key: "all", label: "All Users", count: mockUsers.length },
    { key: "student", label: "Students", count: mockUsers.filter((u) => u.role === "student").length },
    { key: "driver", label: "Drivers", count: mockUsers.filter((u) => u.role === "driver").length },
  ];

  return (
    <AdminLayout title="Users" subtitle="Manage students and drivers">
      {/* Tabs & Actions */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-lg bg-secondary p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs text-muted-foreground">({tab.count})</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="glow" size="sm">
            <Plus className="h-4 w-4" />
            Add User
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors"
          />
        </div>
        <Button variant="outline" size="default">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass-card-solid overflow-hidden"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">User</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Contact</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Role</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Joined</th>
              <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, i) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="data-table-row group"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full font-bold text-sm ${
                      user.role === "driver" ? "bg-primary/15 text-primary" : "bg-accent/15 text-accent"
                    }`}>
                      {user.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-sm text-secondary-foreground">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      {user.email}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {user.phone}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                    user.role === "driver"
                      ? "bg-primary/10 text-primary"
                      : "bg-accent/10 text-accent"
                  }`}>
                    {user.role === "driver" ? "Driver" : "Student"}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${user.status === "active" ? "bg-success" : "bg-muted-foreground"}`} />
                    <span className="text-sm text-secondary-foreground capitalize">{user.status}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground">{user.joinDate}</td>
                <td className="px-5 py-4 text-right">
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border/50 px-5 py-3">
          <p className="text-xs text-muted-foreground">
            Showing {filteredUsers.length} of {mockUsers.length} users
          </p>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="text-xs">Previous</Button>
            <Button variant="ghost" size="sm" className="text-xs bg-secondary">1</Button>
            <Button variant="ghost" size="sm" className="text-xs">2</Button>
            <Button variant="ghost" size="sm" className="text-xs">Next</Button>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminUsers;
