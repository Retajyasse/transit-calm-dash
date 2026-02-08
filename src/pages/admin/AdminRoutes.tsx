import AdminLayout from "@/components/layout/AdminLayout";
import LiveMap from "@/components/dashboard/LiveMap";
import { motion } from "framer-motion";
import { MapPin, Plus, Edit2, Trash2, Bus } from "lucide-react";
import { Button } from "@/components/ui/button";

const routes = [
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

const AdminRoutes = () => {
  return (
    <AdminLayout title="Routes" subtitle="Manage bus routes and pickup points">
      {/* Actions */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{routes.length} routes configured</p>
        <Button variant="glow" size="sm">
          <Plus className="h-4 w-4" />
          Add Route
        </Button>
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
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
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
    </AdminLayout>
  );
};

export default AdminRoutes;
