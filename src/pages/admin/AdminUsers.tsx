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
  Pencil,
  Trash2,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

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

const initialUsers: MockUser[] = [
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
  const [users, setUsers] = useState<MockUser[]>(initialUsers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<{ name: string; email: string; phone: string; role: UserRole; status: "active" | "inactive" }>({
    name: "",
    email: "",
    phone: "",
    role: "student",
    status: "active",
  });

  const filteredUsers = users.filter((user) => {
    const matchesTab = activeTab === "all" || user.role === activeTab;
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const tabs: { key: "all" | UserRole; label: string; count: number }[] = [
    { key: "all", label: "All Users", count: users.length },
    { key: "student", label: "Students", count: users.filter((u) => u.role === "student").length },
    { key: "driver", label: "Drivers", count: users.filter((u) => u.role === "driver").length },
  ];

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: "", email: "", phone: "", role: "student", status: "active" });
  };

  const handleDialogOpenChange = (next: boolean) => {
    setDialogOpen(next);
    if (!next) resetForm();
  };

  const handleEdit = (user: MockUser) => {
    setEditingId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
    });
    setDialogOpen(true);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setUsers((prev) => prev.filter((u) => u.id !== deleteId));
    toast({ title: "User removed", description: `${deleteId} has been deleted.` });
    setDeleteId(null);
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast({
        title: "Missing information",
        description: "Name and email are required.",
        variant: "destructive",
      });
      return;
    }

    if (editingId) {
      setUsers((prev) => prev.map((u) => (u.id === editingId ? { ...u, ...form } : u)));
      toast({ title: "User updated", description: `${form.name} has been saved.` });
    } else {
      const nextId = `U-${String(users.length + 1).padStart(3, "0")}`;
      const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      setUsers((prev) => [
        ...prev,
        {
          id: nextId,
          ...form,
          joinDate: today,
          avatar: form.name.trim().charAt(0).toUpperCase() || "U",
        },
      ]);
      toast({ title: "User added", description: `${form.name} has joined SmartBus.` });
    }

    setDialogOpen(false);
    resetForm();
  };

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
          <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
              <Button variant="glow" size="sm">
                <Plus className="h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card-solid border-border sm:max-w-[480px] p-0 overflow-hidden">
              <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50">
                <DialogTitle className="flex items-center gap-2 text-foreground">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <UserPlus className="h-4 w-4 text-primary" />
                  </div>
                  {editingId ? "Edit User" : "Add New User"}
                </DialogTitle>
              </DialogHeader>

              <div className="px-6 py-5 space-y-5 max-h-[60vh] overflow-y-auto">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Name</Label>
                  <Input
                    placeholder="e.g. Sara Ahmed"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-secondary/50 border-border/50 focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</Label>
                    <Input
                      type="email"
                      placeholder="user@uni.edu"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="bg-secondary/50 border-border/50 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</Label>
                    <Input
                      placeholder="+962 79 000 0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="bg-secondary/50 border-border/50 focus:border-primary"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role</Label>
                    <select
                      value={form.role}
                      onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
                      className="h-10 w-full rounded-md border border-border/50 bg-secondary/50 px-3 text-sm text-foreground focus:border-primary focus:outline-none"
                    >
                      <option value="student">Student</option>
                      <option value="driver">Driver</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</Label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value as "active" | "inactive" })}
                      className="h-10 w-full rounded-md border border-border/50 bg-secondary/50 px-3 text-sm text-foreground focus:border-primary focus:outline-none"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-border/50 flex items-center justify-end gap-3">
                <Button variant="ghost" size="sm" onClick={() => handleDialogOpenChange(false)}>
                  Cancel
                </Button>
                <Button variant="glow" size="sm" onClick={handleSubmit}>
                  <Plus className="h-4 w-4" />
                  {editingId ? "Save Changes" : "Create User"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              toast({ title: "Export started", description: `${filteredUsers.length} users will be exported as CSV.` })
            }
          >
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="glass-card-solid border-border">
                      <DropdownMenuItem onClick={() => handleEdit(user)} className="cursor-pointer">
                        <Pencil className="h-3.5 w-3.5 mr-2" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setDeleteId(user.id)}
                        className="cursor-pointer text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5 mr-2" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border/50 px-5 py-3">
          <p className="text-xs text-muted-foreground">
            Showing {filteredUsers.length} of {users.length} users
          </p>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" className="text-xs">Previous</Button>
            <Button variant="ghost" size="sm" className="text-xs bg-secondary">1</Button>
            <Button variant="ghost" size="sm" className="text-xs">2</Button>
            <Button variant="ghost" size="sm" className="text-xs">Next</Button>
          </div>
        </div>
      </motion.div>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="glass-card-solid border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove this user?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the account from SmartBus. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminUsers;
