import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, XCircle, Calendar } from "lucide-react";
import UserLayout from "@/components/layout/UserLayout";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

const attendanceRate = 82;
const threshold = 75;

const donutData = [
  { name: "Attended", value: attendanceRate },
  { name: "Missed", value: 100 - attendanceRate },
];

const monthlyData = [
  { month: "Sep", rate: 90 },
  { month: "Oct", rate: 85 },
  { month: "Nov", rate: 78 },
  { month: "Dec", rate: 88 },
  { month: "Jan", rate: 75 },
  { month: "Feb", rate: 82 },
];

const recentTrips = [
  { date: "Sun, Feb 23", route: "Aqaleem → Stadium", attended: true },
  { date: "Sat, Feb 22", route: "Aqaleem → Stadium", attended: true },
  { date: "Thu, Feb 20", route: "Aqaleem → Stadium", attended: true },
  { date: "Wed, Feb 19", route: "Aqaleem → Stadium", attended: false },
  { date: "Tue, Feb 18", route: "Aqaleem → Stadium", attended: true },
  { date: "Mon, Feb 17", route: "Aqaleem → Stadium", attended: true },
  { date: "Sun, Feb 16", route: "Aqaleem → Stadium", attended: false },
  { date: "Sat, Feb 15", route: "Aqaleem → Stadium", attended: true },
];

const attended = recentTrips.filter(t => t.attended).length;
const missed = recentTrips.filter(t => !t.attended).length;

const UserAttendance = () => {
  return (
    <UserLayout title="Attendance" subtitle="Your trip attendance history">
      <div className="space-y-6 max-w-4xl">
        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="stat-card text-center relative overflow-hidden">
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/8 blur-[40px]" />
            {/* Donut chart */}
            <div className="mx-auto h-32 w-32 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={donutData} cx="50%" cy="50%" innerRadius={40} outerRadius={55} startAngle={90} endAngle={-270} dataKey="value" stroke="none">
                    <Cell fill="hsl(38, 92%, 50%)" />
                    <Cell fill="hsl(228, 12%, 17%)" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground">{attendanceRate}%</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Overall Attendance</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10">
                <CheckCircle2 className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{attended}</p>
                <p className="text-xs text-muted-foreground">Trips Attended</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-success">
              <TrendingUp className="h-3 w-3" /> On track
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="stat-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10">
                <XCircle className="h-4 w-4 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{missed}</p>
                <p className="text-xs text-muted-foreground">Trips Missed</p>
              </div>
            </div>
            {attendanceRate < threshold && (
              <div className="flex items-center gap-1 text-xs text-destructive">
                <AlertTriangle className="h-3 w-3" /> Below {threshold}% threshold
              </div>
            )}
          </motion.div>
        </div>

        {/* Low attendance warning */}
        {attendanceRate < threshold && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground">Low Attendance Warning</p>
              <p className="text-xs text-muted-foreground">Your attendance is below the {threshold}% minimum threshold. Please maintain regular attendance to keep your booking privileges.</p>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trend Chart */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card-solid p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">Monthly Trend</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="attendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(220, 10%, 50%)" }} />
                  <YAxis domain={[50, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "hsl(220, 10%, 50%)" }} />
                  <Tooltip contentStyle={{ background: "hsl(228, 14%, 10%)", border: "1px solid hsl(228, 12%, 17%)", borderRadius: "8px", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="rate" stroke="hsl(38, 92%, 50%)" strokeWidth={2} fill="url(#attendGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Trip history list */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card-solid p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">Recent Trips</h3>
            {recentTrips.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="h-10 w-10 text-muted-foreground/30 mb-3" />
                <p className="text-sm font-semibold text-foreground">No attendance records</p>
                <p className="text-xs text-muted-foreground mt-1">Your trip history will appear here</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[280px] overflow-y-auto">
                {recentTrips.map((trip, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-secondary/40 px-3 py-2.5">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-full ${trip.attended ? "bg-success/15" : "bg-destructive/15"}`}>
                        {trip.attended ? <CheckCircle2 className="h-3.5 w-3.5 text-success" /> : <XCircle className="h-3.5 w-3.5 text-destructive" />}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">{trip.route}</p>
                        <p className="text-[10px] text-muted-foreground">{trip.date}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 ${trip.attended ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                      {trip.attended ? "Attended" : "Missed"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserAttendance;
