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
import UserBookings from "./pages/user/UserBookings";
import UserNotifications from "./pages/user/UserNotifications";
import UserTrack from "./pages/user/UserTrack";
import UserChat from "./pages/user/UserChat";

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
          <Route path="/user/bookings" element={<UserBookings />} />
          <Route path="/user/notifications" element={<UserNotifications />} />
          <Route path="/user/track" element={<UserTrack />} />
          <Route path="/user/chat" element={<UserChat />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
