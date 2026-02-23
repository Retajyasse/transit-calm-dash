import { useState } from "react";
import { motion } from "framer-motion";
import { Bus, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/user");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="mb-10 flex flex-col items-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary glow-amber">
            <Bus className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">SmartBus</h1>
          <p className="mt-1 text-sm text-muted-foreground">Student Portal</p>
        </div>

        {/* Login Card */}
        <div className="glass-card-solid p-6">
          <h2 className="mb-1 text-lg font-bold text-foreground">Welcome back</h2>
          <p className="mb-6 text-sm text-muted-foreground">Sign in with your institutional account</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  placeholder="you@university.edu"
                  defaultValue="sara@university.edu"
                  className="h-11 w-full rounded-lg border border-border bg-secondary pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                  defaultValue="password123"
                  className="h-11 w-full rounded-lg border border-border bg-secondary pl-10 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" variant="glow" size="xl" className="w-full mt-2">
              Sign In
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            Forgot password? Contact your institution
          </p>
        </div>

        <p className="mt-6 text-center text-[11px] text-muted-foreground">
          SmartBus Transportation System © 2026
        </p>
      </motion.div>
    </div>
  );
};

export default UserLogin;
