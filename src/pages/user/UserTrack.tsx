import { motion } from "framer-motion";
import {
  Bus,
  Clock,
  MapPin,
  Navigation,
  Check,
} from "lucide-react";
import LiveMap from "@/components/dashboard/LiveMap";
import TripStatusBadge from "@/components/dashboard/TripStatusBadge";
import UserLayout from "@/components/layout/UserLayout";

const pickupStops = [
  { name: "Aqaleem Gate", time: "7:30 AM", status: "completed" as const },
  { name: "Al-Rawda Square", time: "7:38 AM", status: "current" as const },
  { name: "City Center", time: "7:45 AM", status: "upcoming" as const },
  { name: "Stadium", time: "7:55 AM", status: "upcoming" as const },
];

const UserTrack = () => {
  return (
    <UserLayout title="Track Bus" subtitle="Live tracking">
      <div className="max-w-4xl space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card-solid overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground">Live Map</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Real-time bus position</p>
              </div>
              <TripStatusBadge status="active" />
            </div>
            <div className="relative">
              <LiveMap className="h-[380px] rounded-none border-0" />
              {/* ETA badge */}
              <div className="absolute right-4 top-4 glass-card px-3 py-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">ETA</p>
                    <p className="text-sm font-bold text-foreground">3 min</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trip Info */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
            {/* Bus info card */}
            <div className="glass-card-solid p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Bus className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">BUS-12</p>
                    <p className="text-[11px] text-muted-foreground">Aqaleem → Stadium</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Your stop</p>
                  <p className="text-sm font-semibold text-primary">Al-Rawda Square</p>
                </div>
              </div>
            </div>

            {/* Heading info */}
            <div className="glass-card p-4 flex items-center gap-3">
              <Navigation className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs font-semibold text-foreground">Heading to Al-Rawda Square</p>
                <p className="text-[10px] text-muted-foreground">1.2 km • ~3 min away</p>
              </div>
            </div>

            {/* Pickup Progress */}
            <div className="glass-card-solid p-5">
              <h3 className="text-sm font-bold text-foreground mb-4">Pickup Progress</h3>
              <div className="space-y-1.5">
                {pickupStops.map((stop, i) => (
                  <div key={i} className={`flex items-center gap-3 rounded-lg p-3 transition-colors ${
                    stop.status === "current" ? "bg-primary/10 border border-primary/20" :
                    stop.status === "completed" ? "bg-secondary/50" : "bg-secondary/30"
                  }`}>
                    <div className="flex flex-col items-center">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                        stop.status === "completed" ? "bg-success text-success-foreground" :
                        stop.status === "current" ? "bg-primary text-primary-foreground animate-pulse" :
                        "bg-secondary text-muted-foreground"
                      }`}>
                        {stop.status === "completed" ? <Check className="h-3.5 w-3.5" /> : i + 1}
                      </div>
                      {i < pickupStops.length - 1 && (
                        <div className={`mt-1 h-4 w-0.5 ${stop.status === "completed" ? "bg-success/40" : "bg-border"}`} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${stop.status === "current" ? "text-primary" : "text-foreground"}`}>{stop.name}</p>
                      <p className="text-[11px] text-muted-foreground">{stop.time}</p>
                    </div>
                    {stop.status === "current" && (
                      <span className="text-[10px] font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5">Next</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserTrack;
