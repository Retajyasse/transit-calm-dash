import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Bus, Users, CheckCircle2, AlertTriangle, Calendar, Timer } from "lucide-react";
import UserLayout from "@/components/layout/UserLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const routes = [
  { id: 1, name: "Aqaleem → Stadium", stops: ["Aqaleem Gate", "Al-Rawda Square", "Seil Junction", "City Center", "Stadium"] },
];

const returnTimes = ["3:30 PM", "7:00 PM"];

const getBookingWindowStatus = () => {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const currentMin = h * 60 + m;
  const openMin = 0; // 12:00 AM = 0
  const closeMin = 14 * 60; // 2:00 PM = 840

  if (currentMin >= openMin && currentMin < closeMin) {
    const remaining = closeMin - currentMin;
    const totalWindow = closeMin - openMin;
    return { open: true, remainingMin: remaining, totalMin: totalWindow };
  }
  return { open: false, remainingMin: 0, totalMin: 840 };
};

const UserBook = () => {
  const [windowStatus, setWindowStatus] = useState(getBookingWindowStatus);
  const [selectedPickup, setSelectedPickup] = useState<string | null>(null);
  const [selectedReturn, setSelectedReturn] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const totalSeats = 45;
  const bookedSeats = 32;
  const available = totalSeats - bookedSeats;
  const occupancy = Math.round((bookedSeats / totalSeats) * 100);

  useEffect(() => {
    const interval = setInterval(() => setWindowStatus(getBookingWindowStatus()), 30000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (min: number) => {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <UserLayout title="Book Trip" subtitle="Tomorrow's morning trip">
        <div className="flex flex-col items-center justify-center py-20 max-w-md mx-auto text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/15 mb-6">
              <CheckCircle2 className="h-10 w-10 text-success" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
            <p className="text-sm text-muted-foreground mb-2">Your seat has been reserved for tomorrow's trip.</p>
            <div className="glass-card-solid p-4 mt-4 text-left space-y-2">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Route</span><span className="font-semibold text-foreground">Aqaleem → Stadium</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Pickup</span><span className="font-semibold text-foreground">{selectedPickup}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Return</span><span className="font-semibold text-foreground">{selectedReturn}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Departure</span><span className="font-semibold text-foreground">7:30 AM</span></div>
            </div>
            <Button variant="outline" className="mt-6" onClick={() => setConfirmed(false)}>Book Another Trip</Button>
          </motion.div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout title="Book Trip" subtitle="Tomorrow's morning trip">
      <div className="space-y-6 max-w-2xl">
        {/* Booking window status */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className={`glass-card p-5 relative overflow-hidden ${!windowStatus.open ? "border-destructive/20" : ""}`}>
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/8 blur-[60px]" />
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-foreground">Booking Window</span>
            </div>
            <span className={`text-[10px] font-semibold rounded-full px-2.5 py-1 ${windowStatus.open ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
              {windowStatus.open ? "Open" : "Closed"}
            </span>
          </div>
          {windowStatus.open ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-muted-foreground">Time remaining</p>
                <p className="text-lg font-bold text-primary">{formatCountdown(windowStatus.remainingMin)}</p>
              </div>
              <Progress value={((windowStatus.totalMin - windowStatus.remainingMin) / windowStatus.totalMin) * 100} className="h-1.5" />
              <p className="text-[10px] text-muted-foreground mt-2">12:00 AM — 2:00 PM daily</p>
            </div>
          ) : (
            <div className="flex flex-col items-center py-6 text-center">
              <AlertTriangle className="h-8 w-8 text-destructive/50 mb-3" />
              <p className="text-sm font-semibold text-foreground">Booking is closed</p>
              <p className="text-xs text-muted-foreground mt-1">Registration opens daily at 12:00 AM</p>
            </div>
          )}
        </motion.div>

        {windowStatus.open && (
          <>
            {/* Seat availability */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card-solid p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-accent" />
                  <span className="text-sm font-bold text-foreground">Seat Availability</span>
                </div>
                <span className="text-xs font-semibold text-foreground">{available} / {totalSeats} available</span>
              </div>
              <Progress value={occupancy} className="h-2 mb-2" />
              <p className="text-[10px] text-muted-foreground">{occupancy}% occupied</p>
            </motion.div>

            {/* Select pickup */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card-solid p-5">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-foreground">Select Pickup Point</span>
              </div>
              <div className="space-y-2">
                {routes[0].stops.slice(0, -1).map((stop) => (
                  <button
                    key={stop}
                    onClick={() => setSelectedPickup(stop)}
                    className={`w-full text-left rounded-lg px-4 py-3 transition-all text-sm font-medium ${
                      selectedPickup === stop
                        ? "bg-primary/10 border border-primary/20 text-primary"
                        : "bg-secondary/40 text-foreground hover:bg-secondary/70"
                    }`}
                  >
                    {stop}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Select return */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card-solid p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-accent" />
                <span className="text-sm font-bold text-foreground">Select Return Time</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {returnTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedReturn(time)}
                    className={`rounded-lg px-4 py-4 text-center transition-all ${
                      selectedReturn === time
                        ? "bg-primary/10 border border-primary/20 text-primary font-bold"
                        : "bg-secondary/40 text-foreground hover:bg-secondary/70 font-medium"
                    }`}
                  >
                    <p className="text-lg">{time}</p>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Confirm */}
            <Button
              variant="glow"
              size="lg"
              className="w-full"
              disabled={!selectedPickup || !selectedReturn}
              onClick={handleConfirm}
            >
              <CheckCircle2 className="h-4 w-4" /> Confirm Booking
            </Button>
          </>
        )}
      </div>
    </UserLayout>
  );
};

export default UserBook;
