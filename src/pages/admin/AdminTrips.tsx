import AdminLayout from "@/components/layout/AdminLayout";
import TripStatusBadge from "@/components/dashboard/TripStatusBadge";
import { motion } from "framer-motion";
import {
  Clock,
  MapPin,
  Users,
  Calendar,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const trips = [
  { id: "T-001", route: "Aqaleem → Stadium", driver: "Ahmad Hassan", departure: "7:30 AM", arrival: "7:55 AM", seats: "32/40", status: "completed" as const, date: "Feb 8, 2026" },
  { id: "T-002", route: "Seil → Stadium", driver: "Omar Khalil", departure: "7:45 AM", arrival: "8:03 AM", seats: "28/40", status: "active" as const, date: "Feb 8, 2026" },
  { id: "T-003", route: "Aqaleem → Stadium", driver: "Yusuf Nasser", departure: "8:00 AM", arrival: "—", seats: "35/40", status: "active" as const, date: "Feb 8, 2026" },
  { id: "T-004", route: "Stadium → Aqaleem", driver: "Ali Mahmoud", departure: "3:30 PM", arrival: "—", seats: "0/40", status: "not_started" as const, date: "Feb 8, 2026" },
  { id: "T-005", route: "Stadium → Seil", driver: "Khaled Saeed", departure: "3:30 PM", arrival: "—", seats: "22/40", status: "not_started" as const, date: "Feb 8, 2026" },
  { id: "T-006", route: "Stadium → Aqaleem", driver: "Ahmad Hassan", departure: "7:00 PM", arrival: "—", seats: "18/40", status: "not_started" as const, date: "Feb 8, 2026" },
  { id: "T-007", route: "Stadium → Seil", driver: "Omar Khalil", departure: "7:00 PM", arrival: "—", seats: "12/40", status: "not_started" as const, date: "Feb 8, 2026" },
];

const returnTimes = [
  { time: "3:30 PM", label: "Afternoon Return", registered: 57, capacity: 80 },
  { time: "7:00 PM", label: "Evening Return", registered: 30, capacity: 80 },
];

const AdminTrips = () => {
  return (
    <AdminLayout title="Trips" subtitle="Manage daily schedules and return times">
      {/* Return Time Cards */}
      <div className="mb-8">
        <h2 className="text-sm font-bold text-foreground mb-4">Return Trip Windows</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {returnTimes.map((rt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-solid p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm font-bold text-foreground">{rt.time}</span>
                </div>
                <span className="text-xs text-muted-foreground">{rt.label}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">
                  <span className="text-foreground font-semibold">{rt.registered}</span> / {rt.capacity} seats
                </span>
                <span className="text-xs font-semibold text-primary">
                  {Math.round((rt.registered / rt.capacity) * 100)}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
                  style={{ width: `${(rt.registered / rt.capacity) * 100}%` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Feb 8, 2026</span>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" size="sm">
          <ArrowUpDown className="h-4 w-4" />
          Sort
        </Button>
      </div>

      {/* Trips Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card-solid overflow-hidden"
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trip</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Route</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Driver</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Schedule</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Seats</th>
              <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip, i) => (
              <motion.tr
                key={trip.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.03 }}
                className="data-table-row"
              >
                <td className="px-5 py-4 text-sm font-semibold text-foreground">{trip.id}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span className="text-sm text-foreground">{trip.route}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-secondary-foreground">{trip.driver}</td>
                <td className="px-5 py-4">
                  <div className="text-sm">
                    <span className="text-foreground">{trip.departure}</span>
                    {trip.arrival !== "—" && (
                      <span className="text-muted-foreground"> → {trip.arrival}</span>
                    )}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{trip.seats}</span>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <TripStatusBadge status={trip.status} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminTrips;
