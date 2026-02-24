import { ReactNode } from "react";
import UserSidebar from "./UserSidebar";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface UserLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const UserLayout = ({ children, title, subtitle }: UserLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <UserSidebar />

      {/* Main content area - offset for sidebar */}
      <div className="pl-[260px] transition-all duration-200">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-8 backdrop-blur-xl">
          <div>
            <h1 className="text-lg font-bold text-foreground">{title}</h1>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative" onClick={() => navigate("/user/notifications")}>
              <Bell className="h-4.5 w-4.5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                2
              </span>
            </Button>

            {/* Avatar */}
            <div className="flex items-center gap-3 rounded-lg bg-secondary px-3 py-1.5">
              <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">S</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-foreground">Sara Ahmed</p>
                <p className="text-[10px] text-muted-foreground">STU-001</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
