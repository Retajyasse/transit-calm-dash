import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Phone, Bell, MapPin, Save, CheckCircle2 } from "lucide-react";
import UserLayout from "@/components/layout/UserLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const UserSettings = () => {
  const [saved, setSaved] = useState(false);
  const [phone, setPhone] = useState("+962 79 123 4567");
  const [notifBooking, setNotifBooking] = useState(true);
  const [notifBus, setNotifBus] = useState(true);
  const [notifReminder, setNotifReminder] = useState(true);
  const [notifChat, setNotifChat] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <UserLayout title="Settings" subtitle="Manage your account">
      <div className="space-y-6 max-w-2xl">
        {saved && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border border-success/20 bg-success/5 p-4 flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <p className="text-sm font-medium text-success">Settings saved successfully!</p>
          </motion.div>
        )}

        {/* Change Password */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card-solid p-6">
          <div className="flex items-center gap-2 mb-5">
            <Lock className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Change Password</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Current Password</label>
              <input type="password" placeholder="••••••••" className="h-10 w-full rounded-lg border border-border bg-secondary pl-3 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">New Password</label>
                <input type="password" placeholder="••••••••" className="h-10 w-full rounded-lg border border-border bg-secondary pl-3 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Confirm Password</label>
                <input type="password" placeholder="••••••••" className="h-10 w-full rounded-lg border border-border bg-secondary pl-3 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Phone */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="glass-card-solid p-6">
          <div className="flex items-center gap-2 mb-5">
            <Phone className="h-4 w-4 text-accent" />
            <h3 className="text-sm font-bold text-foreground">Phone Number</h3>
          </div>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-secondary pl-3 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors"
          />
        </motion.div>

        {/* Notification Preferences */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card-solid p-6">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="h-4 w-4 text-coral" />
            <h3 className="text-sm font-bold text-foreground">Notification Preferences</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: "Booking window alerts", desc: "Get notified when registration opens and closes", state: notifBooking, set: setNotifBooking },
              { label: "Bus arrival updates", desc: "Know when your bus is approaching", state: notifBus, set: setNotifBus },
              { label: "Trip reminders", desc: "Daily reminders for upcoming trips", state: notifReminder, set: setNotifReminder },
              { label: "Chat notifications", desc: "Messages from your route group", state: notifChat, set: setNotifChat },
            ].map((pref, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-secondary/40 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">{pref.label}</p>
                  <p className="text-[10px] text-muted-foreground">{pref.desc}</p>
                </div>
                <Switch checked={pref.state} onCheckedChange={pref.set} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Route Change */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card-solid p-6">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Route Change Request</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-4">Request to change your assigned route or pickup point. Changes are reviewed by admin.</p>
          <Button variant="outline" className="w-full">
            <MapPin className="h-4 w-4" /> Request Route Change
          </Button>
        </motion.div>

        <Button variant="glow" size="lg" className="w-full" onClick={handleSave}>
          <Save className="h-4 w-4" /> Save Changes
        </Button>
      </div>
    </UserLayout>
  );
};

export default UserSettings;
