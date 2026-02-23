import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bus,
  MapPin,
  Clock,
  Bell,
  Navigation,
  Calendar,
  ArrowRight,
  BookOpen,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TripStatusBadge from "@/components/dashboard/TripStatusBadge";
import { useNavigate } from "react-router-dom";

const upcomingTrips = [
  {
    id: 1,
    route: "Aqaleem → Stadium",
    bus: "BUS-12",
    pickup: "Al-Rawda Square",
    time: "7:30 AM",
    date: "Tomorrow, Sun",
    status: "confirmed" as const,
    returnTime: "3:30 PM",
  },
  {
    id: 2,
    route: "Aqaleem → Stadium",
    bus: "BUS-12",
    pickup: "Al-Rawda Square",
    time: "7:30 AM",
    date: "Mon, Feb 24",
    status: "confirmed" as const,
    returnTime: "7:00 PM",
  },
];

const notifications = [
  { id: 1, message: "Booking window opens at 12:00 AM tonight", time: "2 min ago", unread: true },
  { id: 2, message: "Your bus is arriving in 15 minutes", time: "6 hours ago", unread: true },
  { id: 3, message: "Tomorrow's trip confirmed — Seat reserved", time: "1 day ago", unread: false },
];

type UserTripStatus = "confirmed" | "boarding_soon" | "missed" | "completed";

const userStatusMap: Record<UserTripStatus, { label: string; variant: "not_started" | "active" | "completed" | "cancelled" }> = {
  confirmed: { label: "Confirmed", variant: "not_started" },
  boarding_soon: { label: "Boarding Soon", variant: "active" },
  missed: { label: "Missed", variant: "cancelled" },
  completed: { label: "Completed", variant: "completed" },
};

const UserDashboard = () => {
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => n.unread).length;
  const nextTrip = upcomingTrips[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Bus className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-foreground">Sara Ahmed</h1>
            <p className="text-[10px] text-muted-foreground">STU-001 • Computer Science</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/user/notifications")}
            className="relative"
          >
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="h-4 w-4" />
            </Button>
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
                {unreadCount}
              </span>
            )}
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-destructive/60 hover:text-destructive"
            onClick={() => navigate("/")}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 py-6 space-y-6">
        {/* Next Trip — Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="glass-card p-5 relative overflow-hidden">
            {/* Subtle glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/8 blur-[60px]" />

            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Next Trip</span>
              <TripStatusBadge status={userStatusMap[nextTrip.status].variant} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-foreground">{nextTrip.route}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-secondary/60 p-3">
                  <p className="text-[10px] text-muted-foreground mb-0.5">Pickup</p>
                  <p className="text-xs font-semibold text-foreground">{nextTrip.pickup}</p>
                </div>
                <div className="rounded-lg bg-secondary/60 p-3">
                  <p className="text-[10px] text-muted-foreground mb-0.5">Bus</p>
                  <p className="text-xs font-semibold text-foreground">{nextTrip.bus}</p>
                </div>
                <div className="rounded-lg bg-secondary/60 p-3">
                  <p className="text-[10px] text-muted-foreground mb-0.5">Departure</p>
                  <p className="text-xs font-semibold text-foreground">{nextTrip.time}</p>
                </div>
                <div className="rounded-lg bg-secondary/60 p-3">
                  <p className="text-[10px] text-muted-foreground mb-0.5">Return</p>
                  <p className="text-xs font-semibold text-foreground">{nextTrip.returnTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span>{nextTrip.date}</span>
              </div>
            </div>

            <Button
              variant="glow"
              size="lg"
              className="w-full mt-4"
              onClick={() => navigate("/user/track")}
            >
              <Navigation className="h-4 w-4" />
              Track Bus
            </Button>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          <button
            onClick={() => navigate("/user/bookings")}
            className="glass-card-solid group p-4 text-left transition-all duration-200 hover:border-primary/20"
          >
            <BookOpen className="h-5 w-5 text-primary mb-2" />
            <p className="text-sm font-semibold text-foreground">My Bookings</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">View all trips</p>
          </button>

          <button
            onClick={() => navigate("/user/notifications")}
            className="glass-card-solid group p-4 text-left transition-all duration-200 hover:border-accent/20"
          >
            <Bell className="h-5 w-5 text-accent mb-2" />
            <p className="text-sm font-semibold text-foreground">Notifications</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{unreadCount} unread</p>
          </button>
        </motion.div>

        {/* Upcoming Trips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-foreground">Upcoming Trips</h2>
            <button
              onClick={() => navigate("/user/bookings")}
              className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              View All <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-2">
            {upcomingTrips.map((trip, i) => (
              <div
                key={trip.id}
                className="glass-card-solid p-4 flex items-center justify-between transition-all duration-200 hover:border-primary/15"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Bus className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{trip.route}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-muted-foreground">{trip.date}</span>
                      <span className="text-[11px] text-muted-foreground">•</span>
                      <span className="text-[11px] text-muted-foreground">{trip.time}</span>
                    </div>
                  </div>
                </div>
                <TripStatusBadge status={userStatusMap[trip.status].variant} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Registration Window Info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="glass-card-solid p-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
              <Clock className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Registration Window</p>
              <p className="text-[11px] text-muted-foreground">
                Opens 12:00 AM — Closes 2:00 PM daily
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
