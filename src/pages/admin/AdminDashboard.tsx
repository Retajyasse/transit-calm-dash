import AdminLayout from "@/components/layout/AdminLayout";
import StatCard from "@/components/dashboard/StatCard";
import TripStatusBadge from "@/components/dashboard/TripStatusBadge";
import LiveMap from "@/components/dashboard/LiveMap";
import { motion } from "framer-motion";
import {
  Users,
  Bus,
  TrendingUp,
  CalendarCheck,
  ArrowUpRight,
  Clock,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const recentTrips = [
  { id: "T-001", route: "Aqaleem → Stadium", driver: "Ahmad Hassan", time: "7:30 AM", seats: "32/40", status: "active" as const },
  { id: "T-002", route: "Seil → Stadium", driver: "Omar Khalil", time: "7:45 AM", seats: "28/40", status: "active" as const },
  { id: "T-003", route: "Stadium → Aqaleem", driver: "Ali Mahmoud", time: "3:30 PM", seats: "35/40", status: "not_started" as const },
  { id: "T-004", route: "Stadium → Seil", driver: "Yusuf Nasser", time: "3:30 PM", seats: "22/40", status: "completed" as const },
  { id: "T-005", route: "Aqaleem → Stadium", driver: "Khaled Saeed", time: "7:00 PM", seats: "18/40", status: "completed" as const },
];

const notifications = [
  { message: "Registration window closes in 2 hours", time: "10 min ago", type: "warning" },
  { message: "Bus #3 arrived at Stadium", time: "25 min ago", type: "info" },
  { message: "New driver registration: Omar K.", time: "1 hour ago", type: "success" },
];

const AdminDashboard = () => {
  return (
    <AdminLayout title="Dashboard" subtitle="Overview of today's operations">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Students"
          value="1,247"
          change="+12% from last week"
          changeType="positive"
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          title="Active Trips"
          value="8"
          change="2 buses en route"
          changeType="neutral"
          icon={<Bus className="h-5 w-5" />}
        />
        <StatCard
          title="Occupancy Rate"
          value="84%"
          change="+5% from yesterday"
          changeType="positive"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <StatCard
          title="Today's Registrations"
          value="342"
          change="Window closes at 2:00 PM"
          changeType="neutral"
          icon={<CalendarCheck className="h-5 w-5" />}
        />
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Live Map - spans 2 columns */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">Live Tracking</h2>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              View Full Map <ArrowUpRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
          <LiveMap className="h-[340px]" />
        </motion.div>

        {/* Recent Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">Alerts</h2>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {notifications.map((notif, i) => (
              <div
                key={i}
                className="glass-card-solid p-4 transition-all duration-200 hover:border-primary/20"
              >
                <p className="text-sm font-medium text-foreground">{notif.message}</p>
                <p className="mt-1 text-xs text-muted-foreground">{notif.time}</p>
              </div>
            ))}
            
            {/* Quick Stats */}
            <div className="glass-card-solid p-4 mt-4">
              <h3 className="text-sm font-bold text-foreground mb-3">Registration Window</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">12:00 AM → 2:00 PM</span>
                <span className="text-xs font-semibold text-success">Open</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all" />
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">342 of ~520 expected registrations</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trips Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">Today's Trips</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              Filter
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Export
            </Button>
          </div>
        </div>
        <div className="glass-card-solid overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trip ID</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Route</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Driver</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Time</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Seats</th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTrips.map((trip) => (
                <tr key={trip.id} className="data-table-row">
                  <td className="px-5 py-4 text-sm font-semibold text-foreground">{trip.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      <span className="text-sm text-foreground">{trip.route}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-secondary-foreground">{trip.driver}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm text-secondary-foreground">{trip.time}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-foreground">{trip.seats}</td>
                  <td className="px-5 py-4">
                    <TripStatusBadge status={trip.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminDashboard;
