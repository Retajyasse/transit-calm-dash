import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LiveMap from "@/components/dashboard/LiveMap";
import TripStatusBadge, { type TripStatus } from "@/components/dashboard/TripStatusBadge";
import { Button } from "@/components/ui/button";
import {
  Play,
  Square,
  MapPin,
  Clock,
  Users,
  Bell,
  ChevronUp,
  ChevronDown,
  Check,
  X,
  Navigation,
  Bus,
  LogOut,
  Menu,
} from "lucide-react";

const pickupPoints = [
  { name: "Aqaleem Gate", time: "7:30 AM", students: 12, status: "completed" as const },
  { name: "Al-Rawda Square", time: "7:38 AM", students: 8, status: "current" as const },
  { name: "City Center", time: "7:45 AM", students: 7, status: "upcoming" as const },
  { name: "Stadium", time: "7:55 AM", students: 5, status: "upcoming" as const },
];

const studentList = [
  { name: "Sara Ahmed", id: "S-001", present: true },
  { name: "Lina Khalil", id: "S-003", present: true },
  { name: "Hana Tariq", id: "S-007", present: false },
  { name: "Noor Mansour", id: "S-005", present: true },
  { name: "Rami Faris", id: "S-012", present: true },
  { name: "Dina Sami", id: "S-018", present: false },
  { name: "Tariq Wael", id: "S-022", present: true },
  { name: "Amal Zaid", id: "S-031", present: true },
];

const notifications = [
  { message: "Admin: Please check Route B for road closure", time: "5 min ago" },
  { message: "Schedule updated for return trip", time: "1 hour ago" },
];

const DriverDashboard = () => {
  const [tripStatus, setTripStatus] = useState<TripStatus>("active");
  const [showPanel, setShowPanel] = useState(true);
  const [activeTab, setActiveTab] = useState<"route" | "attendance" | "alerts">("route");
  const [attendance, setAttendance] = useState<Record<string, boolean>>(
    Object.fromEntries(studentList.map((s) => [s.id, s.present]))
  );
  const [showMenu, setShowMenu] = useState(false);

  const toggleAttendance = (id: string) => {
    setAttendance((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const presentCount = Object.values(attendance).filter(Boolean).length;

  return (
    <div className="relative flex h-screen flex-col bg-background overflow-hidden">
      {/* Top Bar */}
      <header className="relative z-30 flex h-14 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button onClick={() => setShowMenu(!showMenu)} className="lg:hidden">
            <Menu className="h-5 w-5 text-foreground" />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Bus className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-foreground">Ahmad Hassan</h1>
            <p className="text-[10px] text-muted-foreground">DRV-001 • Aqaleem Route</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <TripStatusBadge status={tripStatus} />
          <div className="relative">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="h-4 w-4" />
            </Button>
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
              2
            </span>
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive/60 hover:text-destructive">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* Map Area */}
      <div className="relative flex-1">
        <LiveMap
          className="h-full rounded-none border-0"
          overlay={
            <div className="glass-card p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs font-semibold text-foreground">Next: Al-Rawda Square</p>
                  <p className="text-[10px] text-muted-foreground">1.2 km • ~3 min away</p>
                </div>
              </div>
              <Button variant="default" size="sm" className="text-xs">
                Navigate
              </Button>
            </div>
          }
        />

        {/* Floating time */}
        <div className="absolute right-4 top-4 glass-card px-3 py-2">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span className="text-sm font-bold text-foreground">7:38 AM</span>
          </div>
        </div>
      </div>

      {/* Bottom Panel */}
      <motion.div
        initial={false}
        animate={{ height: showPanel ? "auto" : 56 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative z-20 border-t border-border bg-card overflow-hidden"
      >
        {/* Panel Toggle */}
        <button
          onClick={() => setShowPanel(!showPanel)}
          className="flex w-full items-center justify-between px-4 py-4"
        >
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-foreground">
              Aqaleem → Stadium
            </span>
            <span className="text-xs text-muted-foreground">
              {presentCount}/{studentList.length} students
            </span>
          </div>
          {showPanel ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronUp className="h-4 w-4 text-muted-foreground" />}
        </button>

        {/* Panel Content */}
        <AnimatePresence>
          {showPanel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 pb-4"
            >
              {/* Tabs */}
              <div className="flex gap-1 rounded-lg bg-secondary p-1 mb-4">
                {(["route", "attendance", "alerts"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 rounded-md py-2 text-xs font-medium capitalize transition-all ${
                      activeTab === tab
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                    {tab === "alerts" && (
                      <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[9px] text-destructive-foreground">
                        2
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Route Tab */}
              {activeTab === "route" && (
                <div className="space-y-2 max-h-52 overflow-y-auto">
                  {pickupPoints.map((point, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 rounded-lg p-3 transition-colors ${
                        point.status === "current"
                          ? "bg-primary/10 border border-primary/20"
                          : point.status === "completed"
                          ? "bg-secondary/50"
                          : "bg-secondary/30"
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                            point.status === "completed"
                              ? "bg-success text-success-foreground"
                              : point.status === "current"
                              ? "bg-primary text-primary-foreground animate-pulse"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {point.status === "completed" ? <Check className="h-3.5 w-3.5" /> : i + 1}
                        </div>
                        {i < pickupPoints.length - 1 && (
                          <div className={`mt-1 h-4 w-0.5 ${point.status === "completed" ? "bg-success/40" : "bg-border"}`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-semibold ${point.status === "current" ? "text-primary" : "text-foreground"}`}>
                          {point.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {point.time} • {point.students} students
                        </p>
                      </div>
                      {point.status === "current" && (
                        <span className="text-[10px] font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5">
                          Now
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Attendance Tab */}
              {activeTab === "attendance" && (
                <div className="space-y-1.5 max-h-52 overflow-y-auto">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">
                      Al-Rawda Square — {Object.values(attendance).filter(Boolean).length} present
                    </span>
                    <Button variant="ghost" size="sm" className="text-[11px] h-7">
                      Mark All Present
                    </Button>
                  </div>
                  {studentList.map((student) => (
                    <button
                      key={student.id}
                      onClick={() => toggleAttendance(student.id)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 transition-all ${
                        attendance[student.id]
                          ? "bg-success/10 border border-success/20"
                          : "bg-secondary border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${
                          attendance[student.id]
                            ? "bg-success/20 text-success"
                            : "bg-secondary text-muted-foreground"
                        }`}>
                          {student.name.charAt(0)}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-foreground">{student.name}</p>
                          <p className="text-[10px] text-muted-foreground">{student.id}</p>
                        </div>
                      </div>
                      {attendance[student.id] ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Alerts Tab */}
              {activeTab === "alerts" && (
                <div className="space-y-2 max-h-52 overflow-y-auto">
                  {notifications.map((notif, i) => (
                    <div key={i} className="rounded-lg bg-secondary p-3">
                      <p className="text-sm text-foreground">{notif.message}</p>
                      <p className="mt-1 text-[10px] text-muted-foreground">{notif.time}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Trip Action Buttons */}
              <div className="mt-4 flex gap-3">
                {tripStatus === "not_started" && (
                  <Button
                    variant="driver"
                    size="xl"
                    className="flex-1"
                    onClick={() => setTripStatus("active")}
                  >
                    <Play className="h-5 w-5" />
                    Start Trip
                  </Button>
                )}
                {tripStatus === "active" && (
                  <Button
                    variant="destructive"
                    size="xl"
                    className="flex-1"
                    onClick={() => setTripStatus("completed")}
                  >
                    <Square className="h-5 w-5" />
                    End Trip
                  </Button>
                )}
                {tripStatus === "completed" && (
                  <div className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-success/10 py-4 border border-success/20">
                    <Check className="h-5 w-5 text-success" />
                    <span className="text-sm font-bold text-success">Trip Completed</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DriverDashboard;
