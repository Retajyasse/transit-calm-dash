import { motion } from "framer-motion";
import { Bus, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-primary/4 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-accent/4 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-lg text-center"
      >
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary glow-amber">
            <Bus className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>

        <h1 className="mb-3 text-4xl font-bold text-foreground tracking-tight">
          Smart<span className="text-gradient-amber">Bus</span>
        </h1>
        <p className="mb-10 text-base text-muted-foreground">
          Intelligent campus transportation management
        </p>

        {/* Portal Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <motion.button
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate("/driver/login")}
            className="glass-card-solid group p-6 text-left transition-all duration-300 hover:border-primary/30 hover:shadow-[0_4px_24px_hsl(var(--primary)/0.1)]"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Bus className="h-5 w-5" />
            </div>
            <h2 className="mb-1 text-base font-bold text-foreground">Driver Portal</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              Manage trips, routes & attendance
            </p>
            <div className="flex items-center gap-1 text-xs font-semibold text-primary">
              Sign In <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => navigate("/admin")}
            className="glass-card-solid group p-6 text-left transition-all duration-300 hover:border-accent/30 hover:shadow-[0_4px_24px_hsl(var(--accent)/0.1)]"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
              <Shield className="h-5 w-5" />
            </div>
            <h2 className="mb-1 text-base font-bold text-foreground">Admin Dashboard</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              Full system management & analytics
            </p>
            <div className="flex items-center gap-1 text-xs font-semibold text-accent">
              Open Dashboard <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </motion.button>
        </div>

        <p className="mt-8 text-[11px] text-muted-foreground">
          SmartBus Transportation System © 2026
        </p>
      </motion.div>
    </div>
  );
};

export default Index;
