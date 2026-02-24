import { motion } from "framer-motion";
import { MapPin, Users, Clock, Check, Bus } from "lucide-react";
import UserLayout from "@/components/layout/UserLayout";
import LiveMap from "@/components/dashboard/LiveMap";
import TripStatusBadge from "@/components/dashboard/TripStatusBadge";

const pickupPoints = [
  { name: "Aqaleem Gate", eta: "7:30 AM", students: 12, status: "completed" as const },
  { name: "Al-Rawda Square", eta: "7:38 AM", students: 8, status: "current" as const },
  { name: "Seil Junction", eta: "7:44 AM", students: 5, status: "upcoming" as const },
  { name: "City Center", eta: "7:50 AM", students: 10, status: "upcoming" as const },
  { name: "Stadium", eta: "7:58 AM", students: 0, status: "upcoming" as const },
];

const UserRouteDetails = () => {
  const totalStudents = pickupPoints.reduce((s, p) => s + p.students, 0);

  return (
    <UserLayout title="Route Details" subtitle="Aqaleem → Stadium">
      <div className="space-y-6 max-w-4xl">
        {/* Route header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 relative overflow-hidden">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/8 blur-[60px]" />
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">Aqaleem → Stadium</h2>
              <p className="text-sm text-muted-foreground mt-1">Daily morning route • 5 stops • ~28 min</p>
            </div>
            <TripStatusBadge status="active" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl bg-secondary/60 p-4">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Total Students</p>
              <p className="text-2xl font-bold text-foreground">{totalStudents}</p>
            </div>
            <div className="rounded-xl bg-secondary/60 p-4">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Stops</p>
              <p className="text-2xl font-bold text-foreground">5</p>
            </div>
            <div className="rounded-xl bg-secondary/60 p-4">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Est. Duration</p>
              <p className="text-2xl font-bold text-foreground">28 min</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pickup Timeline */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card-solid p-6">
            <h3 className="text-sm font-bold text-foreground mb-4">Pickup Points Timeline</h3>
            <div className="space-y-0">
              {pickupPoints.map((point, i) => (
                <div key={i} className="flex gap-4">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shrink-0 ${
                      point.status === "completed" ? "bg-success text-success-foreground" :
                      point.status === "current" ? "bg-primary text-primary-foreground animate-pulse" :
                      "bg-secondary text-muted-foreground"
                    }`}>
                      {point.status === "completed" ? <Check className="h-4 w-4" /> : i + 1}
                    </div>
                    {i < pickupPoints.length - 1 && (
                      <div className={`w-0.5 h-12 ${point.status === "completed" ? "bg-success/40" : "bg-border"}`} />
                    )}
                  </div>
                  {/* Content */}
                  <div className={`pb-6 flex-1 rounded-lg px-3 py-2 -mt-1 ${
                    point.status === "current" ? "bg-primary/5 border border-primary/15" : ""
                  }`}>
                    <p className={`text-sm font-semibold ${point.status === "current" ? "text-primary" : "text-foreground"}`}>{point.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {point.eta}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" /> {point.students} students
                      </span>
                    </div>
                    {point.status === "current" && (
                      <span className="mt-1.5 inline-flex text-[10px] font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5">Your Stop</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mini Map */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card-solid overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="text-sm font-bold text-foreground">Live Map Preview</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Real-time bus position</p>
            </div>
            <LiveMap className="h-[340px] rounded-none border-0" />
          </motion.div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserRouteDetails;
