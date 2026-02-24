import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Clock,
  Bus,
  CalendarCheck,
  AlertTriangle,
  MapPin,
  CheckCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UserLayout from "@/components/layout/UserLayout";

interface Notification {
  id: number;
  type: "booking_open" | "booking_closing" | "bus_arriving" | "bus_reached" | "trip_confirmed" | "general";
  title: string;
  message: string;
  time: string;
  read: boolean;
  group: "today" | "earlier";
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
  { id: 1, type: "booking_open", title: "Booking Window Open", message: "Register now for tomorrow's trip. Window closes at 2:00 PM.", time: "12:00 AM", read: false, group: "today" },
  { id: 2, type: "booking_closing", title: "Booking Closing Soon", message: "Registration closes in 10 minutes. Don't miss your spot!", time: "1:50 PM", read: false, group: "today" },
  { id: 3, type: "bus_arriving", title: "Bus Arriving Soon", message: "Your bus will arrive at Al-Rawda Square in 15 minutes.", time: "7:15 AM", read: false, group: "today" },
  { id: 4, type: "bus_reached", title: "Bus at Pickup Point", message: "BUS-12 has arrived at Al-Rawda Square. Please board now.", time: "7:30 AM", read: true, group: "today" },
  { id: 5, type: "trip_confirmed", title: "Trip Confirmed", message: "Your seat for tomorrow's 7:30 AM trip has been reserved.", time: "Yesterday", read: true, group: "earlier" },
  { id: 6, type: "general", title: "Schedule Update", message: "Return trip time changed to 7:00 PM for Wednesday.", time: "2 days ago", read: true, group: "earlier" },
  { id: 7, type: "booking_open", title: "Booking Window Open", message: "Registration is now open for tomorrow's trip.", time: "3 days ago", read: true, group: "earlier" },
];

const UserNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const todayNotifs = notifications.filter(n => n.group === "today");
  const earlierNotifs = notifications.filter(n => n.group === "earlier");

  return (
    <UserLayout title="Notifications" subtitle={unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}>
      <div className="max-w-2xl space-y-5">
        {unreadCount > 0 && (
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" className="text-xs text-primary" onClick={markAllAsRead}>
              <CheckCheck className="h-3.5 w-3.5" /> Mark all read
            </Button>
          </div>
        )}

        {notifications.length === 0 ? (
          <div className="glass-card-solid flex flex-col items-center justify-center py-16 text-center">
            <Bell className="h-10 w-10 text-muted-foreground/30 mb-3" />
            <p className="text-sm font-semibold text-foreground">No notifications</p>
            <p className="text-xs text-muted-foreground mt-1">You're all caught up!</p>
          </div>
        ) : (
          <>
            {todayNotifs.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">Today</p>
                <div className="space-y-2">
                  <AnimatePresence>
                    {todayNotifs.map((notif) => {
                      const Icon = iconMap[notif.type];
                      return (
                        <motion.button key={notif.id} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} onClick={() => markAsRead(notif.id)}
                          className={`w-full text-left rounded-xl p-4 transition-all duration-200 ${notif.read ? "bg-card border border-border/50" : "glass-card border-primary/15"}`}
                        >
                          <div className="flex gap-3">
                            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${bgMap[notif.type]}`}>
                              <Icon className={`h-4 w-4 ${accentMap[notif.type]}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <p className={`text-sm font-semibold ${notif.read ? "text-foreground/70" : "text-foreground"}`}>{notif.title}</p>
                                {!notif.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                              </div>
                              <p className={`mt-0.5 text-xs ${notif.read ? "text-muted-foreground/60" : "text-muted-foreground"}`}>{notif.message}</p>
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
            )}

            {earlierNotifs.length > 0 && (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">Earlier</p>
                <div className="space-y-2">
                  <AnimatePresence>
                    {earlierNotifs.map((notif) => {
                      const Icon = iconMap[notif.type];
                      return (
                        <motion.button key={notif.id} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} onClick={() => markAsRead(notif.id)}
                          className={`w-full text-left rounded-xl p-4 transition-all duration-200 ${notif.read ? "bg-card border border-border/50" : "glass-card border-primary/15"}`}
                        >
                          <div className="flex gap-3">
                            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${bgMap[notif.type]}`}>
                              <Icon className={`h-4 w-4 ${accentMap[notif.type]}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <p className={`text-sm font-semibold ${notif.read ? "text-foreground/70" : "text-foreground"}`}>{notif.title}</p>
                                {!notif.read && <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />}
                              </div>
                              <p className={`mt-0.5 text-xs ${notif.read ? "text-muted-foreground/60" : "text-muted-foreground"}`}>{notif.message}</p>
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
            )}
          </>
        )}
      </div>
    </UserLayout>
  );
};

export default UserNotifications;
