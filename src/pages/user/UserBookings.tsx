import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bus,
  MapPin,
  Clock,
  ArrowLeft,
  XCircle,
  CheckCircle2,
  AlertTriangle,
  CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TripStatusBadge from "@/components/dashboard/TripStatusBadge";
import { useNavigate } from "react-router-dom";

type BookingStatus = "confirmed" | "boarding_soon" | "completed" | "missed" | "cancelled";

interface Booking {
  id: number;
  route: string;
  pickup: string;
  bus: string;
  date: string;
  time: string;
  returnTime: string;
  status: BookingStatus;
}

const statusToVariant: Record<BookingStatus, "not_started" | "active" | "completed" | "cancelled"> = {
  confirmed: "not_started",
  boarding_soon: "active",
  completed: "completed",
  missed: "cancelled",
  cancelled: "cancelled",
};

const upcomingBookings: Booking[] = [
  { id: 1, route: "Aqaleem → Stadium", pickup: "Al-Rawda Square", bus: "BUS-12", date: "Tomorrow, Sun", time: "7:30 AM", returnTime: "3:30 PM", status: "confirmed" },
  { id: 2, route: "Aqaleem → Stadium", pickup: "Al-Rawda Square", bus: "BUS-12", date: "Mon, Feb 24", time: "7:30 AM", returnTime: "7:00 PM", status: "confirmed" },
  { id: 3, route: "Aqaleem → Stadium", pickup: "Al-Rawda Square", bus: "BUS-08", date: "Tue, Feb 25", time: "7:30 AM", returnTime: "3:30 PM", status: "confirmed" },
];

const pastBookings: Booking[] = [
  { id: 4, route: "Aqaleem → Stadium", pickup: "Al-Rawda Square", bus: "BUS-12", date: "Sat, Feb 22", time: "7:30 AM", returnTime: "3:30 PM", status: "completed" },
  { id: 5, route: "Aqaleem → Stadium", pickup: "Al-Rawda Square", bus: "BUS-12", date: "Thu, Feb 20", time: "7:30 AM", returnTime: "7:00 PM", status: "completed" },
  { id: 6, route: "Aqaleem → Stadium", pickup: "Al-Rawda Square", bus: "BUS-08", date: "Wed, Feb 19", time: "7:30 AM", returnTime: "3:30 PM", status: "missed" },
  { id: 7, route: "Aqaleem → Stadium", pickup: "City Center", bus: "BUS-12", date: "Tue, Feb 18", time: "7:30 AM", returnTime: "3:30 PM", status: "cancelled" },
];

const BookingCard = ({ booking, isPast }: { booking: Booking; isPast: boolean }) => {
  const [cancelled, setCancelled] = useState(false);

  if (cancelled) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      className="glass-card-solid p-4 transition-all duration-200 hover:border-primary/15"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">{booking.date}</span>
        </div>
        <TripStatusBadge status={statusToVariant[booking.status]} />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">{booking.route}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-secondary/60 px-2.5 py-2">
            <p className="text-[9px] text-muted-foreground">Pickup</p>
            <p className="text-[11px] font-semibold text-foreground truncate">{booking.pickup}</p>
          </div>
          <div className="rounded-lg bg-secondary/60 px-2.5 py-2">
            <p className="text-[9px] text-muted-foreground">Depart</p>
            <p className="text-[11px] font-semibold text-foreground">{booking.time}</p>
          </div>
          <div className="rounded-lg bg-secondary/60 px-2.5 py-2">
            <p className="text-[9px] text-muted-foreground">Return</p>
            <p className="text-[11px] font-semibold text-foreground">{booking.returnTime}</p>
          </div>
        </div>
      </div>

      {!isPast && booking.status === "confirmed" && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-3 w-full text-destructive/70 hover:text-destructive hover:bg-destructive/10 text-xs"
          onClick={() => setCancelled(true)}
        >
          <XCircle className="h-3.5 w-3.5" />
          Cancel Registration
        </Button>
      )}
    </motion.div>
  );
};

const UserBookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-xl">
        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => navigate("/user")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-sm font-bold text-foreground">My Bookings</h1>
      </header>

      <div className="mx-auto max-w-lg px-4 py-5 space-y-4">
        {/* Tabs */}
        <div className="flex gap-1 rounded-lg bg-secondary p-1">
          {(["upcoming", "past"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-md py-2 text-xs font-medium capitalize transition-all ${
                activeTab === tab
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab === "upcoming" ? `Upcoming (${upcomingBookings.length})` : `Past (${pastBookings.length})`}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-3">
          {activeTab === "upcoming"
            ? upcomingBookings.map((b) => <BookingCard key={b.id} booking={b} isPast={false} />)
            : pastBookings.map((b) => <BookingCard key={b.id} booking={b} isPast={true} />)}
        </div>
      </div>
    </div>
  );
};

export default UserBookings;
