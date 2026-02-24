import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminRoutes from "./pages/admin/AdminRoutes";
import AdminTrips from "./pages/admin/AdminTrips";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminReports from "./pages/admin/AdminReports";
import DriverLogin from "./pages/driver/DriverLogin";
import DriverDashboard from "./pages/driver/DriverDashboard";
import UserLogin from "./pages/user/UserLogin";
import UserDashboard from "./pages/user/UserDashboard";
import UserBook from "./pages/user/UserBook";
import UserTrips from "./pages/user/UserTrips";
import UserRouteDetails from "./pages/user/UserRouteDetails";
import UserTrack from "./pages/user/UserTrack";
import UserAttendance from "./pages/user/UserAttendance";
import UserNotifications from "./pages/user/UserNotifications";
import UserChat from "./pages/user/UserChat";
import UserSupport from "./pages/user/UserSupport";
import UserSettings from "./pages/user/UserSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/routes" element={<AdminRoutes />} />
          <Route path="/admin/trips" element={<AdminTrips />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          
          {/* Driver Routes */}
          <Route path="/driver/login" element={<DriverLogin />} />
          <Route path="/driver" element={<DriverDashboard />} />
          
          {/* User Routes */}
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/user/book" element={<UserBook />} />
          <Route path="/user/trips" element={<UserTrips />} />
          <Route path="/user/route" element={<UserRouteDetails />} />
          <Route path="/user/track" element={<UserTrack />} />
          <Route path="/user/attendance" element={<UserAttendance />} />
          <Route path="/user/notifications" element={<UserNotifications />} />
          <Route path="/user/chat" element={<UserChat />} />
          <Route path="/user/support" element={<UserSupport />} />
          <Route path="/user/settings" element={<UserSettings />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
