import AdminLayout from "@/components/layout/AdminLayout";
import LiveMap from "@/components/dashboard/LiveMap";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Plus, Edit2, Trash2, Bus, X, Clock, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

interface RouteItem {
  id: string;
  name: string;
  pickupPoints: string[];
  distance: string;
  duration: string;
  activeBuses: number;
  color: string;
}

const initialRoutes: RouteItem[] = [
  {
    id: "R-001",
    name: "Aqaleem → Stadium",
    pickupPoints: ["Aqaleem Gate", "Al-Rawda Square", "City Center", "Stadium"],
    distance: "12.5 km",
    duration: "25 min",
    activeBuses: 3,
    color: "bg-primary",
  },
  {
    id: "R-002",
    name: "Seil → Stadium",
    pickupPoints: ["Seil Terminal", "University St.", "Downtown", "Stadium"],
    distance: "8.3 km",
    duration: "18 min",
    activeBuses: 2,
    color: "bg-accent",
  },
  {
    id: "R-003",
    name: "Stadium → Aqaleem (Return)",
    pickupPoints: ["Stadium", "City Center", "Al-Rawda Square", "Aqaleem Gate"],
    distance: "12.5 km",
    duration: "25 min",
    activeBuses: 0,
    color: "bg-coral",
  },
  {
    id: "R-004",
    name: "Stadium → Seil (Return)",
    pickupPoints: ["Stadium", "Downtown", "University St.", "Seil Terminal"],
    distance: "8.3 km",
    duration: "18 min",
    activeBuses: 0,
    color: "bg-info",
  },
];

const colorPalette = ["bg-primary", "bg-accent", "bg-coral", "bg-info", "bg-mint", "bg-amber"];

const AdminRoutes = () => {
  const [routes, setRoutes] = useState<RouteItem[]>(initialRoutes);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [pickupPoints, setPickupPoints] = useState<string[]>([""]);
  const [routeName, setRouteName] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const addPickupPoint = () => setPickupPoints([...pickupPoints, ""]);
  const removePickupPoint = (index: number) => {
    if (pickupPoints.length > 1) {
      setPickupPoints(pickupPoints.filter((_, i) => i !== index));
    }
  };
  const updatePickupPoint = (index: number, value: string) => {
    const updated = [...pickupPoints];
    updated[index] = value;
    setPickupPoints(updated);
  };

  const resetForm = () => {
    setEditingId(null);
    setRouteName("");
    setDistance("");
    setDuration("");
    setPickupPoints([""]);
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) resetForm();
  };

  const handleEdit = (route: RouteItem) => {
    setEditingId(route.id);
    setRouteName(route.name);
    setDistance(route.distance);
    setDuration(route.duration);
    setPickupPoints(route.pickupPoints.length ? route.pickupPoints : [""]);
    setOpen(true);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setRoutes((prev) => prev.filter((r) => r.id !== deleteId));
    toast({ title: "Route deleted", description: `${deleteId} has been removed.` });
    setDeleteId(null);
  };

  const handleSubmit = () => {
    const cleanedPoints = pickupPoints.map((p) => p.trim()).filter(Boolean);
    if (!routeName.trim() || cleanedPoints.length < 2) {
      toast({
        title: "Missing information",
        description: "Please enter a route name and at least two pickup points.",
        variant: "destructive",
      });
      return;
    }

    if (editingId) {
      setRoutes((prev) =>
        prev.map((r) =>
          r.id === editingId
            ? { ...r, name: routeName, distance, duration, pickupPoints: cleanedPoints }
            : r,
        ),
      );
      toast({ title: "Route updated", description: `${routeName} has been saved.` });
    } else {
      const nextId = `R-${String(routes.length + 1).padStart(3, "0")}`;
      setRoutes((prev) => [
        ...prev,
        {
          id: nextId,
          name: routeName,
          distance: distance || "—",
          duration: duration || "—",
          pickupPoints: cleanedPoints,
          activeBuses: 0,
          color: colorPalette[prev.length % colorPalette.length],
        },
      ]);
      toast({ title: "Route created", description: `${routeName} has been added.` });
    }

    setOpen(false);
    resetForm();
  };

  return (
    <AdminLayout title="Routes" subtitle="Manage bus routes and pickup points">
      {/* Actions */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{routes.length} routes configured</p>
        <Dialog open={open} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button variant="glow" size="sm">
              <Plus className="h-4 w-4" />
              Add Route
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card-solid border-border sm:max-w-[520px] p-0 overflow-hidden">
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-border/50">
              <DialogTitle className="flex items-center gap-2 text-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Route className="h-4 w-4 text-primary" />
                </div>
                {editingId ? "Edit Route" : "Add New Route"}
              </DialogTitle>
            </DialogHeader>

            <div className="px-6 py-5 space-y-5 max-h-[60vh] overflow-y-auto">
              {/* Route Name */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Route Name</Label>
                <Input
                  placeholder="e.g. Aqaleem → Stadium"
                  value={routeName}
                  onChange={(e) => setRouteName(e.target.value)}
                  className="bg-secondary/50 border-border/50 focus:border-primary"
                />
              </div>

              {/* Distance & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Distance</Label>
                  <Input
                    placeholder="e.g. 12.5 km"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="bg-secondary/50 border-border/50 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Est. Duration</Label>
                  <div className="relative">
                    <Input
                      placeholder="e.g. 25 min"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="bg-secondary/50 border-border/50 focus:border-primary pr-9"
                    />
                    <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Pickup Points */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pickup Points</Label>
                  <button
                    onClick={addPickupPoint}
                    className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                    Add Stop
                  </button>
                </div>
                <div className="space-y-2">
                  <AnimatePresence>
                    {pickupPoints.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2"
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <div className="flex flex-col items-center">
                            <div className="h-3 w-3 rounded-full border-2 border-primary bg-primary/20" />
                            {index < pickupPoints.length - 1 && (
                              <div className="w-px h-4 bg-border" />
                            )}
                          </div>
                          <Input
                            placeholder={`Stop ${index + 1}`}
                            value={point}
                            onChange={(e) => updatePickupPoint(index, e.target.value)}
                            className="bg-secondary/50 border-border/50 focus:border-primary flex-1"
                          />
                        </div>
                        {pickupPoints.length > 1 && (
                          <button
                            onClick={() => removePickupPoint(index)}
                            className="h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-border/50 flex items-center justify-end gap-3">
              <Button variant="ghost" size="sm" onClick={() => handleOpenChange(false)}>
                Cancel
              </Button>
              <Button variant="glow" size="sm" onClick={handleSubmit}>
                <Plus className="h-4 w-4" />
                {editingId ? "Save Changes" : "Create Route"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Route Cards */}
        <div className="space-y-4">
          {routes.map((route, i) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card-solid p-5 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${route.color}`} />
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{route.name}</h3>
                    <p className="text-xs text-muted-foreground">{route.id} • {route.distance} • {route.duration}</p>
                  </div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleEdit(route)}
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive"
                    onClick={() => setDeleteId(route.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>

              {/* Pickup Points */}
              <div className="flex items-center gap-2 mb-4">
                {route.pickupPoints.map((point, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1">
                      <MapPin className="h-3 w-3 text-primary" />
                      <span className="text-[11px] font-medium text-secondary-foreground">{point}</span>
                    </div>
                    {j < route.pickupPoints.length - 1 && (
                      <div className="h-px w-4 bg-border" />
                    )}
                  </div>
                ))}
              </div>

              {/* Active Buses */}
              <div className="flex items-center gap-2 pt-3 border-t border-border/50">
                <Bus className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {route.activeBuses > 0 ? (
                    <><span className="text-success font-semibold">{route.activeBuses}</span> active buses</>
                  ) : (
                    "No active buses"
                  )}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <LiveMap className="h-[500px] sticky top-24" />
        </motion.div>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent className="glass-card-solid border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this route?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the route and its pickup points. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Route
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminRoutes;
