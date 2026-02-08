import AdminLayout from "@/components/layout/AdminLayout";
import StatCard from "@/components/dashboard/StatCard";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  Bus,
  Calendar,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const weeklyData = [
  { day: "Mon", registrations: 320, trips: 12, occupancy: 82 },
  { day: "Tue", registrations: 345, trips: 12, occupancy: 86 },
  { day: "Wed", registrations: 298, trips: 10, occupancy: 78 },
  { day: "Thu", registrations: 367, trips: 14, occupancy: 89 },
  { day: "Fri", registrations: 142, trips: 6, occupancy: 72 },
  { day: "Sat", registrations: 342, trips: 12, occupancy: 84 },
  { day: "Sun", registrations: 310, trips: 12, occupancy: 80 },
];

const attendanceSummary = [
  { label: "Present", value: 1124, percentage: 90, color: "bg-success" },
  { label: "Absent", value: 87, percentage: 7, color: "bg-destructive" },
  { label: "Cancelled", value: 36, percentage: 3, color: "bg-muted-foreground" },
];

const AdminReports = () => {
  const maxReg = Math.max(...weeklyData.map((d) => d.registrations));

  return (
    <AdminLayout title="Reports" subtitle="Analytics and attendance reports">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Weekly Registrations"
          value="2,124"
          change="+8% vs last week"
          changeType="positive"
          icon={<Calendar className="h-5 w-5" />}
        />
        <StatCard
          title="Avg. Occupancy"
          value="84%"
          change="+3% improvement"
          changeType="positive"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <StatCard
          title="Active Drivers"
          value="6"
          change="1 on leave"
          changeType="neutral"
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          title="Total Trips (Week)"
          value="78"
          change="All on schedule"
          changeType="positive"
          icon={<Bus className="h-5 w-5" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Weekly Registration Chart */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 glass-card-solid p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-foreground">Weekly Registrations</h3>
              <p className="text-xs text-muted-foreground">Daily registration count this week</p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-3.5 w-3.5" />
              Export
            </Button>
          </div>

          {/* Simple bar chart */}
          <div className="flex items-end gap-3 h-48">
            {weeklyData.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[11px] font-semibold text-foreground">{data.registrations}</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.registrations / maxReg) * 100}%` }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                  className="w-full rounded-t-md bg-gradient-to-t from-primary to-primary/60 min-h-[8px]"
                />
                <span className="text-[11px] text-muted-foreground">{data.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Attendance Summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card-solid p-6"
        >
          <div className="mb-6">
            <h3 className="text-sm font-bold text-foreground">Attendance Overview</h3>
            <p className="text-xs text-muted-foreground">Today's attendance breakdown</p>
          </div>

          {/* Donut-like visual */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative h-32 w-32">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                {attendanceSummary.map((item, i) => {
                  const offset = attendanceSummary.slice(0, i).reduce((sum, s) => sum + s.percentage, 0);
                  const colors = ["hsl(158, 35%, 42%)", "hsl(10, 70%, 50%)", "hsl(220, 10%, 50%)"];
                  return (
                    <circle
                      key={i}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={colors[i]}
                      strokeWidth="8"
                      strokeDasharray={`${item.percentage * 2.51} ${251 - item.percentage * 2.51}`}
                      strokeDashoffset={`${-offset * 2.51}`}
                      className="transition-all duration-700"
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground">90%</span>
                <span className="text-[10px] text-muted-foreground">Present</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {attendanceSummary.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                  <span className="text-sm text-secondary-foreground">{item.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-foreground">{item.value}</span>
                  <span className="ml-1 text-xs text-muted-foreground">({item.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Occupancy Trend */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 glass-card-solid p-6"
      >
        <h3 className="text-sm font-bold text-foreground mb-4">Daily Occupancy Rate (%)</h3>
        <div className="flex items-end gap-4 h-24">
          {weeklyData.map((data, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[11px] font-semibold text-accent">{data.occupancy}%</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${data.occupancy}%` }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.5, ease: "easeOut" }}
                className="w-full rounded-t-md bg-gradient-to-t from-accent to-accent/40 min-h-[4px]"
              />
              <span className="text-[10px] text-muted-foreground">{data.day}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminReports;
