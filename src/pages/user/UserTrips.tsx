import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bus, MapPin, Clock, XCircle, CalendarDays, Check, Navigation, CircleDot } from "lucide-react";
import UserLayout from "@/components/layout/UserLayout";
import { Button } from "@/components/ui/button";
import TripStatusBadge from "@/components/dashboard/TripStatusBadge";

type TripStatus = "confirmed" | "boarding" | "on_route" | "arrived" | "completed" | "missed" | "cancelled";

interface Trip {
  id: number;
  route: string;
  pickup: string;
  bus: string;
  date: string;
  time: string;
  returnTime: string;
  status: TripStatus;
}

const statusToVariant: Record<TripStatus, "not_started" | "active" | "completed" | "cancelled"> = {
  confirmed: "not_started",
  boarding: "active",
  on_route: "active",
  arrived: "active",
  completed: "completed",
  missed: "cancelled",
  cancelled: "cancelled",
};

const allTrips: Trip[] = [
  { id: 1, route: "Aqaleem → Stadium", pickup: "Al-Rawda Square", bus: "BUS-12", date: "Tomorrow, Sun", time: "7:30 AM", returnTime: "3:30 PM", status: "confirmed" },
  { id: 2, route: "Aqaleem → Stadium", pickup: "Al-Rawda Square", bus: "BUS-12", date: "Mon, Feb 24", time: "7:30 AM", returnTime: "7:00 PM", status: "confirmed" },
  { id: 3, route: "Aqaleem → Stadium", pickup: "Al-Rawda Square", bus: "BUS-08", date: "Tue, Feb 25", time: "7:30 AM", returnTime: "3:30 PM", status: "confirmed" },
  { id: 4, route: "Aqaleem → Stadium", pickup: "Al-Rawda Square", bus: "BUS-12", date: "Sat, Feb 22", time: "7:30 AM", returnTime: "3:30 PM", status: "completed" },
  { id: 5, route: "Aqaleem → Stadium", pickup: "Al-Rawda Square", bus: "BUS-12", date: "Thu, Feb 20", time: "7:30 AM", returnTime: "7:00 PM", status: "completed" },
  { id: 6, route: "Aqaleem → Stadium", pickup: "Al-Rawda Square", bus: "BUS-08", date: "Wed, Feb 19", time: "7:30 AM", returnTime: "3:30 PM", status: "missed" },
  { id: 7, route: "Aqaleem → Stadium", pickup: "City Center", bus: "BUS-12", date: "Tue, Feb 18", time: "7:30 AM", returnTime: "3:30 PM", status: "cancelled" },
];

const tabs = ["upcoming", "completed", "missed"] as const;
type Tab = typeof tabs[number];

const filterTrips = (tab: Tab) => {
  switch (tab) {
    case "upcoming": return allTrips.filter(t => t.status === "confirmed" || t.status === "boarding" || t.status === "on_route" || t.status === "arrived");
    case "completed": return allTrips.filter(t => t.status === "completed");
    case "missed": return allTrips.filter(t => t.status === "missed" || t.status === "cancelled");
  }
};

const timelineSteps = ["Scheduled", "Boarding", "On Route", "Arrived"];

const getStepIndex = (status: TripStatus) => {
  switch (status) {
    case "confirmed": return 0;
    case "boarding": return 1;
    case "on_route": return 2;
    case "arrived": case "completed": return 3;
    default: return -1;
  }
};

const TripCard = ({ trip }: { trip: Trip }) => {
  const [cancelled, setCancelled] = useState(false);
  if (cancelled) return null;

  const stepIdx = getStepIndex(trip.status);
  const showTimeline = stepIdx >= 0;

  return (
    <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="glass-card-solid p-5 transition-all duration-200 hover:border-primary/15">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">{trip.date}</span>
        </div>
        <TripStatusBadge status={statusToVariant[trip.status]} />
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">{trip.route}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-secondary/60 px-2.5 py-2">
            <p className="text-[9px] text-muted-foreground">Pickup</p>
            <p className="text-[11px] font-semibold text-foreground truncate">{trip.pickup}</p>
          </div>
          <div className="rounded-lg bg-secondary/60 px-2.5 py-2">
            <p className="text-[9px] text-muted-foreground">Bus</p>
            <p className="text-[11px] font-semibold text-foreground">{trip.bus}</p>
          </div>
          <div className="rounded-lg bg-secondary/60 px-2.5 py-2">
            <p className="text-[9px] text-muted-foreground">Return</p>
            <p className="text-[11px] font-semibold text-foreground">{trip.returnTime}</p>
          </div>
        </div>

        {/* Trip progress timeline */}
        {showTimeline && (
          <div className="flex items-center gap-0 mt-2">
            {timelineSteps.map((step, i) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold ${
                    i <= stepIdx ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}>
                    {i < stepIdx ? <Check className="h-3 w-3" /> : i === stepIdx ? <CircleDot className="h-3 w-3" /> : i + 1}
                  </div>
                  <p className={`text-[8px] mt-1 ${i <= stepIdx ? "text-primary font-semibold" : "text-muted-foreground"}`}>{step}</p>
                </div>
                {i < timelineSteps.length - 1 && (
                  <div className={`h-0.5 flex-1 -mx-1 ${i < stepIdx ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {(trip.status === "confirmed") && (
        <Button variant="ghost" size="sm" className="mt-3 w-full text-destructive/70 hover:text-destructive hover:bg-destructive/10 text-xs" onClick={() => setCancelled(true)}>
          <XCircle className="h-3.5 w-3.5" /> Cancel Registration
        </Button>
      )}
    </motion.div>
  );
};

const emptyMessages: Record<Tab, { icon: React.ElementType; title: string; desc: string }> = {
  upcoming: { icon: Bus, title: "No upcoming trips", desc: "Book a trip to see it here" },
  completed: { icon: Check, title: "No completed trips", desc: "Your completed trips will appear here" },
  missed: { icon: XCircle, title: "No missed trips", desc: "Great! You haven't missed any trips" },
};

const UserTrips = () => {
  const [activeTab, setActiveTab] = useState<Tab>("upcoming");
  const filtered = filterTrips(activeTab);

  return (
    <UserLayout title="My Trips" subtitle="View and manage your trips">
      <div className="space-y-5 max-w-2xl">
        {/* Tabs */}
        <div className="flex gap-1 rounded-lg bg-secondary p-1">
          {tabs.map((tab) => {
            const count = filterTrips(tab).length;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 rounded-md py-2.5 text-xs font-medium capitalize transition-all ${
                  activeTab === tab ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab} ({count})
              </button>
            );
          })}
        </div>

        {/* Trips List */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card-solid flex flex-col items-center justify-center py-16 text-center">
              {(() => { const E = emptyMessages[activeTab]; return (
                <>
                  <E.icon className="h-10 w-10 text-muted-foreground/30 mb-3" />
                  <p className="text-sm font-semibold text-foreground">{E.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{E.desc}</p>
                </>
              ); })()}
            </motion.div>
          ) : (
            <div className="space-y-3">
              {filtered.map((t) => <TripCard key={t.id} trip={t} />)}
            </div>
          )}
        </AnimatePresence>
      </div>
    </UserLayout>
  );
};

export default UserTrips;
