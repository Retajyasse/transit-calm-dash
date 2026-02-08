import AdminLayout from "@/components/layout/AdminLayout";
import { motion } from "framer-motion";
import { Bell, Send, Users, Bus, Clock, Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const pastNotifications = [
  { id: 1, title: "Registration Window Reminder", body: "Don't forget to register for tomorrow's bus. Window closes at 2:00 PM.", audience: "All Students", sentAt: "Feb 7, 2026 • 11:00 AM", read: 892 },
  { id: 2, title: "Route Change Notice", body: "Aqaleem route will use an alternative road due to construction. Please arrive 5 minutes early.", audience: "Aqaleem Route Students", sentAt: "Feb 6, 2026 • 4:00 PM", read: 234 },
  { id: 3, title: "Return Trip Update", body: "Evening return trip has been moved from 7:00 PM to 7:15 PM for today only.", audience: "Evening Return Students", sentAt: "Feb 5, 2026 • 2:30 PM", read: 156 },
  { id: 4, title: "New Driver Assigned", body: "A new driver, Khaled Saeed, has been assigned to the Seil route starting next week.", audience: "All Drivers", sentAt: "Feb 4, 2026 • 9:00 AM", read: 6 },
];

const quickTemplates = [
  { label: "Registration Reminder", icon: Clock },
  { label: "Trip Delay", icon: Bus },
  { label: "Route Change", icon: Bus },
  { label: "General Announcement", icon: Bell },
];

const AdminNotifications = () => {
  const [composing, setComposing] = useState(false);

  return (
    <AdminLayout title="Notifications" subtitle="Send reminders and manage alerts">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Compose / Quick Actions */}
        <div className="lg:col-span-1 space-y-5">
          {/* Compose */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card-solid p-5"
          >
            <h3 className="text-sm font-bold text-foreground mb-4">Send Notification</h3>
            
            {!composing ? (
              <Button variant="glow" className="w-full" onClick={() => setComposing(true)}>
                <Plus className="h-4 w-4" />
                Compose New
              </Button>
            ) : (
              <div className="space-y-3 fade-in">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Title</label>
                  <input
                    type="text"
                    placeholder="Notification title..."
                    className="h-9 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Message</label>
                  <textarea
                    placeholder="Write your message..."
                    rows={3}
                    className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Audience</label>
                  <select className="h-9 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-foreground focus:border-primary/50 focus:outline-none transition-colors">
                    <option>All Users</option>
                    <option>Students Only</option>
                    <option>Drivers Only</option>
                    <option>Aqaleem Route</option>
                    <option>Seil Route</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button variant="glow" size="sm" className="flex-1">
                    <Send className="h-3.5 w-3.5" />
                    Send Now
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setComposing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </motion.div>

          {/* Quick Templates */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card-solid p-5"
          >
            <h3 className="text-sm font-bold text-foreground mb-3">Quick Templates</h3>
            <div className="space-y-2">
              {quickTemplates.map((template, i) => (
                <button
                  key={i}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-secondary-foreground transition-colors hover:bg-secondary"
                >
                  <template.icon className="h-4 w-4 text-muted-foreground" />
                  {template.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Past Notifications */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground">Sent Notifications</h2>
            <span className="text-xs text-muted-foreground">{pastNotifications.length} notifications</span>
          </div>
          <div className="space-y-3">
            {pastNotifications.map((notif, i) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="glass-card-solid p-5 group transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Bell className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{notif.title}</h4>
                      <p className="text-[11px] text-muted-foreground">{notif.sentAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-[11px] font-medium text-secondary-foreground">{notif.audience}</span>
                  </div>
                </div>
                <p className="text-sm text-secondary-foreground mb-3">{notif.body}</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Check className="h-3 w-3 text-success" />
                  Read by {notif.read} users
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminNotifications;
