import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  Clock,
  Bus,
  CalendarCheck,
  AlertTriangle,
  MapPin,
  CheckCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Notification {
  id: number;
  type: "booking_open" | "booking_closing" | "bus_arriving" | "bus_reached" | "trip_confirmed" | "general";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  booking_open: CalendarCheck,
  booking_closing: AlertTriangle,
  bus_arriving: Bus,
  bus_reached: MapPin,
  trip_confirmed: CalendarCheck,
  general: Bell,
};

const accentMap: Record<string, string> = {
  booking_open: "text-accent",
  booking_closing: "text-destructive",
  bus_arriving: "text-primary",
  bus_reached: "text-accent",
  trip_confirmed: "text-accent",
  general: "text-muted-foreground",
};

const bgMap: Record<string, string> = {
  booking_open: "bg-accent/10",
  booking_closing: "bg-destructive/10",
  bus_arriving: "bg-primary/10",
  bus_reached: "bg-accent/10",
  trip_confirmed: "bg-accent/10",
  general: "bg-secondary",
};

const initialNotifications: Notification[] = [
  { id: 1, type: "booking_open", title: "Booking Window Open", message: "Register now for tomorrow's trip. Window closes at 2:00 PM.", time: "2 min ago", read: false },
  { id: 2, type: "bus_arriving", title: "Bus Arriving Soon", message: "Your bus will arrive at Al-Rawda Square in 15 minutes.", time: "6 hours ago", read: false },
  { id: 3, type: "trip_confirmed", title: "Trip Confirmed", message: "Your seat for tomorrow's 7:30 AM trip has been reserved.", time: "1 day ago", read: false },
  { id: 4, type: "booking_closing", title: "Booking Closing Soon", message: "Registration closes in 30 minutes. Don't miss your spot!", time: "1 day ago", read: true },
  { id: 5, type: "bus_reached", title: "Bus at Pickup Point", message: "BUS-12 has arrived at Al-Rawda Square. Please board now.", time: "2 days ago", read: true },
  { id: 6, type: "general", title: "Schedule Update", message: "Return trip time changed to 7:00 PM for Wednesday.", time: "3 days ago", read: true },
];

const UserNotifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => navigate("/user")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-sm font-bold text-foreground">Notifications</h1>
          {unreadCount > 0 && (
            <span className="flex h-5 items-center rounded-full bg-destructive/15 px-2 text-[10px] font-bold text-destructive">
              {unreadCount} new
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" className="text-xs text-primary" onClick={markAllAsRead}>
            <CheckCheck className="h-3.5 w-3.5" />
            Mark all read
          </Button>
        )}
      </header>

      <div className="mx-auto max-w-lg px-4 py-5 space-y-2">
        <AnimatePresence>
          {notifications.map((notif) => {
            const Icon = iconMap[notif.type];
            return (
              <motion.button
                key={notif.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => markAsRead(notif.id)}
                className={`w-full text-left rounded-xl p-4 transition-all duration-200 ${
                  notif.read
                    ? "bg-card border border-border/50"
                    : "glass-card border-primary/15"
                }`}
              >
                <div className="flex gap-3">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${bgMap[notif.type]}`}>
                    <Icon className={`h-4 w-4 ${accentMap[notif.type]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm font-semibold ${notif.read ? "text-foreground/70" : "text-foreground"}`}>
                        {notif.title}
                      </p>
                      {!notif.read && (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className={`mt-0.5 text-xs ${notif.read ? "text-muted-foreground/60" : "text-muted-foreground"}`}>
                      {notif.message}
                    </p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Clock className="h-3 w-3 text-muted-foreground/50" />
                      <span className="text-[10px] text-muted-foreground/50">{notif.time}</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserNotifications;
